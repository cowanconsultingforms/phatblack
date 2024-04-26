import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteObject, ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../Styles/HandleMedia.css';
import MediaItem from '../components/MediaItem';
import MediaPreview from '../components/MediaPreview';
import Compressor from 'compressorjs';
import axios from 'axios';

function HandleMedia() {
    const navigate = useNavigate();
    const auth = getAuth();
    const API_URL = import.meta.env.VITE_APP_API_URL;

    const [media, setMedia] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [loading, setLoading] = useState(false);


    //For editing media
    const [newDescription, setNewDescription] = useState('');
    const [newFile, setNewFile] = useState(null);
    const [newFileType, setNewFileType] = useState('');
    const [expectedFileType, setExpectedFileType] = useState('');

    const [currentItem, setCurrentItem] = useState(null);

    //Filtering
    const [collectionName, setCollectionName] = useState('');
    const [showFilter, setShowFilter] = useState(true);
    const [showMedia, setShowMedia] = useState(false);

    // Check if user is logged in and is an admin
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) return navigate('/');

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (!['admin', 'staff', 'super admin'].includes(userDoc.data()?.role)) {
                navigate('/');
                return;
            }
        });


    }, [navigate, auth]);

    // Filter media form
    const filterMediaForm = (
        <div className='update-form-container'>
            <form className='update-form'>
                <h1 className="users-list-title">Select Media Type</h1>
                <div className='update-form-group'>
                    <select
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        aria-label='Select media type'
                    >
                        <option value="" disabled>Select Media Type</option>
                        <option value="all">All Media</option>
                        <option value="pb-tv">TV</option>
                        <option value="pb-radio">Radio</option>
                        <option value="pb-zine">Zine</option>
                        <option value="pb-events">Events</option>
                        <option value="pb-mall">Mall</option>
                        <option value="pb-gaming">Gaming</option>
                        <option value="pb-digital">Digital</option>
                        <option value="pb-fashion">Fashion</option>
                        <option value="pb-music">Music</option>
                        <option value="pb-social">Social</option>
                    </select>
                </div>
            </form>
        </div>
    );

    // Fetch media every time collectionName changes
    useEffect(() => {
        if (collectionName) {  // Ensure collectionName is not null or undefined
            fetchMedia(collectionName);
        }
    }, [collectionName]);

    const fetchMedia = async (c) => {
        setLoading(true);
        setMedia([]);
        setShowMedia(false);

        try {
            let mediaList = [];
            if (c === 'all') {
                // in future, add more collections here
                const collections = ['pb-tv', 'pb-radio', 'pb-zine', 'pb-events', 'pb-mall', 'pb-gaming', 'pb-digital', 'pb-fashion', 'pb-music', 'pb-social'];
                const fetchPromises = collections.map(colName => {
                    const mediaCollection = collection(db, colName);
                    return getDocs(mediaCollection);
                });

                const results = await Promise.all(fetchPromises);
                results.forEach(result => {
                    result.docs.forEach(doc => {
                        mediaList.push({ id: doc.id, ...doc.data() });
                    });
                });
            }
            else {
                const mediaCollection = collection(db, c);
                const mediaSnapshot = await getDocs(mediaCollection);
                mediaList = mediaSnapshot.docs.map(docSnapshot => ({
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                }));
            }

            setMedia(mediaList);
            setShowMedia(true);

            /*
            if (c === 'all') {
                const collections = ['pb-tv', 'pb-zine', 'pb-music', 'pb-fashion'];
                const fetchPromises = collections.map(colName => {
                    const mediaCollection = collection(db, colName);
                    return getDocs(mediaCollection);
                });

                const results = await Promise.all(fetchPromises);
                results.forEach(result => {
                    result.docs.forEach(doc => {
                        mediaList.push({ id: doc.id, ...doc.data() });
                    });
                });
            } else {
                const mediaCollection = collection(db, c);
                const mediaSnapshot = await getDocs(mediaCollection);
                mediaList = mediaSnapshot.docs.map(docSnapshot => ({
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                }));
            }
            */
        } catch (error) {
            console.error("Error fetching media:", error);
        } finally {
            setLoading(false);
        }
    };


    /* deleting media
    -----------------------------------------------------------------------------------------------
    */
    // Delete media item

    const handleMongoDBDelete = async (title) => {
        try {
            const response = await axios.delete(`${API_URL}delete?title=${encodeURIComponent(title)}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('MongoDB delete successful');
        } catch (error) {
            console.error('Error deleting MongoDB:', error);
        }
    };

    const deleteMedia = async (mediaItem) => {
        try {
            // Prompt the user for confirmation
            const confirmDelete = window.confirm("Are you sure you want to delete this item?");

            // If user confirms deletion, proceed with deletion
            if (confirmDelete) {
                // Perform deletion logic
                let mediaIdstring = mediaItem.id;
                let mediaId = mediaIdstring.toLowerCase();

                await deleteDoc(doc(db, `${mediaItem.firestoreCollection}`, mediaItem.title));
                handleMongoDBDelete(mediaItem.title);

                // Delete media file from storage
                const storageRef = ref(storage, `${mediaItem.firestoreCollection}/${mediaItem.fileName}`);
                await deleteObject(storageRef);

                // Fetch media again after deletion
                fetchMedia(collectionName);

                // Inform user about successful deletion
                console.log('Media deleted successfully');
            } else {
                // If user cancels deletion, do nothing
                console.log('Deletion cancelled by user');
            }
        } catch (error) {
            console.error("Error deleting media:", error);
        }
    };

    /*
    -----------------------------------------------------------------------------------------------
    */


    /* editing media
    -----------------------------------------------------------------------------------------------
    */
    const imageCompress = (file) => {
        return new Promise((resolve, reject) => {
            let quality;
            const fileSizeInMB = file.size / 1024 / 1024;

            if (fileSizeInMB > 5) {
                quality = 0.3;
            } else if (fileSizeInMB > 1) {
                quality = 0.5;
            } else {
                quality = 0.8;
            }

            new Compressor(file, {
                quality: quality,
                maxWidth: 1920,
                maxHeight: 1080,
                success: (compressedResult) => {
                    resolve(compressedResult);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    };

    // Handle file change
    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    // Handle expected file type change
    const handleFileTypeChange = (e) => {
        setExpectedFileType(e.target.value);
        if (e.target.value === 'image/png' || e.target.value === 'image/jpeg' || e.target.value === 'image/jpg' || e.target.value === 'image/gif' || e.target.value === 'image/webp' || e.target.value === 'image/svg') {
            setNewFileType('image');
        } else if (e.target.value === 'video/mp4') {
            setNewFileType('video');
        } else if (e.target.value === 'audio/mpeg') {
            setNewFileType('audio');
        } else if (e.target.value === 'application/pdf') {
            setNewFileType('pdf');
        }
    }

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleMongoDBUpdate = async () => {
        try {
            const response = await fetch(`${API_URL}update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: currentItem.title, description: newDescription })
            });
            const data = await response.json();
            console.log('MongoDB updated successfully:', data);
        } catch (error) {
            console.error('Error updating MongoDB:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!currentItem) {
            console.error("No media item is selected for update.");
            return;
        }

        try {
            if (newFile) {
                await handleFileUpload(newFile);
            }
            if (newDescription !== currentItem.description || newDescription !== '') {
                await handleDescriptionUpdate();
            }
            alert('Media updated successfully!');
            toggleForm();
            fetchMedia(collectionName);
        } catch (error) {
            console.error('Error updating media:', error);
        }
    };

    const handleFileUpload = async (file) => {
        // Delete the old file
        const storage = getStorage();
        const oldFileRef = ref(storage, `${currentItem.firestoreCollection}/${currentItem.fileName}`);
        await deleteObject(oldFileRef);

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
            file = await imageCompress(file);
        } else if (file.size > 5 * 1024 * 1024) { // No larger than 5MB
            throw new Error('File size must be less than 5MB');
        }

        // Upload the new file
        const storageRef = ref(storage, `${currentItem.firestoreCollection}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const snapshot = await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                null,
                error => reject(error),
                () => resolve(uploadTask.snapshot)
            );
        });

        const url = await getDownloadURL(snapshot.ref);
        const mediaRef = doc(db, `${currentItem.firestoreCollection}`, currentItem.id);
        await updateDoc(mediaRef, {
            url: url,
            fileName: file.name,
            fileType: newFileType,
        });
    };

    const handleDescriptionUpdate = async () => {
        const mediaRef = doc(db, `${currentItem.firestoreCollection}`, currentItem.id);
        await updateDoc(mediaRef, { description: newDescription });
        handleMongoDBUpdate();  // Assuming this does not need to wait for user interaction
    };

    /*
    -----------------------------------------------------------------------------------------------
    */

    const toggleForm = (item) => {
        if (item) {
            setCurrentItem(item);
            setNewDescription(item.description);
        } else {
            setCurrentItem(null);
            setNewDescription('');
            setNewFile('');
        }
        setShowForm(prev => !prev);
        setShowFilter(prev => !prev);
    }

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            )}
            {showFilter && filterMediaForm}
            {showMedia && (
                <>
                    {showForm ? (
                        <>
                            <h1 className="users-list-title">Media Management</h1>
                            <div className="media-list-container">
                                {media.map((item, index) => (
                                    <MediaItem
                                        key={index}
                                        item={item}
                                        onDelete={() => deleteMedia(item)}
                                        onEdit={() => toggleForm(item)}
                                    />
                                ))}
                            </div>
                        </>
                    ) :
                        (
                            <>
                                <div className="update-form-container">
                                    <h1 className="users-list-title"> Currently updating: {currentItem.title} </h1>
                                    <MediaPreview media={currentItem} />
                                    <form className="update-form" onSubmit={handleUpdate}>

                                        <div className="update-form-group">
                                            <select
                                                value={expectedFileType}
                                                onChange={e => handleFileTypeChange(e)}
                                                aria-label="Select expected file type"
                                            >
                                                <option value="" disabled>Select File Type</option>
                                                <option value="image/png">PNG Image (.png)</option>
                                                <option value="image/jpeg">JPEG Image (.jpeg/.jpg)</option>
                                                <option value="video/mp4">MP4 Video (.mp4)</option>
                                                <option value="audio/mpeg">Audio File (.mp3)</option>
                                                <option value="application/pdf">PDF Document (.pdf)</option>
                                            </select>
                                        </div>

                                        <div className="update-form-group">
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                value={newDescription}
                                                onChange={handleDescriptionChange}
                                            />
                                        </div>

                                        <div className="update-form-group">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        <button type="submit" className="media-btn">Update</button>

                                        <br />

                                        <button type="button" onClick={() => toggleForm()} className="media-btn">Cancel</button>

                                    </form>

                                </div>
                            </>
                        )
                    }
                </>
            )}


        </>
    );
}

export default HandleMedia;