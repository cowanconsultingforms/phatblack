import React, { useState, useEffect } from "react";
import "../Styles/PB-gaming.css";
import { FaBars } from "react-icons/fa";
import speakerImage from "../assets/redpants-radio.jpg"
import Aviation from "../assets/GammingImages/Aviation Course.jpg"
import Building from "../assets/GammingImages/Building the Pyramid.jpg"
import Caribbean from "../assets/GammingImages/Caribbean Pirates.jpg"
import Clash from "../assets/GammingImages/Clans of Clash.jpg"
import CyberAttack from "../assets/GammingImages/Cyber Attack.jpg"
import DownTown1 from "../assets/GammingImages/DownTown Drive.jpg"
import DownTown2 from "../assets/GammingImages/DownTown Drive 2.jpg"
import GalaxyWars from "../assets/GammingImages/Galaxy wars.jpg"
import GalaxyWars2 from "../assets/GammingImages/Galaxy Wars 2.jpg"
import GalaxyWars3 from "../assets/GammingImages/Galaxy Wars 3.jpg"
import Q50RS from "../assets/GammingImages/Mid Night Club 3.jpg"
import MissionEarth from "../assets/GammingImages/Mission Earth.jpg"
import Myth from "../assets/GammingImages/Myth.jpg"
import Speed from "../assets/GammingImages/Speed is The Need.jpg"
import Sword from "../assets/GammingImages/Sword Simulator.jpg"
import Beast from "../assets/GammingImages/The Beast of Gévaudan.jpg"
import TheLast from "../assets/GammingImages/The Last of You.jpg"
import Modern from "../assets/GammingImages/The Modern Tech.jpg"
import Modern2 from "../assets/GammingImages/The Modern Tech 2.jpg"
import Ring from "../assets/GammingImages/The Ring Lord.jpg"

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
                        <img src={Aviation} alt="Aviation Game" />
                        <button>Aviation Course</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Building} alt="Building the Pyramid" />
                        <button>Building the Pyramid</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Caribbean} alt="Caribbean Pirates" />
                        <button>Caribbean Pirates</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Clash} alt="Clans of Clash" />
                        <button>Clans of Clash</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={CyberAttack} alt="Cyber Attack" />
                        <button>Cyber Attack</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={DownTown1} alt="DownTown Drive" />
                        <button>DownTown Drive</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={DownTown2} alt="DownTown Drive 2" />
                        <button>DownTown Drive 2</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={GalaxyWars} alt="Galaxy Wars" />
                        <button>Galaxy Wars</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={GalaxyWars2} alt="Galaxy Wars 2" />
                        <button>Galaxy Wars 2</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={GalaxyWars3} alt="Galaxy Wars 3" />
                        <button>Galaxy Wars 3</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Q50RS} alt="Mid Night Club 3" />
                        <button>Mid Night Club 3</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={MissionEarth} alt="Mission Earth" />
                        <button>Mission Earth</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Myth} alt="Myth" />
                        <button>Myth</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Speed} alt="Speed is The Need" />
                        <button>Speed is The Need</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Sword} alt="Sword Simulator" />
                        <button>Sword Simulator</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Beast} alt="The Beast of Gévaudan" />
                        <button>The Beast of Gévaudan</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={TheLast} alt="The Last of You" />
                        <button>The Last of You</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Modern} alt="The Modern Tech" />
                        <button>The Modern Tech</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Modern2} alt="The Modern Tech 2" />
                        <button>The Modern Tech 2</button>
                    </div>
                    <div className="ReviewBox">
                        <img src={Ring} alt="The Ring Lord" />
                        <button>The Ring Lord</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};

export default PBgaming;
