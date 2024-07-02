import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Carousel.css";
import { db } from "../firebaseConfig.js";
import { doc, updateDoc } from "firebase/firestore";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "./Modaledit.jsx";

function Carousel({ items, carouselData }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);
    const subtitleRef = useRef(null);
    let initialX = null;

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
        console.log('reached');
        setShowModal(!showModal);
        event.stopPropagation();
        clearInterval(intervalId); // Pause the carousel
    }

    const handleEdit = async (event) => {
        
        const card = carouselData[currentIndex];

        if (!card) {
            console.error('Card not found');
            return;
        }

        console.log("zine object: ", card);

        const newTitle = inputRef.current.value;
        const newSubtitle = subtitleRef.current.value;
        const updatedTitle = newTitle !== '' ? newTitle : card.title;
        const updatedSubtitle = newSubtitle !== '' ? newSubtitle: card.subtitle;

        if (newTitle || newSubtitle) { // Check if user inputted something
            if (!card.id) {
                console.error('zine or zine.id is undefined');
                return;
            }
            const zineDocRef = doc(db, 'zine-carousel', card.id);
            console.log('reached');

            try {
                await updateDoc(zineDocRef, {
                    title: updatedTitle,
                    subtitle: updatedSubtitle
                });
                console.log('Document successfully updated!');
                const id = setInterval(() => {
                    next();
                }, 5000); 
                setIntervalId(id); 
                window.location.reload();
                toggleModal();
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        } else {
            const id = setInterval(() => {
                next();
            }, 5000); // Change slide every 5 seconds
            setIntervalId(id);
            toggleModal();
        }
    };

    const handleClose = () => {
        console.log('handle close reached');
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
                    <FaPencilAlt onClick={toggleModal} className='edit-icon'/>
                    <Modal show={showModal} onClose={handleClose} onSubmit={handleEdit}>
                        <label for="newtitle">Title:</label> <br></br>
                        <input type="text" id="newtitle" name="newtitle" ref={inputRef}/>
                        <label for="newsubtitle">Subtitle:</label>
                        <input type="text" id="newsubtitle" name="newsubtitle" ref={subtitleRef}/>
                        
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