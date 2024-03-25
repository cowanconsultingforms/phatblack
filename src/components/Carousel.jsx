import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Carousel.css"

//Carousel for displaying and cycling 
function Carousel({ items }){
    const [currentIndex, setCurrentIndex] = useState(0);
    let initialX = null;

    //handle touch start -> start of swipe event for carousel
    function handleTouchStart(event){
        initialX = event.touches[0].clientX;
    };

    //handle touch move -> swiping through slides 
    function handleTouchMove(event){
        if(initialX === null){
            return;
        }

        const currentX = event.touches[0].clientX;
        const diffX = initialX - currentX;

        if(Math.abs(diffX) > 50){
            if(diffX > 0){
                next();
            } else{
                previous();
            }

            initialX = null;
        }
    }

    //next slide
    function next(){
    setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
    };

    //previous slide
    function previous(){
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

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
        </div>
        {/* dots to indicate position in images/slides array */}
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