import React, { useState, useEffect } from "react";
import "../Styles/PB-gaming.css";
import { FaBars } from "react-icons/fa";
import speakerImage from "../assets/redpants-radio.jpg"
import { SiApplearcade } from "react-icons/si";
import { IoHomeSharp } from 'react-icons/io5';
import { IoIosTrendingUp } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BiSolidTrophy } from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';



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
                <Link to='#' className='close'>
                    <AiOutlineClose onClick={toggleSidebar} />
                </Link>
                <h1>PB-Gaming</h1>
                <h1><SiApplearcade/></h1>
                <ul>
                    <li><button><IoHomeSharp/> HOME</button></li>
                    <li><button><IoIosTrendingUp/> TRENDING</button></li>
                    <li><button><FaExternalLinkAlt/> ALL</button></li>
                    <li><button><BiSolidTrophy/> TOP HITS</button></li>
                </ul>
            </div>
            <div className="GamingContainer">
                <FaBars className="sidebar-toggle" onClick={toggleSidebar}/>
                <h1>GAMES</h1>
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
