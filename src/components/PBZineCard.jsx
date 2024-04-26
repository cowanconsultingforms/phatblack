import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig.js"; 
import { doc, updateDoc, increment } from "firebase/firestore";

const PBzineCard = ({ col, id, src, title, vendor, timeuploaded, views }) => {
    const navigate = useNavigate();
    const colNav = col.replace('-', '');
    const handleOnClick = () => {
        updateViewCount(title);
        navigate(`/${colNav}/${title}`);
        window.location.reload();
    };
    
    const updateViewCount = async (videoId) => {
        try {
            const videoRef = doc(db, col, videoId);
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
            {/* Extracting the file extension */}
            {src && (() => {
                                const url = src.toLowerCase();

                                // Check if the URL points to a PDF file
                                if (url.includes('.pdf')) {
                                    return <embed src={src} controls type="application/pdf" width="100%" height="600px" />;
                                }
                                // Check if the URL points to an image file
                                else if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png')) {
                                    return <img src={src} alt="Image" />;
                                }
                                // Check if the URL points to a video file
                                else if (url.includes('.mp4')) {
                                    return (
                                        <video className="video-player" controls={false} loop>
                                            <source src={src} type="video/mp4" />
                                        </video>
                                    );
                                }
                                // If the file type is not recognized, return a message or handle it as needed
                                else {
                                    return <p>Unsupported file type</p>;
                                }
                            })()}
                <div >
                    <h2>{title}</h2>
                    <p>{vendor}</p>
                    <div className="vid-view-time">
                        <p>{views} Views...</p>
                        <p>{timeSince(new Date(timeuploaded))}</p>
                    </div>
                </div>
        </div>
    );
};

export default PBzineCard;
