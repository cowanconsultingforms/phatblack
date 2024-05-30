import React from "react";
import "../Styles/About.css";
import equalizer from "../assets/equalizer.png"; 

function About() {
    return (
        <div className="page-container">
            <div className="page-content">
                <h2 className="head1">No. 1 Entertainment Platform</h2>
                <h1 className="head2">About </h1>
                <img className="about-image-separator" src={equalizer}></img> 
                <div className="paragraph-container">
                    <p>
                    Welcome to PhatBlack-Premium – Your Cultural Soundstage. At PhatBlack-Premium we’re not just an entertainment platform, we’re a movement. Born from the vibrant streets of urban America, Phatblack-Premium has grown into a global symphony of culture celebrating the richness of the urban African diaspora. Accordingly, Phatblack-Premium is dedicated to bringing to the fore the unique sounds, sights, and illustrative narratives reflective of the urban landscape.
                    </p>
                </div>
            </div>
        </div >
    );
}

export default About;
