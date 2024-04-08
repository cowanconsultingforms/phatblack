import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteObject, ref, getStorage } from 'firebase/storage';
import { FaTrash } from 'react-icons/fa';
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
        let mediaList = [];

        for (let docSnapshot of mediaSnapshot.docs) {
            const mediaPath = docSnapshot.data().path;
            if (mediaPath) {
                const [collectionName, documentId] = mediaPath.split('/');
                const mediaDoc = doc(db, collectionName, documentId);
                const mediaDocSnapshot = await getDoc(mediaDoc);
                if (mediaDocSnapshot.exists()) {
                    const mediaData = mediaDocSnapshot.data();
                    mediaList.push({
                        id: mediaDocSnapshot.id,
                        mediaType: mediaData.mediaType,
                        url: mediaData.url,
                        title: mediaData.title,
                        description: mediaData.description,
                        fileName: mediaData.fileName,
                    });
                }
            }
        }

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
                const fileRef = ref(storage, `media/${mediaItem.fileName}`);
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

    return (
        <>
            <>
                <br />
                <h1 className="users-list-title">Media Management</h1>
                <div className="media-list-container">
                    {media.map((item, index) => (
                        <div key={index} className="media-item">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>{item.mediaType}</p>
                            <p>{item.id}</p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">View Media</a>

                            <button onClick={() => deleteMedia(item)} className="delete-btn">
                                <FaTrash />

                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </>
        </>
    );
}

export default HandleMedia;