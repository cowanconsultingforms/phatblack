import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Carousel.css";
import { db, storage } from "../firebaseConfig.js";
import { doc, updateDoc } from "firebase/firestore";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "./Modaledit.jsx";
import { deleteObject, ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Compressor from 'compressorjs';

function Carousel({ items, carouselData }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);
    const subtitleRef = useRef(null);
    const [newFile, setNewFile] = useState();
    let initialX = null;

    useEffect(() => {
        const id = setInterval(() => {
            next();
        }, 5000); // Change slide every 5 seconds

        setIntervalId(id);

        return () => clearInterval(id); // Cleanup function to clear the interval when component unmounts
    }, [currentIndex]);

    const imageCompress = (file) => {
        return new Promise((resolve, reject) => {
            let quality;
            const fileSizeInMB = file.size / 1024 / 1024;

            if (fileSizeInMB > 5) {
                quality = 0.3;
            } else if (fileSizeInMB > 1) {
                quality = 0.5;
            } else {
                quality = 0.8;
            }

            new Compressor(file, {
                quality: quality,
                maxWidth: 1920,
                maxHeight: 1080,
                success: (compressedResult) => {
                    resolve(compressedResult);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    };

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
        console.log("files", newFile);
        const card = carouselData[currentIndex];
        
        //let file = await imageCompress(newFile);

        const storage = getStorage();
        console.log(newFile.name);
        let location = `/pb-zine/${newFile.name}`;
        const storageRef = ref(storage, location);
        const uploadTask = uploadBytesResumable(storageRef, newFile);
        const snapshot = await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                null,
                error => reject(error),
                () => resolve(uploadTask.snapshot)
            );
        });

        console.log('reached 2')
        const newUrl = await getDownloadURL(snapshot.ref);
        console.log(newUrl);
        const zineDocRef = doc(db, 'zine-carousel', card.id);
        try {
            await updateDoc(zineDocRef, {
                url: newUrl
            }); 
            window.location.reload();
        } catch {
                console.log('failure');
        }


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

    const chooseFile = (event) => {
        setNewFile(event.target.files[0]);
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
                        <div className="fileChooser">
                            <p>Choose Image:</p>
                            <input type="file" accept=".jpg,.jpeg,.png" onChange={chooseFile}/>
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