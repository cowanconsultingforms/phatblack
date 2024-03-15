import React from "react";
import { useState } from "react";
import '../Styles/Home.css';



function Home() {

    const [buttonText, SetButtonText] = useState("GET MORE DETAILS")
    let buttonPressed = true;

    function getMoreHandler(){
        buttonPressed = !buttonPressed;
        if(buttonPressed == false){
            SetButtonText("Button works.");
        }
        else if(buttonPressed==true){
            SetButtonText("GET MORE DETAILS");
        }
        
       
    }
    
    return (
        <div>
            <div className="imageDiv">
                <img className="backgroundImage" src="src/assets/SpeakerImage.png" alt="manHoldingSpeaker" />
                <h1>Home</h1>
                <h2 className="orangeHeader">Join The Newtwork With</h2>
                <h3 className="whiteHeader">LIVE AND ON DEMAND URBAN MUSIC & ENTERTAINMENT 24/7/365</h3>
                <button className="homeButton" onClick={getMoreHandler}>{buttonText}</button>
            </div>
            
        </div>
    )
};

export default Home; 