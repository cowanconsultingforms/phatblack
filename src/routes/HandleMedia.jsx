import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteObject, ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FaTrash, FaPen } from 'react-icons/fa';
import '../Styles/HandleMedia.css';
import MediaPreview from '../components/MediaPreview';
import Compressor from 'compressorjs';

function HandleMedia() {
    const navigate = useNavigate();
    const auth = getAuth();

    const [media, setMedia] = useState([]);
    const [showForm, setShowForm] = useState(true);

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

    const filterMediaForm = (
        <div className='update-form-container'>
            <form className='update-form'>
                <h1 className="users-list-title">Filter Media</h1>
                <div className='update-form-group'>
                    <select
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
                        aria-label='Select media type'
                    >
                        <option value="" disabled>Select Media Type</option>
                        <option value="all">All Media</option>
                        <option value="pb-tv">PB-TV</option>
                        <option value="pb-zine">PB-Zine</option>
                        <option value="pb-music">PB-Music</option>
                        <option value="pb-fashion">PB-Fashion</option>
                    </select>
                </div>
            </form>
        </div>
    );

    useEffect(() => {
        if (collectionName) {  // Ensure collectionName is not null or undefined
            fetchMedia(collectionName);
        }
    }, [collectionName]);

    const fetchMedia = async (c) => {
        if (c === 'all') {
            const mediaCollection = collection(db, 'searchData');
            const mediaSnapshot = await getDocs(mediaCollection);
            const mediaList = [];
            for (const docSnapshot of mediaSnapshot.docs) {
                const mediaPath = docSnapshot.data().path;
                if (mediaPath) {
                    const [colName, documentId] = mediaPath.split('/');
                    if (colName && documentId) {
                        const mediaDocRef = doc(db, colName, documentId);
                        const docData = await getDoc(mediaDocRef);
                        if (docData.exists()) {
                            mediaList.push({ id: docData.id, ...docData.data() });
                        }
                    } else {
                        console.warn("Incomplete media path:", mediaPath);
                    }
                }
            }
            setMedia(mediaList);
            setShowMedia(true);
        }
        else if (c !== '') {
            const mediaCollection = collection(db, c);
            const mediaSnapshot = await getDocs(mediaCollection);
            const mediaList = mediaSnapshot.docs.map(docSnapshot => ({
                id: docSnapshot.id,
                ...docSnapshot.data()
            }));
            setMedia(mediaList);
            setShowMedia(true);
        }
    };


    /* deleting media
    -----------------------------------------------------------------------------------------------
    */
    const deleteMedia = async (mediaItem) => {
        try {

            let mediaIdstring = mediaItem.id;
            let mediaId = mediaIdstring.toLowerCase();

            await deleteDoc(doc(db, 'searchData', mediaId));

            await deleteDoc(doc(db, `${mediaItem.mediaType}`, mediaItem.title));

            try {
                const storage = getStorage();
                const fileRef = ref(storage, `${mediaItem.mediaType}/${mediaItem.fileName}`);
                await deleteObject(fileRef);
                console.log('File deleted successfully');
            } catch (error) {
                console.error('Error deleting file:', error);
            }

            fetchMedia();
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

    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

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

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!currentItem) {
            console.error("No media item is selected for update.");
            return;
        }

        console.log("Updating media");

        if (newFile !== null) {
            let uploadFile = newFile;
            // console.log(currentItem.fileName);
            try {
                if (currentItem.fileName) {
                    const storage = getStorage();
                    const oldFileRef = ref(storage, `${currentItem.mediaType}/${currentItem.fileName}`);
                    if (oldFileRef.exists) { await deleteObject(oldFileRef); }
                    console.log('Old file deleted successfully');
                }

                const fileExtension = uploadFile.name.split('.').pop().toLowerCase();
                const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

                if (imageExtensions.includes(fileExtension)) {
                    const compressedFile = await imageCompress(uploadFile);
                    uploadFile = compressedFile;
                }

                const storageRef = ref(storage, `${currentItem.mediaType}/${uploadFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, uploadFile);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.error(error);
                    },
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        const mediaRef = doc(db, `${currentItem.mediaType}`, currentItem.id);
                        await updateDoc(mediaRef, {
                            url: url,
                            description: newDescription,
                            fileType: newFileType,
                        });

                        alert('Media updated successfully!');
                        toggleForm();
                        fetchMedia(collectionName);
                    }
                );
            } catch (error) {
                console.error('Error updating file:', error);
            }
        }
        if (newDescription !== currentItem.description || newDescription !== '') {
            const mediaRef = doc(db, `${currentItem.mediaType}`, currentItem.id);
            await updateDoc(mediaRef, { description: newDescription });
            alert('Media description updated successfully!');
            toggleForm();
            fetchMedia(collectionName);
        }


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
            {showFilter && filterMediaForm}
            {showMedia && (
                <>
                    {showForm ? (
                        <>
                            <h1 className="users-list-title">Media Management</h1>
                            <div className="media-list-container">
                                {media.map((item, index) => (
                                    <div key={index} className="media-item">
                                        <MediaPreview media={item} />

                                        <h3>Title: {item.title}</h3>
                                        <p>Description: {item.description}</p>

                                        <button onClick={() => toggleForm(item)} className="media-btn">
                                            <FaPen /> Edit
                                        </button>
                                        <br />
                                        <button onClick={() => deleteMedia(item)} className="media-btn">
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>) :
                        (
                            <>
                                <div className="update-form-container">
                                    <h1 className="users-list-title"> Currently updating: {currentItem.title} </h1>
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