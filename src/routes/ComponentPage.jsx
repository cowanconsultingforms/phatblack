import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocs, getDoc, updateDoc, increment, arrayUnion, arrayRemove, deleteDoc, collection } from "firebase/firestore";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { getStorage, ref, deleteObject } from "firebase/storage";
import PBzineCard from "../components/PBZineCard";
import "../Styles/ComponentPages.css";

function ComponentPage({ collectionName }) {
    let { title } = useParams();
    title = decodeURIComponent(title);
    console.log(title);
    const [data, setdata] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const videoRef = useRef(null);
    const [userRole, setUserRole] = useState('');
    const [otherData, setOtherData] = useState([]); // State to store other data in collection

    useEffect(() => {
        const fetchdata = async () => {
            try {
                if (title) {
                    const db = getFirestore();
                    const docRef = doc(db, collectionName, title);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setdata(docSnap.data());
                        if (user) {
                            const userDocRef = doc(db, 'users', user.uid);
                            const userDocSnap = await getDoc(userDocRef);
                            if (userDocSnap.exists()) {
                                const userData = userDocSnap.data();
                                if (userData && userData.likes && userData.likes.includes(title)) {
                                    setUserLiked(true);
                                }
                                if (userData && userData.dislikes && userData.dislikes.includes(title)) {
                                    setUserDisliked(true);
                                }
                                if (userData && userData.role) {
                                    setUserRole(userData.role); // Set userRole to user's role
                                }
                            } else {
                                console.log("User document does not exist.");
                            }
                        }
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("title is undefined or empty.");
                }
            } catch (error) {
                console.error("Error fetching data details:", error);
            }
        };

        fetchdata();
    }, [title, user]);

    useEffect(() => {
        const fetchOtherData = async () => {
            try {
                const db = getFirestore();
                const collectionRef = collection(db, collectionName); // Corrected
                const querySnapshot = await getDocs(collectionRef);
                const otherDataArr = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Filter out the current item from otherDataArr
                const filteredOtherData = otherDataArr.filter(item => item.id !== title);
                setOtherData(filteredOtherData);
            } catch (error) {
                console.error("Error fetching other data:", error);
            }
        };

        fetchOtherData();
    }, [title]);



    const handleLikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to like datas.");
                return;
            }
            const db = getFirestore();
            const dataDocRef = doc(db, collectionName, title);
            if (userLiked) {
                await updateDoc(dataDocRef, {
                    likes: increment(-1),
                    likesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(dataDocRef, {
                    likes: increment(1),
                    likesBy: arrayUnion(user.uid)
                });
            }
            setUserLiked(prevState => !prevState);
            setUserDisliked(false); // Reset dislike status when user likes the data
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    const handleDislikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to dislike datas.");
                return;
            }
            const db = getFirestore();
            const dataDocRef = doc(db, collectionName, title);
            if (userDisliked) {
                await updateDoc(dataDocRef, {
                    dislikes: increment(-1),
                    dislikesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(dataDocRef, {
                    dislikes: increment(1),
                    dislikesBy: arrayUnion(user.uid)
                });
            }
            setUserDisliked(prevState => !prevState);
            setUserLiked(false); // Reset like status when user dislikes the data
        } catch (error) {
            console.error("Error updating dislike count:", error);
        }
    };

    const handleDelete = async () => {
        try {
            // Ask for confirmation
            const confirmed = window.confirm("Are you sure you want to delete this data?");

            // If user confirms, proceed with deletion
            if (confirmed) {
                const db = getFirestore();
                const dataDocRef = doc(db, collectionName, title);
                await deleteDoc(dataDocRef);

                // Delete associated storage reference
                const storage = getStorage();
                await deleteObject(ref(storage, data.url));

                // Redirect or perform any other action after deletion
                let cleanedCollection = collectionName.replace(/-/g, ''); // Replace all dashes with an empty string
                window.location.href = `/${cleanedCollection}`;
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };


    function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return "Just now";
        const intervals = {
            year: 31536000,
            month: 2592000,
            day: 86400,
            hour: 3600,
            minute: 60
        };
        for (let unit in intervals) {
            const interval = Math.floor(seconds / intervals[unit]);
            if (interval >= 1) {
                return interval + " " + unit + (interval === 1 ? "" : "s") + " ago";
            }
        }
        return Math.floor(seconds) + " seconds ago";
    }

    useEffect(() => {
        if (videoRef.current) {
            // Set the start time of the video to 0.2 seconds
            videoRef.current.currentTime = 0.2;
        }
    }, [data]);


    return (
        <div className="component-page">
            <div className="data-container">
                {data && (
                    <div>
                        <div className="data-component-head">
                            <h1>{data.title}</h1>
                            <h3>By: {data.vendor}</h3>
                        </div>

                        <div className="component-media-container">
                            {/* Extracting the file extension */}
                            {data.url && (() => {
                                const url = data.url.toLowerCase();
                                // Check if the URL points to a PDF file
                                if (url.includes('.pdf')) {
                                    return <embed src={data.url} controls type="application/pdf" width="100%" height="600px" />;
                                }
                                // Check if the URL points to an image file
                                else if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png')) {
                                    return <img src={data.url} alt="Image" />;
                                }
                                // Check if the URL points to a video file
                                else if (url.includes('.mp4')) {
                                    return (
                                        <video className="video-player" controls loop>
                                            <source src={data.url} type="video/mp4" />
                                        </video>
                                    );
                                }
                                else {
                                    return <p>Unsupported file type</p>;
                                }
                            })()}
                        </div>



                        <div className="data-details-container">
                            <div className="data-info">
                                <p>{data.views} Views</p>
                                <div className="data-like-dislike">
                                    <AiOutlineLike onClick={handleLikeClick} color={userLiked ? "blue" : "gray"} />
                                    <p>{data.likes}</p>
                                    <AiOutlineDislike onClick={handleDislikeClick} color={userDisliked ? "red" : "gray"} />
                                    <p>{data.dislikes}</p>
                                </div>
                            </div>

                            <div className="data-description">
                                <p>{timeSince(new Date(data.time_uploaded.toDate()))}</p>
                                <p>{data.description}</p>
                            </div>
                        </div>

                        <div className="component-delete-data">
                            <p>Admin Control:</p>
                            {/**Show delete button if the user is admin or super admin */}
                            {user && (userRole === "admin" || userRole === "super admin") && <button onClick={handleDelete}>Delete</button>}
                        </div>
                    </div>
                )}
                <br></br>
                <div>
                    {otherData && (
                        <div>
                            <h2>Other Data:</h2>
                            {otherData.map(item => (
                                <PBzineCard
                                    col={collectionName}
                                    key={item.url}
                                    src={item.url}
                                    title={item.title}
                                    vendor={item.vendor}
                                    timeuploaded={item.time_uploaded.toDate()}
                                    views={item.views}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>


        </div>

    );
}

export default ComponentPage;
