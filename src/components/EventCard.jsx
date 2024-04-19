import React from "react";
import { Link } from "react-router-dom";

function EventCard({ path, title, imgSrc }) {
  return (
    
    <div className="event-card">
        {/**Event details below**/}
        <h1>{title}</h1>
        <Link to={`/${path}/${title}`}>
            <img src={imgSrc}></img>
        </Link>
        
    </div>
  );
}

export default EventCard;
