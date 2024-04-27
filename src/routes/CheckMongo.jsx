import React, { useState, useEffect } from "react";
import axios from "axios";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { FaCheckCircle, FaTimesCircle, FaTrash, FaEdit } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc } from "firebase/firestore";
import { storage } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Compressor from "compressorjs";

function CheckMongo() {
    const [data, setData] = useState([]);
    const [updating, setUpdating] = useState(false);
    const db = getFirestore();
    const API_URL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}getAllData`);
                const mongoData = response.data;

                const checkFirestore = async (item) => {
                    const docRef = doc(db, item.firestoreCollection, item.title);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        return { ...item, existsInFirestore: true };
                    } else {
                        return { ...item, existsInFirestore: false };
                    }
                };

                const dataWithFirestoreCheck = await Promise.all(mongoData.map(item => checkFirestore(item)));
                setData(dataWithFirestoreCheck);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
        setData(data.filter(item => item.title !== title));
    };

    /* -------------------------------------------------------------------------- */

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [vendor, setVendor] = useState('');
    const [fileType, setFileType] = useState('');
    const [expectedFileType, setExpectedFileType] = useState('');
    const [firestoreCollection, setfirestoreCollection] = useState('');
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !title || !expectedFileType) {
            setError('Please fill all required fields, select a file, and specify the file type.');
            return;
        }

        if (file.type !== expectedFileType) {
            setError('The selected file does not match the specified file type.');
            return;
        }

        let uploadFile = file;

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

        try {
            if (imageExtensions.includes(fileExtension)) {
                const compressedFile = await imageCompress(file);
                uploadFile = compressedFile;
            }
            else if (file.size > 1024 * 1024 * 5) {
                setError('File size exceeds 5MB limit.');
                return;
            }

            setError('');

            const mediaPath = `${firestoreCollection}/${uploadFile.name}`;
            const fileRef = ref(storage, `${mediaPath}`);
            const uploadTask = uploadBytesResumable(fileRef, uploadFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setLoading(true);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                    setUploadTask(uploadTask);
                },
                (error) => {
                    setError(`Upload failed: ${error.message}`);
                    setLoading(false);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    await setDoc(doc(db, firestoreCollection, title), {
                        firestoreCollection,
                        title,
                        description,
                        vendor,
                        url,
                        fileName: uploadFile.name,
                        fileType: fileType,
                        keywords: [],
                        views: 0,
                        likes: 0,
                        dislikes: 0,
                        time_uploaded: new Date(),
                    });

                    setUpdating(false);

                    alert('Media uploaded successfully!');
                    resetForm();
                }
            );
        } catch (error) {
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {

        setExpectedFileType(e.target.value);
        if (e.target.value === 'image/png' || e.target.value === 'image/jpeg' || e.target.value === 'image/jpg' || e.target.value === 'image/gif' || e.target.value === 'image/webp' || e.target.value === 'image/svg') {
            setFileType('image');
        } else if (e.target.value === 'video/mp4') {
            setFileType('video');
        } else if (e.target.value === 'audio/mpeg') {
            setFileType('audio');
        } else if (e.target.value === 'application/pdf') {
            setFileType('pdf');
        }

    };

    const handleTagInputChange = (e) => {
        setInputTag(e.target.value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputTag) {
            e.preventDefault();
            if (!tags.includes(inputTag) && inputTag.trim() !== '') {
                setTags([...tags, inputTag.trim()]);
                setInputTag('');
            }
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const resetForm = () => {
        setFile(null);
        setTitle('');
        setDescription('');
        setVendor('');
        setTags([]);
        setError('');
        setProgress(0);
        setLoading(false);
        setUpdating(false);
        setCurrentItem(null);
    };


    const startUpdating = (item) => {
        setUpdating(true);

        setTitle(item.title);
        setDescription(item.description);
        setfirestoreCollection(item.firestoreCollection);
    };

    return (
        <>
            {updating ? (
                <div className="upload-form-container">
                    <form onSubmit={handleSubmit} className="upload-form">
                        {loading ? (
                            <>
                                <div className="loading-indicator">
                                    <p>{Math.round(progress)}% done uploading</p>
                                </div>
                                <div className="cancel-btn-container">
                                    <button type="button" onClick={cancelUpload} className="cancel-btn">Cancel Upload</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <select
                                        value={expectedFileType}
                                        onChange={e => handleFileChange(e)}
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

                                <div className="form-group">
                                    <input type="text" placeholder="Vendor" value={vendor} onChange={e => setVendor(e.target.value)} />
                                </div>

                                <div className="form-group tags-input-container">
                                    <label htmlFor="tags-input">Tags:</label>
                                    {tags.map((tag, index) => (
                                        <div key={index} className="tag-item">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="tag-remove-btn">x</button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        id="tags-input"
                                        placeholder="Add a tag"
                                        value={inputTag}
                                        onChange={handleTagInputChange}
                                        onKeyDown={handleTagInputKeyDown}
                                    />
                                </div>

                                <div className="form-group">
                                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                                </div>

                                <button type="submit" className="submit-btn">Upload</button>
                            </>
                        )}
                    </form>

                    {error && <>
                        <br />
                        <hr />
                        <br />
                        <p className="error-message">{error}</p>
                        <hr />
                    </>}
                </div>) : (
                <>
                    <div className="users-list-container">
                        <h1 className="users-list-title">Data from MongoDB</h1>
                        <div className="users-list-table-wrapper">
                            <table className="users-list-table">
                                <thead>
                                    <tr>
                                        <th>Delete</th>
                                        <th>Update</th>
                                        <th>Title</th>
                                        <th>Collection</th>
                                        <th>Exists in Firestore</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => (
                                        <tr key={item._id}>
                                            {!item.existsInFirestore ? (
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            onClick={() => handleMongoDBDelete(item.title)}
                                                            className="delete-button action-button"
                                                        >
                                                            <FaTrash /> Delete
                                                        </button>
                                                    </div>
                                                </td>) : (<td> <Link to="/handlemedia"> Delete here </Link> </td>)
                                            }

                                            {!item.existsInFirestore ? (
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            onClick={() => startUpdating(item)}
                                                            className="delete-button action-button"
                                                        >
                                                            <FaEdit /> Update
                                                        </button>
                                                    </div>
                                                </td>)
                                                : (<td> <Link to="/handlemedia"> Update here </Link> </td>)}
                                            <td>{item.title}</td>
                                            <td>{item.firestoreCollection}</td>
                                            <td>
                                                {item.existsInFirestore ? (
                                                    <FaCheckCircle color="green" className="action-icon" />
                                                ) : (
                                                    <FaTimesCircle color="red" className="action-icon" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default CheckMongo;
