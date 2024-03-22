import React, { useState, useEffect } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import "../Styles/UserProfile.css";

function UserProfile() {
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {
            username: "",
            role: "",
            email: "",
        };
    });
    const [authPassword, setAuthPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);
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

            const docRef = doc(db, "users", uid);
            await updateDoc(docRef, { username: formData.username, email: formData.email });

            if (newPassword === confirmNewPassword) {
                await updatePassword(user, newPassword);
                console.log("Password changed successfully!");
            }

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
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <label className="label" htmlFor="role">Role: </label>
                    <input
                        type="text"
                        id="role"
                        name='role'
                        value={formData.role}
                        readOnly
                    />
                    <label className="label" htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />

                    <label className="label" htmlFor="newPassword">New Password: </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />

                    <label className="label" htmlFor="confirmNewPassword">Confirm New Password: </label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                    />

                    <label className="label" htmlFor="authPassword">Current Password: </label>
                    <input
                        type="password"
                        id="authPassword"
                        name="authPassword"
                        value={authPassword}
                        onChange={handleAuthPasswordChange}
                        required
                    />
                    <button type="submit">Update </button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
