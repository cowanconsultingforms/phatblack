import React, { useState, useEffect } from "react";
import "../Styles/PB-gaming.css";
import { FaBars } from "react-icons/fa";
import speakerImage from "../assets/redpants-radio.jpg"
import { SiApplearcade } from "react-icons/si";
import { IoHomeSharp } from 'react-icons/io5';
import { IoIosTrendingUp } from "react-icons/io";
import { IoLogoGameControllerB } from "react-icons/io";
import { TbTournament } from "react-icons/tb";
import { MdPreview } from "react-icons/md";



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
                <div className="sidebarContainer">
                    <h1><SiApplearcade/> PB-Gaming</h1>
                    <br></br>
                    <ul>
                        <li><button><IoHomeSharp/> HOME</button></li>
                        <li><button><IoIosTrendingUp/> TRENDING</button></li>
                        <li><button><MdPreview /> GAME REVIEW</button></li>
                        <li><button><IoLogoGameControllerB /> GAME PLAY</button></li>
                        <li><button><TbTournament /> GAME PLAY-TOURNAMENT</button></li>
                    </ul>
                </div>
            </div>
            <div className="GamingContainer">
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
                    </div
                    ><div className="ReviewBox">
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
