import React from "react";
import '../Styles/Home.css';


function Home() {
    return (
        <div>
            <div className="imageDiv">
                <img className="backgroundImage" src="src/assets/SpeakerImage.png" alt="manHoldingSpeaker" />
                <h1>Home</h1>
                <h2 className="orangeHeader">Join The Newtwork With</h2>
                <h3 className="whiteHeader">LIVE AND ON DEMAND URBAN MUSIC & ENTERTAINMENT 24/7/365</h3>
                <button className="homeButton">GET MORE DETAILS</button>
            </div>
            
        </div>
    )
};

export default Home; 