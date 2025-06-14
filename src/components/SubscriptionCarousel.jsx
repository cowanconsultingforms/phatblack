import React, { useState, useEffect, useRef } from "react";
import SubscriptionCard from "./SubscriptionCard";
import "./SubscriptionCarousel.css";

function SubscriptionCarousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const initialXRef = useRef(null);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000);
        return () => clearInterval(autoSlide);
    }, [items.length]);

    const handleTouchStart = (e) => {
        initialXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (initialXRef.current === null) return;
        const currentX = e.touches[0].clientX;
        const diff = initialXRef.current - currentX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            initialXRef.current = null;
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div
            className="subscription-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <button className="carousel-button prev" onClick={prevSlide}>{"<"}</button>

            <div className="carousel-slide">
                <SubscriptionCard
                    key={currentIndex}
                    path={items[currentIndex].path}
                    title={items[currentIndex].title}
                    planBenefits={items[currentIndex].planBenefits}
                    planAccess={items[currentIndex].planAccess}
                    backgroundColor={items[currentIndex].backgroundColor}
                    restrictions={items[currentIndex].restrictions}
                />
            </div>

            <button className="carousel-button next" onClick={nextSlide}>{">"}</button>

            <div className="carousel-dots">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={index === currentIndex ? "dot active" : "dot"}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SubscriptionCarousel;
