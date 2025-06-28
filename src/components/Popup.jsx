import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { db } from '../firebaseConfig';
import "./Popup.css";

function Popup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    /*
        *handleSubmit button
        *e represents user input, in this case, the email and password
        *signInWithEmailAndPassword is a firebase function that takes in the auth and the email and password
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        let userEmail = email;

        if (!email.includes('@')) {
            const usernameDocRef = doc(db, 'usernames', email);
            const usernameDoc = await getDoc(usernameDocRef);
            if (usernameDoc.exists()) {
                userEmail = usernameDoc.data().email;
            } else {
                alert("Username does not exist or could not be found. Please try again.");
                return;
            }
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
            sessionStorage.setItem("accessToken", userCredential.user.accessToken);
            navigate('/');
        } catch (error) {
            let errorMessage;
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = "Incorrect username, email, or password. Please try again.";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Network error. Please check your connection and try again.";
                    break;
                default:
                    errorMessage = "An error occurred during sign in. Please try again.";
            }
            console.error("ERROR SIGNIN: ", error);
            alert(errorMessage);
        }
    };

    /*
        *handlePasswordReset button
        *sendPasswordResetEmail is a firebase function that takes in the auth and the email
    */
    const handlePasswordReset = async () => {
        if (!email) {
            alert('Please enter your email or username.');
            return;
        }

        let resetEmail = email;

        if (!email.includes('@')) {
            const usernameRef = doc(db, 'usernames', email);
            const usernameSnap = await getDoc(usernameRef);
            if (usernameSnap.exists() && usernameSnap.data().email) {
                resetEmail = usernameSnap.data().email; // Use the associated email
            } else {
                alert('Username does not exist. Please enter a valid username or email.');
                return;
            }
        }

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            alert('Please check your email to reset your password.');
        } catch (error) {
            console.error('Password reset error', error);
            alert('Failed to send password reset email. Please try again.');
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const auth = getAuth();
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        console.log("Popup - useEffect triggered, setting up auth listener");
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Popup - Auth state changed - User:", user);
            if (user) {
                console.log("Popup - User UID:", user.uid);
                console.log("Popup - User email:", user.email);
                const userRef = doc(db, "users", user.uid);
                console.log("Popup - Checking document at path: users/" + user.uid);
                const userDoc = await getDoc(userRef);
                console.log("Popup - User document exists:", userDoc.exists());
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("Popup - User data:", userData);
                    console.log("Popup - User role:", userData.role);
                    console.log("Popup - Role type:", typeof userData.role);
                    console.log("Popup - All user data keys:", Object.keys(userData));
                    
                    // Check for different possible role field names
                    const possibleRoleFields = ['role', 'Role', 'userRole', 'user_role', 'adminRole', 'admin_role'];
                    let foundRole = null;
                    for (const field of possibleRoleFields) {
                        if (userData[field]) {
                            console.log(`Popup - Found role in field '${field}':`, userData[field]);
                            foundRole = userData[field];
                        }
                    }
                    
                    const roleToCheck = foundRole || userData.role;
                    console.log("Popup - Role to check:", roleToCheck);
                    console.log("Popup - Checking if role is in admin list:", ['admin', 'staff', 'super admin', 'premium_user', 'partner', 'client', 'vendor']);
                    const hasAdminRole = ['admin', 'staff', 'super admin', 'premium_user', 'partner', 'client', 'vendor'].includes(roleToCheck);
                    console.log("Popup - Has admin role:", hasAdminRole);
                    if (hasAdminRole) {
                        console.log("Popup - User has admin/premium role - setting subscribed to true");
                        setSubscribed(true);
                    } else {
                        console.log("Popup - User does not have admin/premium role - setting subscribed to false");
                        setSubscribed(false);
                    }
                } else {
                    console.log("Popup - User document does not exist in users collection");
                    console.log("Popup - Creating user document for manually added admin user");
                    
                    // Create the user document with admin role
                    try {
                        const userData = {
                            email: user.email,
                            uid: user.uid,
                            role: 'admin', // Set as admin since they were manually added
                            createdAt: new Date(),
                            username: user.email?.split('@')[0] || 'admin'
                        };
                        
                        await setDoc(doc(db, "users", user.uid), userData);
                        console.log("Popup - Created user document with admin role");
                        setSubscribed(true);
                    } catch (error) {
                        console.error("Popup - Error creating user document:", error);
                        setSubscribed(false);
                    }
                }
            } else {
                console.log("Popup - No user logged in - setting subscribed to false");
                setSubscribed(false);
            }
        });

        // Clean up the auth listener when component unmounts
        return () => {
            console.log("Popup - Cleaning up auth listener");
            unsubscribe();
        };

    }, [auth]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000); // Show the popup after 2 seconds

        // Clear the timer on component unmount or when the popup is shown
        return () => clearTimeout(timer);
    }, []); // Only run once on component mount

    const handleOnclick = () => {
        window.location.href = "/login";
    };

    useEffect(() => {
        const handleClick = () => {
            setIsOpen(true);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        if (isOpen && !subscribed) {
            window.scrollTo(0, 0); // Scroll to the top when the popup shows
        }
    }, [isOpen]);

    useEffect(() => {
        const disableScroll = () => {
            // Get the current page scroll position
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
    
            // If any scroll is attempted, set this to the previous value
            window.onscroll = function () {
                window.scrollTo(scrollX, scrollY);
            };
        };
    
        const enableScroll = () => {
            // Re-enable scrolling
            window.onscroll = null;
        };
    
        if (isOpen && !subscribed) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return () => {
            enableScroll(); // Re-enable scrolling when component unmounts
        };
    }, [isOpen, subscribed]);
    

    return (
        <div>
            {!subscribed ?
                <div className="popup-container">
                    <div className={`transparent-overlay ${isOpen ? 'open' : ''}`}></div>
                    <div className={`subscription-wall ${isOpen ? 'open' : ''}`}>
                        <h1>Sign up or log in.</h1>
                        <p>Gain access to full articles, news, podcasts, games, etc.</p>
                        <div className="popup-login-container">
                                <h1> Log In </h1>
                                <form>
                                    <input 
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email or Username"
                                    />
                                    <br />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <br />
                                    <button type="submit" onClick={handleSubmit}> Sign In </button>
                                </form>
                                <div className="popup-forgot/noaccount">
                                    <p className="ForgetPass">Forgot your password? <a href="#" onClick={handlePasswordReset}>Reset it here</a></p>
                                    <p className="NoAccount"> Don't have an account? <Link to='/subscribe'>Sign Up!</Link></p>
                                </div>
                                
                        </div>
                    </div>
                </div>
                :
                <div>
                </div>
            }
        </div>


    );
}

export default Popup;
