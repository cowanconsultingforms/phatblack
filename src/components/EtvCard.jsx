import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig.js"; 
import { doc, updateDoc, increment } from "firebase/firestore";

const EtvCard = ({ id, src, title, vendor, timeuploaded, views }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (videoRef.current) {
            // Set the start time of the video to 0.5 seconds in
            videoRef.current.currentTime = 0.2;
        }
    }, []);

    const handleHover = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        videoRef.current.muted = !isMuted;
    };

    const handleOnClick = () => {
        // Increment view count in the database
        updateViewCount(title);
        // Navigate to the video page
        navigate(`/etv/${title}`);
    };
    
    const updateViewCount = async (videoId) => {
        try {
            const videoRef = doc(db, "e-tv", videoId);
            await updateDoc(videoRef, {
                views: increment(1)
            });
        } catch (error) {
            console.error("Error updating view count:", error);
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
        <div
            className="etv-card"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
        >   
            <video
                ref={videoRef}
                controls={false}
                muted
                loop
                onClick={toggleMute}
            >
                <source src={src} type="video/mp4" />
            </video>
            <div className="mute-button" onClick={toggleMute}>
                {isMuted ? (
                    <i className="fas fa-volume-mute"></i>
                ) : (
                    <i className="fas fa-volume-up"></i>
                )}
            </div>
            <h2>{title}</h2>
            <p>{vendor}</p>
            <div className="vid-view-time">
                <p>{views} Views</p>
                <p>{timeSince(new Date(timeuploaded))}</p>
            </div>
        </div>
    );
};

export default EtvCard;
