import React from "react";
import { useState, useEffect } from "react";
import '../Styles/Home.css';
import speakerImage from "../assets/redpants-radio.jpg"; 
import separator from "../assets/separator.png"; 
import equalizer from "../assets/equalizer.png"; 
import VideoCard from "../components/Videocard";
import { videoCardsData } from "./Videocards";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Home() {
    //UseState used to manage the text within the "get more details" button
    const [buttonText, setButtonText] = useState(false);

    //Variable used to toggle whether button was pressed or not
    //button active state
    const [isActive, setIsActive] = useState(false);

    const auth = getAuth();

    //get user's role for rendering button:
    //premium content for premium users and above
    //subscribe now for non premium users 
    useEffect(() => {
        const getUserRole = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists() && ['admin', 'staff', 'super admin', 'premium_user', 'partner', 'client', 'vendor'].includes(userDoc.data().role)) {
                        setButtonText(true);
                    } else {
                        setButtonText(false);
                    }
                } else {
                    setButtonText(false);
                }
            });
        };

        getUserRole();

    }, [auth]);

    //Function to handle the "get more details" button when pressed, as well as toggles the buttonPressed boolean
    // function getMoreHandler(){
    //     setIsActive(!isActive);
    //     if(isActive == false){
    //         SetButtonText("Button works.");
    //     }
    //     else if(isActive==true){
    //         SetButtonText("Get more details");
    //     }
    // }

    //Creates a div section thats houses the image, button, and texts.
    return (
        <div className="HomeContainer">
                <div className="image-wrapper">
                    <div className="imageDiv">
                        <img className="backgroundImage" src={speakerImage} alt="manHoldingSpeaker" />
                        <h1 className="title">Home</h1>
                        <h2 className="orangeHeader">Join The Network With</h2>
                        <h3 className="whiteHeader">LIVE AND ON DEMAND URBAN MUSIC & ENTERTAINMENT 24/7/365</h3>
                        <h1 className ="testing">testing deployment</h1>
                        <button className="homeButton">
                        {buttonText ? <a style={{textDecoration: "none"}} href="/">
                            Premium Content
                            </a> : <a style={{textDecoration: "none"}} href="/subscribe">
                            Subscribe Now
                            </a>}
                        </button>
                    </div>
                </div>
            <div className="pb-body">
                <div className="about-us">
                    <h2 className="about-us-orange-header">No. 1 Entertainment Platform</h2>
                    <h1 className="about-us-title"> ABOUT</h1>
                    <img src={equalizer}></img>
                    <p className="about-us-text">
                        Welcome to PhatBlack-Premium – Your Cultural Soundstage. At PhatBlack-Premium we’re not just an entertainment platform, we’re a movement. Born from the vibrant streets of urban America, Phatblack-Premium has grown into a global symphony of culture celebrating the richness of the urban African diaspora. Accordingly, Phatblack-Premium is dedicated to bringing to the fore the unique sounds, sights, and illustrative narratives reflective of the urban landscape.
                    </p>
                </div>
                <div className="video-cards">
                    {/* Map over the videoCardsData array and render VideoCard components */}
                    {videoCardsData.map((card, index) => (
                        <VideoCard
                            key={index}
                            src={card.src}
                            title={card.title}
                            separatorSrc={separator}
                            paragraph={card.paragraph}
                            href={card.href}
                        />
                    ))}

                </div>
            </div>
        </div>
    )
};

export default Home; 