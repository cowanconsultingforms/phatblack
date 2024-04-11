import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, increment, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { getStorage, ref, deleteObject } from "firebase/storage";
import "../Styles/ComponentPages.css";

function ComponentPage({ collection }) {
    const { title } = useParams();
    const [data, setdata] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const videoRef = useRef(null);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchdata = async () => {
            try {
                if (title) {
                    const db = getFirestore();
                    const docRef = doc(db, collection, title);
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

    const handleLikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to like datas.");
                return;
            }
            const db = getFirestore();
            const dataDocRef = doc(db, collection, title);
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
            const dataDocRef = doc(db, collection, title);
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
            const db = getFirestore();
            const dataDocRef = doc(db, collection, title);
            await deleteDoc(dataDocRef);

            // Delete associated storage reference
            const storage = getStorage();
            await deleteObject(ref(storage, data.url));

            // Redirect or perform any other action after deletion
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
        <div className="data-container">
            {data && (
                <div>
                    <div className="data-component-head">
                        <h1>{data.title}</h1>
                        <h3>By: {data.vendor}</h3>
                    </div>
                    {/**If collection is tv, show a video instead of img*/}
                    {
                        (collection === "pb-tv") && (
                            <video className="video-player" controls loop>
                                <source src={data.url} type="video/mp4" />
                            </video>
                        )
                    }
                    {/**If collection is not tv or data is not available, show an image*/}
                    {
                        (collection !== "pb-tv") && (
                            <img src={data.url} />
                        )
                    }

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

                    <div className="delete-data">
                        {/**Show delete button if the user is admin or super admin */}
                        {user && (userRole === "admin" || userRole === "super admin") && <button onClick={handleDelete}>Delete</button>}
                    </div>

                </div>
            )}
        </div>
    );
}

export default ComponentPage;
