import React, { useState, useEffect } from "react";
import "../Styles/PB-gaming.css";
import speakerImage from "../assets/SpeakerImage.png"
import { FaBars } from "react-icons/fa";

function PBgaming() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Close the sidebar if it's open when scrolling starts
            if (sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sidebarOpen]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="GamingMainContainer">
            <div className={`GamingSidebar ${sidebarOpen ? 'open' : ''}`}>
                <h1>PB-GAMING</h1>
                <ul>
                    <li><button>HOME</button></li>
                    <li><button>TRENDING</button></li>
                    <li><button>ALL</button></li>
                    <li><button>TOP HITS</button></li>
                </ul>
            </div>
            <div className="GamingContainer">
                <h1>GAMES</h1>
                <FaBars className="sidebar-toggle" onClick={toggleSidebar}/>
                <hr/>
                <div className="ReviewGrid">
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 1" />
                        <button>Game 1</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 2" />
                        <button>Game 2</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 3" />
                        <button>Game 3</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 4" />
                        <button>Game 4</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 5" />
                        <button>Game 5</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 6" />
                        <button>Game 6</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 7" />
                        <button>Game 7</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 8" />
                        <button>Game 8</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 9" />
                        <button>Game 9</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 10" />
                        <button>Game 10</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 11" />
                        <button>Game 11</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 12" />
                        <button>Game 12</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 13" />
                        <button>Game 13</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 14" />
                        <button>Game 14</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={speakerImage} alt="Game 15" />
                        <button>Game 15</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PBgaming;
