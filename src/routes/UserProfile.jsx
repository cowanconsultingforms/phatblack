import React, { useState, useEffect } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { doc, getFirestore, getDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import "../Styles/UserProfile.css";
import { useNavigate, Link } from 'react-router-dom';

function UserProfile() {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            username: "",
            role: "",
            email: "",
            subscriptionId: "",
            paymentId: "",
        };
    });
    const [authPassword, setAuthPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [currentUser, setCurrentUser] = useState(formData.username);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);
            setUserId(user.uid);
            //setCurrentUser(formData.username);
            getDoc(userDocRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setFormData(userData);
                        localStorage.setItem('formData', JSON.stringify(userData));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    const subscriptionCancellationUrl = import.meta.env.VITE_APP_SUBSCRIPTION_CANCELLATION_URL;

    //handle cancelling subscription
    async function cancelSubscription(event) {
        event.preventDefault();
        //post request to backend for cancellation
        try {
            console.log(formData.subscriptionId);
            const response = await fetch(
                subscriptionCancellationUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user: userId, subId: formData.subscriptionId, payId: formData.paymentId }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                console.log("Cancelled Successfuly", data);
                alert('Cancelled Successfuly');
                setTimeout(()=>{
                    navigate("/");
                },3000);
            } else {
                console.error("Failed to cancel", data);
                alert(data.error || 'Failed to cancel');
            }
        } catch (error) {
            console.error("Error cancelling subscription:", error);
            alert('Error cancelling subscription');
        } 
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        localStorage.setItem('formData', JSON.stringify({ ...formData, [name]: value }));
    };

    const handleAuthPasswordChange = (e) => {
        setAuthPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!authPassword) {
            window.alert("Please enter your authentication password to update your profile.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            window.alert("New password and confirm new password must match.");
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, authPassword);

        try {
            await reauthenticateWithCredential(user, credential);
            const uid = user.uid;

            console.log(currentUser)
            const docRef = doc(db, "users", uid);
            await updateDoc(docRef, { username: formData.username, email: formData.email });

            await deleteDoc(doc(db, "usernames", currentUser));
            await setDoc(doc(db, "usernames", formData.username), { email: formData.email });

            if (newPassword === confirmNewPassword) {
                await updatePassword(user, newPassword);
                console.log("Password changed successfully!");
            }

            window.location.reload();
            window.alert("Profile updated successfully!");
        } catch (error) {
            window.alert("Failed to update profile.");
        }
    };


    return (
        <div className='profile-page'>
            <div className='profile-info'>
                <div className='profile-title'>
                    <h1>User Profile</h1>
                </div>
                <div >
                    Sample icon
                </div>
                <div className='profile-icon'>
                    <img src='https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png'></img>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="label" htmlFor="username">Username: </label>
                    <input
                        className='change-user-info'
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <label className="label" htmlFor="role">Role: </label>
                    <input
                        className='change-user-info'
                        type="text"
                        id="role"
                        name='role'
                        value={formData.role}
                        readOnly
                    />
                    <label className="label" htmlFor="email">Email: </label>
                    <input
                        className='change-user-info'
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />

                    <label className="label" htmlFor="newPassword">New Password: </label>
                    <input
                        className='change-user-info'
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />

                    <label className="label" htmlFor="confirmNewPassword">Confirm New Password: </label>
                    <input
                        className='change-user-info'
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                    />

                    <label className="label" htmlFor="authPassword">Current Password: </label>
                    <input
                        className='change-user-info'
                        type="password"
                        id="authPassword"
                        name="authPassword"
                        value={authPassword}
                        onChange={handleAuthPasswordChange}
                        required
                    />
                    <button type="submit">Update </button>
                </form>
                <button style={{backgroundColor: "#d35400"}} type="submit" onClick={cancelSubscription}> Cancel Subscription </button>
                <div className="links">
                    <h3 className="link"><Link to="https://phatblack.com/WP/restrictions/" target="_blank">SEE RESTRICTIONS</Link></h3>
                    <h3 className="link"><Link to="https://phatblack.com/WP/terms-of-service/" target="_blank">SEE TERMS OF SERVICE</Link></h3>
                    <h3 className="link"><Link to="https://phatblack.com/WP/privacy-policy/" target="_blank">SEE PRIVACY POLICY</Link></h3>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;