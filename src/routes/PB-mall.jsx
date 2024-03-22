import React from "react";
import Carousel from '../components/Carousel';
import '../Styles/PbMall.css';




function PBmall() {
    return (
        <div className="header-container">
            <h1 className="Header">E-Mall</h1>
            <div className="subtopics-container">
                <h2 className="Subtopics">Featured</h2>
                <h2 className="Subtopics">Clothes</h2>
                <h2 className="Subtopics">Accessories</h2>
                <h2 className="Subtopics">Home</h2>
                <h2 className="Subtopics">Electronics</h2>
                <h2 className="Subtopics">Personal Care</h2>
                <h2 className="Subtopics">Miscellaneous</h2>
            </div>
        </div>
    );
};

export default PBmall; 