import React, { useState } from "react";
import "../Styles/Signup.css";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /*
        *handleSubmit button
        *e represents user input, in this case, the email and password
        *createUserWithEmailAndPassword is a firebase function that takes in the auth and the email and password
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const usernameRef = doc(db, "usernames", username);
        const docSnap = await getDoc(usernameRef);

        if (docSnap.exists()) {
            alert("Username is already taken. Please choose another one.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(usernameRef, { uid: userCredential.user.uid, email: email }); // It's a good idea to also save the email alongside the uid for reference
            console.log(userCredential);
            navigate('/');
            alert("Signed up successfully! Please Sign In to continue");
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("The email address is already in use by another account.");
            } else {
                console.error("ERROR SIGNUP: ", error);
                alert(error.message);
            }
        }
    };

    return (
        <div className="SigninImageContainer">
            <div className="SigninContainer">
                <h1> Sign Up </h1>
                <form>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <br />

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

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />

                    <br />

                    <button type="submit" onClick={handleSubmit}> Sign Up </button>
                </form>

                <p className="AlreadyAccount"> Already have an account? <a href="/login"> Sign In </a></p>
            </div>
        </div>
    );
}

export default SignUp;