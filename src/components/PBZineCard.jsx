import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig.js"; 
import { doc, updateDoc, increment } from "firebase/firestore";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "./Modaledit.jsx";
import { chooseFile, uploadToFirebase } from '../utils/UploadUtils.js';

const PBzineCard = ({ col, id, src, title, vendor, timeuploaded, views, zine }) => {
    //declare in all components with edit modals:
    const [showModal, setShowModal] = useState(false);
    const [newFile, setNewFile] = useState();
    //end 
    const inputRef = useRef(null);
    const subtitleRef = useRef(null);
    const navigate = useNavigate();
    const colNav = col.replace('-', '');

    const handleOnClick = () => {
        updateViewCount(title);
        navigate(`/${colNav}/${title}`);
        window.location.reload();
    };

    const handleEdit = async (event) => {
        const newTitle = inputRef.current.value;
        const newSubtitle = subtitleRef.current.value;
        const updatedTitle = newTitle !== '' ? newTitle : zine.title;
        const updatedSubtitle = newSubtitle !== '' ? newSubtitle: zine.vendor;
        const zineDocRef = doc(db, 'pb-zine', zine.id);
        const cardID = zine.id;
        const bucket = 'pb-zine';

        if (newTitle || newSubtitle || newFile) {
            try {
                if (newFile){
                    await(uploadToFirebase(newFile, bucket, cardID));
                }

                await updateDoc(zineDocRef, {
                    title: updatedTitle,
                    subtitle: updatedSubtitle
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

    const toggleModal = (event) => {
        console.log('reached');
        setShowModal(!showModal);
        event.stopPropagation();
    }

    const handleClose = () => {
        console.log('handle close reached');
        setShowModal(false);
    }

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
                    <div className="titleSection">
                        <h2>{title}</h2>
                        <FaPencilAlt onClick={toggleModal} className='edit-icon2'/>
                        <Modal show={showModal} onClose={handleClose} onSubmit={handleEdit}>
                            <label for="newtitle">Title:</label> <br></br>
                            <input type="text" id="newtitle" name="newtitle" ref={inputRef}/>
                            <label for="newsubtitle">Author:</label>
                            <input type="text" id="newsubtitle" name="newsubtitle" ref={subtitleRef}/>
                            <div className="fileChooser">
                                <p>Choose Image:</p>
                                <input type="file" accept=".png, .pdf" onChange={chooseFile}/>
                            </div>
                        </Modal>
                    </div>
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
