import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Carousel.css"

//Carousel for displaying and cycling 
function Carousel({ items }){
    const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="carousel">
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