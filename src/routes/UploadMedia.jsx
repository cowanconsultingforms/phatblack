import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Compressor from 'compressorjs';
import '../Styles/UploadMedia.css';

function UploadMedia() {
    const navigate = useNavigate();
    const auth = getAuth();

    const [file, setFile] = useState(null);
    const [expectedFileType, setExpectedFileType] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [subscriptionType, setSubscriptionType] = useState('');
    const [vendor, setVendor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadTask, setUploadTask] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/');
            else {
                const userRef = doc(db, "users", user.uid);
                getDoc(userRef).then(userDoc => {
                    if (!['admin', 'staff', 'super admin'].includes(userDoc.data()?.role)) {
                        navigate('/');
                    }
                }).catch(err => setError(err.message));
            }
        });
        return () => unsubscribe();
    }, [navigate, auth]);

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

            setLoading(true);
            setError('');

            const mediaPath = `${mediaType}/${uploadFile.name}`;
            const fileRef = ref(storage, `${mediaPath}`);
            const uploadTask = uploadBytesResumable(fileRef, uploadFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    setError(`Upload failed: ${error.message}`);
                    setLoading(false);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    await setDoc(doc(db, mediaType, title), {
                        mediaType,
                        title,
                        description,
                        vendor,
                        url,
                        fileName: uploadFile.name,
                        subscriptionType,
                        keywords: [],
                        views: 0,
                        likes: 0,
                        dislikes: 0,
                        time_uploaded: new Date(),
                    });

                    await setDoc(doc(db, 'searchData', title.toLowerCase()), {
                        mediaType,
                        title: title.toLowerCase(),
                        path: `${mediaType}/${title}`,
                    });

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

    const cancelUpload = () => {
        if (uploadTask) {
            uploadTask.cancel();
            setLoading(false);
            setError('Upload canceled.');
            setUploadTask(null);
        }
    };

    const resetForm = () => {
        setFile(null);
        setMediaType('');
        setSubscriptionType('');
        setVendor('');
        setTitle('');
        setDescription('');
        setLoading(false);
        setError('');
    };

    return (
        <div className="upload-form-container">
            <form onSubmit={handleSubmit} className="upload-form">
                {loading ? (
                    <>
                        <div className="loading-indicator">
                            <div className="loading-spinner"></div>
                            <p>Loading...</p>
                        </div>
                        <button type="button" onClick={cancelUpload} className="cancel-btn">Cancel Upload</button>
                    </>
                ) : (
                    <>
                        <div className="form-group">
                            <select
                                value={expectedFileType}
                                onChange={e => setExpectedFileType(e.target.value)}
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
                            <select
                                value={mediaType}
                                onChange={e => setMediaType(e.target.value)}
                                aria-label="Select media type"
                            >
                                <option value="" disabled hidden>Select Media Type</option>
                                <option value="pb-tv">PB-TV</option>
                                <option value="pb-zine">PB-ZINE</option>
                                <option value="pb-music">PB-MUSIC</option>
                                <option value="pb-fashion">PB-FASHION</option>
                                <option value="pb-event">PB-EVENT</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select
                                value={subscriptionType}
                                onChange={e => setSubscriptionType(e.target.value)}
                                aria-label="Select subscription type"
                            >
                                <option value="" disabled hidden>Select Subscription Type</option>
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <input type="text" placeholder="Vendor" value={vendor} onChange={e => setVendor(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
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
        </div>
    );
}

export default UploadMedia;