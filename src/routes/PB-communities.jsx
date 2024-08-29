import React, { useEffect, useState }from "react";
import "../Styles/PBcommunities.css";
import PBcommunitiesCard from "../components/PBcommunitiesCard";
import { FaBars } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { RiGraduationCapFill } from "react-icons/ri";
import { RiServiceFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import teaching from "../assets/teaching.jpg";
import service from "../assets/service.jpg";
import conference from "../assets/conference.jpg";
import equalizer from "../assets/equalizer.png"; 

function PBcommunuties() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleTeaching = () => {
            navigate('/PBTeaching');
    }
    const handleScholarships = () => {
        navigate('/PBScholarships');
    }

    const handleService = () => {
        navigate('/PBService');
    }


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
        <div className="PBcommunities">
        <FaBars className="sidebar-toggle" onClick={toggleSidebar}/>
            <div className={`CommunitySidebar ${sidebarOpen ? 'open' : ''}`}>
                    <div className="sidebarContainer">
                        <h1><RiCommunityFill /> PB-Communities</h1>
                        <br></br>
                        <ul>
                            <li><button onClick={ handleTeaching }><GiTeacher /> TEACHING</button></li>
                            <li><button onClick={ handleScholarships }><RiGraduationCapFill /> SCHOLARSHIP</button></li>
                            <li><button onClick={ handleService }><RiServiceFill /> SERVICE</button></li>
                        </ul>
                    </div>
                </div>
                <img src={ teaching } />
                <img src={ conference } />
                <img src={ service } />
        </div>
    )
};

export default PBcommunuties; 