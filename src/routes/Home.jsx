import React, { useState, useEffect, useRef } from "react";
import '../Styles/Home.css';
import speakerImage from "../assets/redpants-radio.jpg"; 
import separator from "../assets/separator.png"; 
import equalizer from "../assets/equalizer.png"; 
import VideoCard from "../components/Videocard";
import { videoCardsData } from "./Videocards";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Home() {
    const auth = getAuth();
    const [buttonText, setButtonText] = useState('Premium Content'); // Initialize as 'Premium Content'
    const [intervalId, setIntervalId] = useState(null);
    const [isIntervalActive, setIsIntervalActive] = useState(false);
    const intervalIdRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/subscribe');
    };
    
    const handleMouseEnter = () => {
        setButtonText('Subscribe Now');
    };
    
    const handleMouseLeave = () => {
        setButtonText('Premium Content');
    };

    useEffect(() => {
        const getUserRole = async () => {
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const userRef = doc(db, "users", user.uid);
              const userDoc = await getDoc(userRef);
              if (userDoc.exists() && ['admin', 'staff', 'super admin', 'premium_user', 'partner', 'client', 'vendor'].includes(userDoc.data().role)) {
                setButtonText('Premium Content');
                setIsIntervalActive(false);
              } else {
                setIsIntervalActive(true);
              }
            } else {
              setIsIntervalActive(true);
            }
          });
        };
    
        getUserRole();
    
        return () => {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
        };
      }, [auth, db]);
    
      useEffect(() => {
        if (isIntervalActive) {
          const id = setInterval(() => {
            setButtonText((prevText) => (prevText === 'Premium Content' ? 'Subscribe Now' : 'Premium Content'));
          }, 2000);
          intervalIdRef.current = id;
        } else {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        }
    
        return () => {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
        };
      }, [isIntervalActive]);

    return (
        <div className="HomeContainer">
            <div className="image-wrapper">
                <div className="imageDiv">
                    <img className="backgroundImage" src={speakerImage} alt="manHoldingSpeaker" />
                    <h1 className="title">Home</h1>
                    <h2 className="orangeHeader">Join The Network With</h2>
                    <h3 className="whiteHeader">LIVE AND ON DEMAND URBAN MUSIC & ENTERTAINMENT 24/7/365</h3>
                    <button 
                        className="homeButton" 
                        onClick={handleClick}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
            <div className="pb-body">
                <div className="about-us">
                    <h2 className="about-us-orange-header">No. 1 Entertainment Platform</h2>
                    <h1 className="about-us-title"> ABOUT</h1>
                    <img src={equalizer} alt="equalizer"></img>
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
    );
};

export default Home;