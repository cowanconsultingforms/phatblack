import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig.js"; 
import { doc, updateDoc, increment } from "firebase/firestore";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "./Modaledit.jsx";
import { chooseFile, uploadToFirebase } from '../utils/UploadUtils.js';

const VideoCard = ({ id, src, title, vendor, timeuploaded, views, video }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const navigate = useNavigate();
    //declare in all components with edit modals:
    const [showModal, setShowModal] = useState(false);
    const [newFile, setNewFile] = useState();
    const inputRef = useRef(null);
    const subtitleRef = useRef(null);
    //end 

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
        navigate(`/pbtv/${title}`);
    };
    
    const updateViewCount = async (videoId) => {
        try {
            const videoRef = doc(db, "pb-tv", videoId);
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

    const toggleModal = (event) => {
        console.log('reached');
        setShowModal(!showModal);
        event.stopPropagation();
    }

    const handleEdit = async (event) => {
        if (!video) {
            console.error('No video object passed to handleEdit.');
            return;
        } else {
            console.log(video.title);
        }
    
        const newTitle = inputRef.current.value;
        const newSubtitle = subtitleRef.current.value;
        const updatedTitle = newTitle !== '' ? newTitle : video.title;
        const updatedSubtitle = newSubtitle !== '' ? newSubtitle : video.vendor;
        const zineDocRef = doc(db, 'pb-tv', video.title);
        const cardID = video.title;
        const bucket = 'pb-tv';
    
        if (newTitle || newSubtitle || newFile) {
            try {
                if (newFile) {
                    await uploadToFirebase(newFile, bucket, cardID);
                }
    
                await updateDoc(zineDocRef, {
                    title: updatedTitle,
                    vendor: updatedSubtitle,
                });
                window.location.reload();
                toggleModal();
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        } else {
            window.location.reload();
        }
    };

      const handleClose = () => {
        console.log('handle close reached');
        setShowModal(false);
    }

    return (
        <div
            className="pbtv-card"
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
            <FaPencilAlt onClick={toggleModal} className='edit-icon2'/>
            <Modal show={showModal} onClose={handleClose} onSubmit={handleEdit}>
                        <label for="newtitle">Title:</label> <br></br>
                        <input type="text" id="newtitle" name="newtitle" ref={inputRef}/>
                        <label for="newsubtitle">Vendor:</label>
                        <input type="text" id="newsubtitle" name="newsubtitle" ref={subtitleRef}/>
                        <div className="fileChooser">
                            <p>Choose Image (file must not exceed x bytes):</p>
                            <input type="file" accept=".mp4,.mov,.avi" onChange={(event) => chooseFile(event, setNewFile)}/>
                        </div>
                  </Modal>
            <p>{vendor}</p>
            <div className="vid-view-time">
                <p>{views} Views</p>
                <p>{timeSince(new Date(timeuploaded))}</p>
            </div>
        </div>
    );
};

export default VideoCard;