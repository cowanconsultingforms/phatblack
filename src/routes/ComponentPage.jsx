import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, increment, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { getStorage, ref, deleteObject } from "firebase/storage";
import "../Styles/ComponentPages.css";

function ComponentPage({ collection }) {
    const { title } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const videoRef = useRef(null);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                if (title) {
                    const db = getFirestore();
                    const docRef = doc(db, collection, title);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setEventDetails(docSnap.data());
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
                console.error("Error fetching event details:", error);
            }
        };

        fetchEventDetails();
    }, [title, user]);

    const handleLikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to like events.");
                return;
            }
            const db = getFirestore();
            const eventDocRef = doc(db, collection, title);
            if (userLiked) {
                await updateDoc(eventDocRef, {
                    likes: increment(-1),
                    likesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(eventDocRef, {
                    likes: increment(1),
                    likesBy: arrayUnion(user.uid)
                });
            }
            setUserLiked(prevState => !prevState);
            setUserDisliked(false); // Reset dislike status when user likes the event
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    const handleDislikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to dislike events.");
                return;
            }
            const db = getFirestore();
            const eventDocRef = doc(db, collection, title);
            if (userDisliked) {
                await updateDoc(eventDocRef, {
                    dislikes: increment(-1),
                    dislikesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(eventDocRef, {
                    dislikes: increment(1),
                    dislikesBy: arrayUnion(user.uid)
                });
            }
            setUserDisliked(prevState => !prevState);
            setUserLiked(false); // Reset like status when user dislikes the event
        } catch (error) {
            console.error("Error updating dislike count:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const db = getFirestore();
            const eventDocRef = doc(db, collection, title);
            await deleteDoc(eventDocRef);

            // Delete associated storage reference
            const storage = getStorage();
            await deleteObject(ref(storage, eventDetails.url));

            // Redirect or perform any other action after deletion
        } catch (error) {
            console.error("Error deleting event:", error);
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
    }, [eventDetails]);


    return (
        <div className="event-container">
            {eventDetails && (
                <div>
                    <div className="event-component-head">
                        <h1>{eventDetails.title}</h1>
                        <h3>By: {eventDetails.vendor}</h3>
                    </div>
                    {/**If collection is tv, show a video instead of img*/}
                    {
                        (collection === "pb-tv") && (
                            <video className="video-player" controls loop>
                                <source src={eventDetails.url} type="video/mp4" />
                            </video>
                        )
                    }
                    {/**If collection is not tv or eventDetails is not available, show an image*/}
                    {
                        (collection !== "pb-tv") && (
                            <img src={eventDetails.url} />
                        )
                    }

                    <div className="event-details-container">
                        <div className="event-info">
                            <p>{eventDetails.views} Views</p>
                            <div className="event-like-dislike">
                                <AiOutlineLike onClick={handleLikeClick} color={userLiked ? "blue" : "gray"} />
                                <p>{eventDetails.likes}</p>
                                <AiOutlineDislike onClick={handleDislikeClick} color={userDisliked ? "red" : "gray"} />
                                <p>{eventDetails.dislikes}</p>
                            </div>
                        </div>

                        <div className="event-description">
                            <p>{timeSince(new Date(eventDetails.time_uploaded.toDate()))}</p>
                            <p>{eventDetails.description}</p>
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
