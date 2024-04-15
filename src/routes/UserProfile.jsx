import React, { useState, useEffect } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { doc, getFirestore, getDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import "../Styles/UserProfile.css";
import { useNavigate, Link } from 'react-router-dom';
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AvatarEdit from 'react-avatar-edit';
 
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

    const [image, setImage] = useState("")

    const storage = getStorage();

    const [previewImage, setPreviewImage] = useState("");
    const [croppedImage, setCroppedImage] = useState("");
    const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

    const handleFileUpload = async (event) => {
        // Define the file size limit in bytes (5MB)
        const fileSizeLimit = 5 * 1024 * 1024; // 5 MB
    
        // Get the selected file
        const file = event.target.files[0];
    
        // Check if the file exists and if it's an image
        if (file && file.type.startsWith("image/")) {
            // Check if the file size exceeds the limit
            if (file.size > fileSizeLimit) {
                alert("File size exceeds the 5MB limit. Please upload a smaller image.");
                return; // Stop further processing
            }
    
            // Display the cropping interface
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
                setIsCropDialogOpen(true); // Open cropping dialog
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    const handleImageSave = async () => {
        if (croppedImage) {
            try {
                // Fetch the cropped image and get its blob
                const response = await fetch(croppedImage);
                const blob = await response.blob();
                
                // Determine the file extension based on the MIME type of the blob
                const fileType = blob.type.split('/')[1]; // e.g. 'image/jpeg' -> 'jpeg'
                
                // Create a storage reference with the userId and the file extension
                const storageRef = ref(storage, `profileImages/${userId}.${fileType}`);
                
                // Upload the cropped image to Firebase storage
                await uploadBytes(storageRef, blob);
                
                // Get the URL of the uploaded image
                const imageUrl = await getDownloadURL(storageRef);
                
                // Update the user's profile in Firestore with the new profile image URL
                const docRef = doc(db, "users", userId);
                await updateDoc(docRef, { profileImageUrl: imageUrl });
                
                // Update local storage
                setFormData((prevState) => {
                    const updatedFormData = { ...prevState, profileImageUrl: imageUrl };
                    localStorage.setItem('formData', JSON.stringify(updatedFormData));
                    return updatedFormData;
                });
                
                // Notify the user that the profile image has been updated
                alert("Profile image updated successfully!");
                
                // Close the cropping dialog
                setIsCropDialogOpen(false);
    
                // Go to the home page
                navigate("/");
    
                // Reload the website
                window.location.reload();
    
                // Reset preview image and cropped image state
                setPreviewImage("");
                setCroppedImage("");
            } catch (error) {
                console.error("Error uploading the cropped image:", error);
                alert("Failed to update profile image.");
            }
        } else {
            alert("Please crop the image before saving.");
        }
    };
    


    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);
            setUserId(user.uid);
            getDoc(userDocRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setFormData(userData);
                        setImage(userData.profileImageUrl || ''); // Set the profile image URL in state
                        localStorage.setItem('formData', JSON.stringify(userData));
                        console.log(formData);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);


    return (
        <div className='profile-page'>
            <div className='profile-info'>
                <div className='profile-title'>
                    <h1>User Profile</h1>
                </div>
                <div className="profile-icon">
                    <img src={image || 'https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png'} alt="Profile Icon" />
                </div>
                <div className='UploadProfileImage'>
                    <label htmlFor="ProfileImage">Profile Image</label>
                    <InputText
                        className='NewProfileImage'
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                    <small id="ProfileImage-help">
                        Enter a image file, maximum file size 5MB
                    </small>
                </div>
                <Dialog header="Crop Image" visible={isCropDialogOpen} onHide={() => setIsCropDialogOpen(false)}>
                    <AvatarEdit
                        width={500}
                        height={500}
                        onCrop={setCroppedImage}
                        onClose={() => setIsCropDialogOpen(false)}
                        src={previewImage}
                        imageWidth={500}
                        exportAsSquare
                    />
                    <button className='Save-Image' onClick={handleImageSave}>Save Image</button>
                </Dialog>
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