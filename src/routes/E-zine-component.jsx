import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, increment, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import "../Styles/EzineComponent.css";

function EzineComponent() {
    const { zineTitle } = useParams();
    const [zineDetails, setZineDetails] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchZineDetails = async () => {
            try {
                if (zineTitle) {
                    const db = getFirestore();
                    const docRef = doc(db, "e-zine", zineTitle);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setZineDetails(docSnap.data());
                        if (user) {
                            const userDocRef = doc(db, 'users', user.uid);
                            const userDocSnap = await getDoc(userDocRef);
                            if (userDocSnap.exists()) {
                                const userData = userDocSnap.data();
                                if (userData && userData.likes && userData.likes.includes(zineTitle)) {
                                    setUserLiked(true);
                                }
                                if (userData && userData.dislikes && userData.dislikes.includes(zineTitle)) {
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
                    console.log("zineTitle is undefined or empty.");
                }
            } catch (error) {
                console.error("Error fetching zine details:", error);
            }
        };

        fetchZineDetails();
    }, [zineTitle, user]);

    console.log(zineDetails);
    const handleLikeClick = async () => {
        try {
            if (!user) {
                alert("Please sign in to like videos.");
                return;
            }
            const db = getFirestore();
            const zineDocDef = doc(db, "e-zine", zineTitle);
            if (userLiked) {
                await updateDoc(zineDocDef, {
                    likes: increment(-1),
                    likesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(zineDocDef, {
                    likes: increment(1),
                    likesBy: arrayUnion(user.uid)
                });
            }
            setUserLiked(prevState => !prevState);
            setUserDisliked(false); // Reset dislike status when user likes 
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
            const zineDocDef = doc(db, "e-zine", zineTitle);
            if (userDisliked) {
                await updateDoc(zineDocDef, {
                    dislikes: increment(-1),
                    dislikesBy: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(zineDocDef, {
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
        <div className="zine-container">
            {zineDetails && (
                <div>
                    <div className="zine-details-container">
                        <div className="zine-head">
                            <h1>{zineDetails.title}</h1>
                            <h3>By: {zineDetails.vendor}</h3>
                        </div>

                        <div className="zine-media-container">
                            {zineDetails.url.endsWith('.pdf') ? (
                                <iframe src={zineDetails.url} title={zineDetails.title} width="100%" height="300px" />
                            ) : (
                                <img src={zineDetails.url} alt={zineDetails.title} />
                            )}
                        </div>


                        <div className="zine-info">
                            <div>
                                <p>{zineDetails.views} Views</p>
                                <p>{timeSince(new Date(zineDetails.time_uploaded.toDate()))}</p>
                            </div>

                            <div className="zine-like-dislike">
                                <AiOutlineLike onClick={handleLikeClick} color={userLiked ? "blue" : "gray"} />
                                <p>{zineDetails.likes}</p>
                                <AiOutlineDislike onClick={handleDislikeClick} color={userDisliked ? "red" : "gray"} />
                                <p>{zineDetails.dislikes}</p>
                            </div>
                        </div>

                        <div className="zine-description">
                            <p>{zineDetails.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EzineComponent;
