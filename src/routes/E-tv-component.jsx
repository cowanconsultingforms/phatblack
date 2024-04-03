import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, increment, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import "../Styles/EtvComponent.css";

function EtvComponent() {
    const { vidTitle } = useParams();
    const [videoDetails, setVideoDetails] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                if (vidTitle) {
                    const db = getFirestore();
                    const docRef = doc(db, "e-tv", vidTitle);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setVideoDetails(docSnap.data());
                        if (user) {
                            const userDocRef = doc(db, 'users', user.uid);
                            const userDocSnap = await getDoc(userDocRef);
                            if (userDocSnap.exists()) {
                                const userData = userDocSnap.data();
                                if (userData && userData.likes && userData.likes.includes(vidTitle)) {
                                    setUserLiked(true);
                                }
                                if (userData && userData.dislikes && userData.dislikes.includes(vidTitle)) {
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
                    console.log("vidTitle is undefined or empty.");
                }
            } catch (error) {
                console.error("Error fetching video details:", error);
            }
        };
    
        fetchVideoDetails();
    }, [vidTitle, user]);

    useEffect(() => {
        if (videoRef.current) {
            // Set the start time of the video to 0.2 seconds
            videoRef.current.currentTime = 0.2;
        }
    }, [videoDetails]);

    const handleLikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to like videos.");
                return;
            }
            const db = getFirestore();
            const videoDocRef = doc(db, "e-tv", vidTitle);
            if (userLiked) {
                await updateDoc(videoDocRef, {
                    likes: increment(-1),
                    likesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(videoDocRef, {
                    likes: increment(1),
                    likesBy: arrayUnion(user.uid)
                });
            }
            setUserLiked(prevState => !prevState);
            setUserDisliked(false); // Reset dislike status when user likes the video
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    const handleDislikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to dislike videos.");
                return;
            }
            const db = getFirestore();
            const videoDocRef = doc(db, "e-tv", vidTitle);
            if (userDisliked) {
                await updateDoc(videoDocRef, {
                    dislikes: increment(-1),
                    dislikesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(videoDocRef, {
                    dislikes: increment(1),
                    dislikesBy: arrayUnion(user.uid)
                });
            }
            setUserDisliked(prevState => !prevState);
            setUserLiked(false); // Reset like status when user dislikes the video
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
        <div className="video-container">
            {videoDetails && (
                <div>
                    <video ref={videoRef} className="video-player" controls loop>
                        <source src={videoDetails.url} type="video/mp4" />
                    </video>

                    <div className="video-details-container">
                        <h2>{videoDetails.title}</h2>
                        <div className="video-info">
                            <p>{videoDetails.vendor}</p>
                            <div className="vid-like-dislike">
                                <AiOutlineLike onClick={handleLikeClick} color={userLiked ? "blue" : "gray"} />
                                <p>{videoDetails.likes}</p>
                                <AiOutlineDislike onClick={handleDislikeClick} color={userDisliked ? "red" : "gray"} />
                                <p>{videoDetails.dislikes}</p>
                            </div>
                        </div>

                        <div className="video-description">
                            <p>{videoDetails.views} Views</p>
                            <p>{timeSince(new Date(videoDetails.time_uploaded.toDate()))}</p>
                            <p>{videoDetails.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EtvComponent;
