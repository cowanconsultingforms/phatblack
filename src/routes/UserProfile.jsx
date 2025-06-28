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
    const [processing, setProcessing] = useState(false);
    const [cancelPopup, setCancelPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log("UserProfile - Current user:", user);
        if (user) {
            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);
            setUserId(user.uid);
            console.log("UserProfile - User UID:", user.uid);
            //setCurrentUser(formData.username);
            getDoc(userDocRef)
                .then((docSnapshot) => {
                    console.log("UserProfile - Document exists:", docSnapshot.exists());
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        console.log("UserProfile - User data:", userData);
                        console.log("UserProfile - User role:", userData.role);
                        setFormData(userData);
                        localStorage.setItem('formData', JSON.stringify(userData));
                    } else {
                        console.log("UserProfile - User document does not exist");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        } else {
            console.log("UserProfile - No user logged in");
        }
    }, []);

    useEffect(() => {
        //disabling/enabling scrolling when confirm cancel pop up is open/closed
        if (cancelPopup) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto'; 
        }
        
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [cancelPopup]);

    const subscriptionCancellationUrl = import.meta.env.VITE_APP_SUBSCRIPTION_CANCELLATION_URL;
    
    //handle cancelling subscription
    async function cancelSubscription() {
        // event.preventDefault();
        setProcessing(true);
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
                setProcessing(false);
                setTimeout(()=>{
                    navigate("/");
                },3000);
            } else {
                console.error("Failed to cancel", data);
                alert(data.message);
                setProcessing(false);
            }
        } catch (error) {
            console.error("Error cancelling subscription:", error);
            alert(error.message);
            setProcessing(false);
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
        // Get the selected file
        const file = event.target.files[0];
    
        // Check if the file exists and if it's an image
        if (file && file.type.startsWith("image/")) {
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
                
                // Compress the image to reduce file size
                const compressedBlob = await compressImage(blob, 50); // 50KB target size
                
                // Create a storage reference with the userId and a unique filename
                const fileType = compressedBlob.type.split('/')[1];
                const storageRef = ref(storage, `profileImages/${userId}.${fileType}`);
                
                // Upload the compressed image to Firebase Storage
                await uploadBytes(storageRef, compressedBlob);
                
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
    
    // Function to compress the image to target size in KB
    const compressImage = async (blob, targetSizeKB) => {
        const MAX_SIZE = targetSizeKB * 1024; // Convert KB to bytes
        const image = new Image();
        image.src = URL.createObjectURL(blob);
    
        await new Promise(resolve => {
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                const width = image.width;
                const height = image.height;
    
                let scaleFactor = 1;
                let quality = 1;
    
                // Adjust scale factor and quality based on image size
                if (blob.size > MAX_SIZE) {
                    scaleFactor = Math.min(MAX_SIZE / width, MAX_SIZE / height);
                    quality = 0.7; // Adjust quality based on desired compression ratio
                }
    
                canvas.width = width * scaleFactor;
                canvas.height = height * scaleFactor;
    
                ctx.drawImage(image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    
                canvas.toBlob((resultBlob) => {
                    resolve(resultBlob);
                }, 'image/jpeg', quality);
            };
        });
    
        return blob;
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
        {cancelPopup ? (
            <div className="cancel-pop-up">
                <div className="cancel-pop-up-content">
                    <h1 className="cancel-pop-up-header">Are You Sure You Want To Cancel?</h1>
                    <div className="cancel-pop-up-button-container">
                        <button className="cancel-pop-up-button" onClick={()=>{
                            setCancelPopup(false);
                            cancelSubscription();
                        }}>Yes</button>
                        <button className="cancel-pop-up-button" onClick={()=>{
                            setCancelPopup(false);
                        }}>No</button>
                    </div>
                </div>
            </div>
        ) : null}
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
                        Please enter an image file
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
                {formData.role === "user" ? (
                    <button style={{backgroundColor: "#d35400"}} type="submit" onClick={()=>{navigate("/subscribe")}}> Subscribe </button>
                ) : (
                    <button style={{backgroundColor: "#d35400"}} type="submit" onClick={()=> {setCancelPopup(true)}}> {processing ? "Processing..." : "Cancel Subscription"} </button>
                ) }
                <div className="links">
                    <h3 className="link"><Link to="https://phatblack.com/WP/restrictions/" target="_blank">RESTRICTIONS</Link></h3>
                    <h3 className="link"><Link to="https://phatblack.com/WP/terms-of-service/" target="_blank">TERMS OF SERVICE</Link></h3>
                    <h3 className="link"><Link to="https://phatblack.com/WP/privacy-policy/" target="_blank">PRIVACY POLICY</Link></h3>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;