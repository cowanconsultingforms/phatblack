import React from 'react';
import { Link } from 'react-router-dom';

function PBcommunitiesCard({image, title, description, linkPath}) {
    return (
        <Link to={linkPath}>
        <div className= "PBcommunitiesCard">
              <h2 className="card-title">{title}</h2>
            <img className = "image-class" src={image} alt="community image" />
            <p className = "description-card">{description}</p>
        </div>
        </Link>
    )
}

export default PBcommunitiesCard;