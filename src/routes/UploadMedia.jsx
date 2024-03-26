import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, storage } from '../firebaseConfig';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../Styles/UploadMedia.css';

function UploadMedia() {
    const navigate = useNavigate();
    const auth = getAuth();

    const [file, setFile] = useState(null);
    const [mediaType, setMediaType] = useState('');
    const [subscriptionType, setSubscriptionType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) return navigate('/');

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (!['admin', 'staff', 'super admin'].includes(userDoc.data()?.role)) {
                navigate('/');
            }
        });
    }, [navigate, auth]);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !mediaType || !title) {
            setError('Please fill all fields and select a file.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const fileRef = ref(storage, `media/${new Date().getTime()}_${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.on('state_changed', null,
                (error) => {
                    setError(`Upload failed: ${error.message}`);
                    setLoading(false);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    const collectionName = mediaType === 'video' ? 'videos' : 'articles';

                    const docRef = doc(db, collectionName, title);
                    await setDoc(docRef, {
                        mediaType,
                        title,
                        description,
                        url,
                        subscriptionType,
                        keywords: []
                    });

                    const searchDataRef = doc(db, 'searchData', title.toLowerCase());
                    await setDoc(searchDataRef, {
                        title: title.toLowerCase(),
                        mediaType,
                        ref: docRef.path
                    });

                    alert('Media uploaded successfully!');
                    resetForm();
                }
            );
        } catch (uploadError) {
            setError(`Upload failed: ${uploadError.message}`);
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFile(null);
        setMediaType('video');
        setTitle('');
        setDescription('');
        setLoading(false);
    };

    return (
        <div className="upload-form-container">
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <input type="file" onChange={handleFileChange} />
                    </div>

                    <div className="form-group">
                        <select
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value)}
                            aria-label="Select media type"
                        >
                            <option value="" disabled selected>Select media type</option>
                            <option value="video">Video</option>
                            <option value="article">Article</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select
                            value={subscriptionType}
                            onChange={(e) => setSubscriptionType(e.target.value)}
                            aria-label="Select subscription type"
                        >
                            <option value="" disabled selected>Choose subscription</option>
                            <option value="free">Free</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <button type="submit" className="submit-btn">Upload</button>
                </form>
            )}
        </div>
    );
}

export default UploadMedia;
