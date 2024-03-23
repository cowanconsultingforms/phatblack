import React from "react";
import { Link } from "react-router-dom";

function EventCard({ title, imgSrc }) {
  return (
    
    <div className="event-card">
        {/**Event details below**/}
        <h1>{title}</h1>
        <Link to={"/event-details"}>
            <img src={imgSrc}></img>
        </Link>
        
    </div>
  );
}

export default EventCard;
