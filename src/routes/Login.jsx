import React, { useState } from "react";
import "../Styles/Login.css";
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
        signInWithEmailAndPassword(auth, email, password).then((user) => {
            console.log(user);
            sessionStorage.setItem("accessToken", user.user.auth.lastNotifiedUid);
            navigate('/');
            location.reload();
            alert("Signed In successfully!");
        }).catch((error) => {
            console.log("ERROR SIGNIN: ", error);
            alert(error);
        })
    }

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
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
                <p className="NoAccount"> Don't have an account? <a href="/signup">Sign Up!</a></p>
            </div>
        </div>
    );
}

export default Login;