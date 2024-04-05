import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig.js"; 
import { doc, updateDoc, increment } from "firebase/firestore";

const EzineCard = ({ id, src, title, vendor, timeuploaded, views }) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        updateViewCount(title);
        navigate(`/zine/${title}`);
    };
    
    const updateViewCount = async (videoId) => {
        try {
            const videoRef = doc(db, "e-zine", videoId);
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

    const getFileExtension = (filename) => {
        return filename.split('.').pop().toLowerCase();
    }

    const fileExtension = getFileExtension(src);

    return (
        <div
            className="ezine-card"
            onClick={handleOnClick}
        >   
            {fileExtension === 'pdf' ? (
                <iframe src={src} title={title} width="100%" height="300px" />
            ) : (
                <img src={src} alt={title} />
            )}
                <div >
                    <h2>{title}</h2>
                    <p>{vendor}</p>
                    <div className="vid-view-time">
                        <p>{views} Views</p>
                        <p>{timeSince(new Date(timeuploaded))}</p>
                    </div>
                </div>
        </div>
    );
};

export default EzineCard;
