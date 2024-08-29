import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Carousel.css";
import { db, storage } from "../firebaseConfig.js";
import { doc, updateDoc } from "firebase/firestore";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "./Modaledit.jsx";
import { chooseFile, uploadToFirebase } from '../utils/UploadUtils.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUserRole} from '../utils/useUserRole.js';

function Carousel({ items, carouselData }) {
    //declare in all components with edit modals:
    const userRole = useUserRole();
    const [showModal, setShowModal] = useState(false);
    const [newFile, setNewFile] = useState();
    //end 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const inputRef = useRef(null);
    const subtitleRef = useRef(null);
    let initialX = null;
    const auth = getAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [userRole, setUserRole] = useState('');
    
    useEffect(() => {
        const id = setInterval(() => {
            next();
        }, 5000); // Change slide every 5 seconds

        setIntervalId(id);

        return () => clearInterval(id); // Cleanup function to clear the interval when component unmounts
    }, [currentIndex]);

    function handleTouchStart(event) {
        initialX = event.touches[0].clientX;
    };

    function handleTouchMove(event) {
        if (initialX === null) {
            return;
        }

        const currentX = event.touches[0].clientX;
        const diffX = initialX - currentX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                next();
            } else {
                previous();
            }

            initialX = null;
        }
    }

    function next() {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
        console.log(currentIndex);
    };

    function previous() {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

    const toggleModal = (event) => {
        setShowModal(!showModal);
        event.stopPropagation();
        clearInterval(intervalId); 
    }

    const handleEdit = async (event) => {
        const card = carouselData[currentIndex];
        const newTitle = inputRef.current.value;
        const newSubtitle = subtitleRef.current.value;
        const updatedTitle = newTitle !== '' ? newTitle : card.title;
        const updatedSubtitle = newSubtitle !== '' ? newSubtitle: card.subtitle;
        const zineDocRef = doc(db, 'zine-carousel', card.id);
        const bucket = 'zine-carousel';
        const cardID = card.id;

        if (newTitle || newSubtitle || newFile) {
            try {
                if (newFile){
                    await(uploadToFirebase(newFile, bucket, cardID));
                }

                await updateDoc(zineDocRef, {
                    title: updatedTitle,
                    subtitle: updatedSubtitle
                });
                const id = setInterval(() => {
                    next();
                }, 5000); 
                setIntervalId(id); 
                window.location.reload();
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        } else {
            const id = setInterval(() => {
                next();
            }, 5000); 
            setIntervalId(id);
            window.location.reload();
        }
    };

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div className="carousel" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
            <button className="previous" onClick={previous}> {`<`} </button>
            <div className="slide">
                <img src={items[currentIndex].url} alt={items[currentIndex].alt} />
                    <Link to={items[currentIndex].link}>   
                            <div className='link'>
                                <h2 className='link-header'>{items[currentIndex].title}</h2>
                                <p className='link-text'>{items[currentIndex].text}</p>
                            </div>
                    </Link>
                    {['admin', 'staff', 'super admin'].includes(userRole) ? (

                    <FaPencilAlt onClick={toggleModal} className='edit-icon'/>
                    ) : null}
                    
                
                    <Modal show={showModal} onClose={handleClose} onSubmit={handleEdit}>
                        <label for="newtitle">Title:</label> <br></br>
                        <input type="text" id="newtitle" name="newtitle" ref={inputRef}/>
                        <label for="newsubtitle">Subtitle:</label>
                        <input type="text" id="newsubtitle" name="newsubtitle" ref={subtitleRef}/>
                    
                        <div className="fileChooser">
                            <p>Choose Image (file must not exceed x bytes):</p>
                            <input type="file" accept=".jpg,.jpeg,.png" onChange={(event) => chooseFile(event, setNewFile)}/>
                        </div>
                  </Modal>
            </div>
            <button className="next" onClick={next}> {`>`} </button>
            <div className="dots">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={index === currentIndex ? "dot-active" : "dot-inactive"}
                        onClick={() => setCurrentIndex(index)}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;