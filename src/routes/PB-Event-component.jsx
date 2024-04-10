import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, increment, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import "../Styles/PBEventsComponent.css";

function PBEventComponent () {
    const { eventTitle } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                if (eventTitle) {
                    const db = getFirestore();
                    const docRef = doc(db, "pb-event", eventTitle);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setEventDetails(docSnap.data());
                        if (user) {
                            const userDocRef = doc(db, 'users', user.uid);
                            const userDocSnap = await getDoc(userDocRef);
                            if (userDocSnap.exists()) {
                                const userData = userDocSnap.data();
                                if (userData && userData.likes && userData.likes.includes(eventTitle)) {
                                    setUserLiked(true);
                                }
                                if (userData && userData.dislikes && userData.dislikes.includes(eventTitle)) {
                                    setUserDisliked(true);
                                }
                            } else {
                                console.log("User document does not exist.");
                            }
                        }
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("eventTitle is undefined or empty.");
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
    
        fetchEventDetails();
    }, [eventTitle, user]);

    const handleLikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to like events.");
                return;
            }
            const db = getFirestore();
            const eventDocRef = doc(db, "pb-event", eventTitle);
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
            const eventDocRef = doc(db, "pb-event", eventTitle);
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

    return (
        <div className="event-container">
            {eventDetails && (
                <div>
                    <div className="event-component-head">
                            <h1>{eventDetails.title}</h1>
                            <h3>By: {eventDetails.vendor}</h3>
                        </div>
                    <img src={eventDetails.url} />

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
                </div>
            )}
        </div>
    );
}

export default PBEventComponent; 