import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteObject, ref, getStorage } from 'firebase/storage';
import { FaTrash, FaPen } from 'react-icons/fa';
import '../Styles/HandleMedia.css';

function HandleMedia() {

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    };

    const navigate = useNavigate();
    const auth = getAuth();

    const [media, setMedia] = useState([]);
    // const [mediaRef, setMediaRef] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [editDescription, setEditDescription] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) return navigate('/');

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (!['admin', 'staff', 'super admin'].includes(userDoc.data()?.role)) {
                navigate('/');
                return;
            }
            fetchMedia();
        });


    }, [navigate, auth]);

    const fetchMedia = async () => {
        const mediaCollection = collection(db, 'searchData');
        const mediaSnapshot = await getDocs(mediaCollection);
        const mediaFetchPromises = [];

        mediaSnapshot.docs.forEach((docSnapshot) => {
            const mediaPath = docSnapshot.data().path;
            if (mediaPath) {
                const [collectionName, documentId] = mediaPath.split('/');
                if (collectionName && documentId) {
                    const mediaDocRef = doc(db, collectionName, documentId);
                    mediaFetchPromises.push(getDoc(mediaDocRef));
                } else {
                    console.warn("Incomplete media path:", mediaPath);
                }
            }
        });

        const mediaDocs = await Promise.all(mediaFetchPromises);
        const mediaList = mediaDocs.filter(docSnapshot => docSnapshot.exists()).map((docSnapshot) => {
            const mediaData = docSnapshot.data();
            return {
                id: docSnapshot.id,
                mediaType: mediaData.mediaType,
                url: mediaData.url,
                title: mediaData.title,
                description: mediaData.description,
                fileName: mediaData.fileName,
            };
        });

        setMedia(mediaList);
    };



    const deleteMedia = async (mediaItem) => {
        try {

            let mediaIdstring = mediaItem.id;
            let mediaId = mediaIdstring.toLowerCase();

            await deleteDoc(doc(db, 'searchData', mediaId));

            await deleteDoc(doc(db, `${mediaItem.mediaType}`, mediaItem.title));

            /*  console.log('Deleting media:', mediaItem.title)
             console.log('Deleting media:', mediaItem.id)
             console.log('Deleting media:', mediaItem.description)
             console.log('Deleting file:', mediaItem.fileName) */

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

    const editMedia = async (mediaItem) => {
        if (editDescription[mediaItem.id]) {
            try {
                const mediaRef = doc(db, mediaItem.mediaType, mediaItem.title);
                await updateDoc(mediaRef, { description: editDescription[mediaItem.id] });
                alert("Media updated successfully!");

                setEditingId(null);
                setEditDescription(prev => ({ ...prev, [mediaItem.id]: "" }));

                fetchMedia();
            } catch (error) {
                console.error("Error editing media:", error);
            }
        }
    };

    return (
        <>
            <h1 className="users-list-title">Media Management</h1>
            <div className="media-list-container">
                {media.map((item, index) => (
                    <div key={index} className="media-item">
                        <h3>{item.title}</h3>
                        {editingId === item.id ? (
                            <input
                                type="text"
                                defaultValue={editDescription[item.id] || item.description}
                                onChange={(e) => setEditDescription({ ...editDescription, [item.id]: e.target.value })}
                            />
                        ) : (
                            <p>{item.description}</p>
                        )}

                        <p>{item.mediaType}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">View Media</a>

                        <button onClick={() => deleteMedia(item)} className="media-btn">
                            <FaTrash /> Delete
                        </button>

                        <br />
                        {editingId === item.id ? (
                            <button onClick={() => editMedia(item)} className="media-btn">Save</button>
                        ) : (
                            <button onClick={() => { setEditingId(item.id); setEditDescription({ ...editDescription, [item.id]: item.description }); }} className="media-btn">
                                <FaPen /> Edit
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default HandleMedia;