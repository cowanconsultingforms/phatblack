import React, { useState, useEffect } from "react";
import "../Styles/E-gaming.css";

function Egaming() {

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
                <h1>E-GAMING</h1>
                <ul>
                    <li><button>HOME</button></li>
                    <li><button>TRENDING</button></li>
                    <li><button>ALL</button></li>
                    <li><button>TOP HITS</button></li>
                </ul>
            </div>
            <div className="GamingContainer">
                <h1>GAMES</h1>
                <svg
                    className="sidebar-toggle"
                    onClick={toggleSidebar}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="30"
                    height="40"
                >
                    <rect x="0" y="4" width="30" height="2" fill="currentColor"/>
                    <rect x="0" y="9" width="30" height="2" fill="currentColor"/>
                    <rect x="0" y="14" width="30" height="2" fill="currentColor"/>
                </svg>
                <hr/>
                <div className="ReviewGrid">
                    <div className="ReviewBox">
                        <img src="src/assets/HellDivers2.jpg" alt="Game 1" />
                        <button>Hell Divers 2</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/fortnight.jpg" alt="Game 2" />
                        <button>fortnight</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/CK3.jpg" alt="Game 3" />
                        <button>Crusader Kings 3</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/DarkestDungeon.jpg" alt="Game 4" />
                        <button>Darkest Dungeon</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/HFF2.jpg" alt="Game 5" />
                        <button>Human Fall Falt 2</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 6" />
                        <button>Game 6</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 7" />
                        <button>Game 7</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 8" />
                        <button>Game 8</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 9" />
                        <button>Game 9</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 10" />
                        <button>Game 10</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 11" />
                        <button>Game 11</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 12" />
                        <button>Game 12</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 13" />
                        <button>Game 13</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 14" />
                        <button>Game 14</button>
                    </div>
                    <div className="ReviewBox">
                        <img src="src/assets/Witcher3.jpg" alt="Game 15" />
                        <button>Game 15</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Egaming;
