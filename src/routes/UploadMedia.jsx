import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../Styles/UploadMedia.css';

function UploadMedia() {
    const navigate = useNavigate();
    const auth = getAuth();

    const [file, setFile] = useState(null);
    const [mediaType, setMediaType] = useState('');
    const [subscriptionType, setSubscriptionType] = useState('');

    const [vendor, setVendor] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !title) {
            setError('Please fill all required fields and select a file.');
            return;
        }

        setLoading(true);
        const fileRef = ref(storage, `media/${new Date().getTime()}_${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed',
            null,
            error => setError(`Upload failed: ${error.message}`),
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    await setDoc(doc(db, mediaType, title), {
                        mediaType,
                        title,
                        description,
                        vendor,
                        url,
                        subscriptionType,
                        keywords: [],
                        views: 0,
                        likes: 0,
                        dislikes: 0,
                        time_uploaded: new Date(),
                    });

                    alert('Media uploaded successfully!');
                    resetForm();
                } catch (uploadError) {
                    setError(`Upload failed: ${uploadError.message}`);
                } finally {
                    setLoading(false);
                }
            }
        );
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
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="upload-form">
                {loading ? <p>Loading...</p> : (
                    <>
                        <div className="form-group">
                            <input type="file" onChange={e => setFile(e.target.files[0])} />
                        </div>

                        <div className="form-group">
                            <select
                                value={mediaType}
                                onChange={e => setMediaType(e.target.value)}
                                aria-label="Select media type"
                            >
                                <option value="" disabled hidden>Select Media Type</option>
                                <option value="e-tv">E-TV</option>
                                <option value="e-zine">E-ZINE</option>
                                <option value="pb-music">PB-MUSIC</option>
                                <option value="pb-fashion">PB-FASHION</option>
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

                        <button type="submit" className="submit-btn">Upload</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default UploadMedia;
