import React from "react";
import { useState } from "react";
import '../Styles/Home.css';
import speakerImage from "../assets/SpeakerImage.png"; 
import separator from "../assets/separator.png"; 
import etv_vid from "../assets/etv_vid.mp4"
import eradio_vid from "../assets/eradio_vid.mp4"; 
import defenders_of_hip_hop_vid from "../assets/defenders_of_hip_hop_vid.mp4";
import egaming_vid from "../assets/egaming_vid.mp4"; 
import emall_vid from "../assets/emall_vid.mp4";
import events_vid from "../assets/events_vid.mp4"; 
import pbdigital_vid from "../assets/pbdigital_vid.mp4"; 
import ezine_vid from "../assets/ezine_vid.mp4"; 
import pbfashion_vid from "../assets/pbfashion_vid.mp4"; 

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
                    <img className="backgroundImage" src={speakerImage} alt="manHoldingSpeaker" />
                    <h1 className="title">Home</h1>
                    <h2 className="orangeHeader">Join The Network With</h2>
                    <h3 className="whiteHeader">LIVE AND ON DEMAND URBAN MUSIC & ENTERTAINMENT 24/7/365</h3>
                    <button className="homeButton" onClick={getMoreHandler}>{buttonText}</button>
                </div>
            </div>
            <div className="pb-body">
                <div className="about-us">
                    <h2 className="about-us-orange-header">No. 1 Entertainment Platform</h2>
                    <h1 className="about-us-title"> ABOUT US</h1>
                    <img src="src\assets\equalizer.png"></img>
                    <p className="about-us-text">
                        Welcome to PhatBlack.com – Your Cultural Soundstage. At PhatBlack.com we’re not just an entertainment platform, we’re a movement. Born from the vibrant streets of urban America, PhatBlack has grown into a global symphony of culture celebrating the richness of the urban African diaspora. Accordingly, Phatblack is dedicated to bringing to the fore the unique sounds, sights, and illustrative narratives reflective of the urban landscape
                    </p>
                </div>
                <div className="video-cards">
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={etv_vid}></video>
                        <a href="/tv" className="video-title">E-TV</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Popular and exclusive podcasts (audio/video) on a variety of genres and topics relevant to Urban America and beyond.
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={eradio_vid}></video>
                        <a href="/radio" className="video-title">E-RADIO</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Popular and exclusive podcasts (audio only) on a variety of genres and topics relevant to Urban America and beyond.
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={ezine_vid}></video>
                        <a href="/zine" className="video-title">E-ZINE</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Exclusive digital content covering a host of wide-ranging urban focused categories.
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={egaming_vid}></video>
                        <a href="/gaming" className="video-title">E-GAMING</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Passion and innovation intersect to create extraordinary gaming experiences here. Our enthusiasm drives us to push the boundaries of gaming and deliver unparalleled entertainment to our community.                    
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={events_vid}></video>
                        <a href="/events" className="video-title">E-EVENTS</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Creative, signature events from concept to design, right through to production and management of the event itself.
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={emall_vid}></video>
                        <a href="/mall" className="video-title">E-MALL</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Shop for our products 24/7/365.
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={defenders_of_hip_hop_vid}></video>
                        <a href="/defendersofhiphop" className="video-title">DEFENDERS OF HIP HOP</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Exclusive visual art (i.e. cartoons, animation etc.) based series defensive and/or representative of the classic tenets of Hip Hop: 1) Lyrics 2) Beats 3) Djing 4) Fashion 5) Art 6) Dance 7) Knowledge
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={pbdigital_vid}></video>
                        <a href="/pbdigital" className="video-title">PB-DIGITAL</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        A dedicated digital production apparatus which ensures flawless execution, timely delivery, and seamless technical management of all asset types which facilitates creative magic.
                        </p>
                    </div>
                    <div className="video-card">
                        <video className="video" autoPlay controls loop muted src={pbfashion_vid}></video>
                        <a href="/pbfashion" className="video-title">PB-FASHION</a>
                        <img className="separator" src={separator}></img>
                        <p className="video-paragraph">
                        Exclusive fashion from concept to design, right through to production itself.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home; 