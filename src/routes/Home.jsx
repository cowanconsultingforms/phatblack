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
            <div className="image-wrapper">
                <div className="imageDiv">
                    <img className="backgroundImage" src="src/assets/SpeakerImage.png" alt="manHoldingSpeaker" />
                    <h1>Home</h1>
                    <h2 className="orangeHeader">Join The Newtwork With</h2>
                    <h3 className="whiteHeader">LIVE AND ON DEMAND URBAN MUSIC & ENTERTAINMENT 24/7/365</h3>
                    <button className="homeButton" onClick={getMoreHandler}>{buttonText}</button>
                </div>
            </div>
            <div className="video-cards">
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\video-720p-2.mp4"></video>
                    <a href="/tv" className="video-title">E-TV</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Popular and exclusive podcasts (audio/video) on a variety of genres and topics relevant to Urban America and beyond.
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\video-720p-1.mp4"></video>
                    <a href="/radio" className="video-title">E-RADIO</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Popular and exclusive podcasts (audio only) on a variety of genres and topics relevant to Urban America and beyond.
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\production_id_4232959-720p.mp4"></video>
                    <a href="/zine" className="video-title">E-ZINE</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Exclusive digital content covering a host of wide-ranging urban focused categories.
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\production_id_4916733-1080p.mp4"></video>
                    <a href="/gaming" className="video-title">E-GAMING</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Passion and innovation intersect to create extraordinary gaming experiences here. Our enthusiasm drives us to push the boundaries of gaming and deliver unparalleled entertainment to our community.                    
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\pexels-superevg-18786840-720p.mp4"></video>
                    <a href="/events" className="video-title">E-EVENTS</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Creative, signature events from concept to design, right through to production and management of the event itself.
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\video-720p-2-1.mp4"></video>
                    <a href="/mall" className="video-title">E-MALL</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Shop for our products 24/7/365.
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\video-720p-3.mp4"></video>
                    <a href="/defendersofhiphop" className="video-title">DEFENDERS OF HIP HOP</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Exclusive visual art (i.e. cartoons, animation etc.) based series defensive and/or representative of the classic tenets of Hip Hop: 1) Lyrics 2) Beats 3) Djing 4) Fashion 5) Art 6) Dance 7) Knowledge
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\video-720p-2-1.mp4"></video>
                    <a href="/pbdigital" className="video-title">PB-DIGITAL</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    A dedicated digital production apparatus which ensures flawless execution, timely delivery, and seamless technical management of all asset types which facilitates creative magic.
                    </p>
                </div>
                <div className="video-card">
                    <video className="video" autoPlay controls loop muted src="src\assets\production_id_4232959-720p.mp4"></video>
                    <a href="/pbfashion" className="video-title">PB-FASHION</a>
                    <img className="separator" src="src\assets\separator.png"></img>
                    <p className="video-paragraph">
                    Exclusive fashion from concept to design, right through to production itself.
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Home; 