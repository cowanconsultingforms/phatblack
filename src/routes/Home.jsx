import React from "react";
import { useState } from "react";
import '../Styles/Home.css';



function Home() {

    //UseState used to manage the text within the "get more details" button
    const [buttonText, SetButtonText] = useState("GET MORE DETAILS")

    //Variable used to toggle whether button was pressed or not
    let buttonPressed = true;

    //Function to handle the "get more details" button when pressed, as well as toggles the buttonPressed boolean
    function getMoreHandler(){
        buttonPressed = !buttonPressed;
        if(buttonPressed == false){
            SetButtonText("Button works.");
        }
        else if(buttonPressed==true){
            SetButtonText("GET MORE DETAILS");
        }
        
       
    }
    
    //Creates a div section thats houses the image, button, and texts.
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