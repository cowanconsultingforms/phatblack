import React from "react";
import EtvCard from "../components/EtvCard.jsx";
import test from "../assets/ezine_vid.mp4";
import "../Styles/Etv.css";

function Etv() {

    return (
        <div className="etv-page">
            <h1>E-TV</h1>
            <div className="etv-head">
                <div className="subtopics-container">
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">PB-Music</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Genres</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">On-Demand</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Movies</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Documentaries</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">TV-Series</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Live Broadcast</h2>
                    </a>

                    {/* Maybe add search bar? Or would it be too much with the general search bar of the website?
      <FontAwesomeIcon icon={faSearch} className="search-icon"> */}
                </div>
            </div>


            <div className="etv-featured">
                <video
                    controls
                >
                    <source src="path_to_your_featured_video.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="etv-card-container">
                <EtvCard src={test} title="Video Title 1" />
                <EtvCard src={test} title="Video Title 1" />
                <EtvCard src={test} title="Video Title 1" />
                <EtvCard src={test} title="Video Title 1" />
                <EtvCard src={test} title="Video Title 1" />
                <EtvCard src={test} title="Video Title 1" />
                <EtvCard src={test} title="Video Title 1" />
                <EtvCard src={test} title="Video Title 1" />
            </div>
        </div>
    );
}

export default Etv;
