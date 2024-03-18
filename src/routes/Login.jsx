import React, { useState } from "react";
import "../Styles/Login.css";
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {
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
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert('Please check your email to reset your password.');
            } catch (error) {
                console.error('Password reset error', error);
                alert(error.message);
            }
        } else {
            alert('Please enter your email address first.');
        }
    };

    return (
        <div className="ImageContainer">
            <div className="LoginContainer">
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

                <p className="ForgetPass">Forgot your password? <a href="#" onClick={handlePasswordReset}>Reset it here</a></p>
                <p className="NoAccount"> Don't have an account? <Link to='/signup'>Sign Up!</Link></p>
            </div>
        </div>
    );
}

export default Login;