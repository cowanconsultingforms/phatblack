import React, { useEffect, useState }from "react";
import "../Styles/PBcommunities.css";
import PBcommunitiesCard from "../components/PBcommunitiesCard";
import conference from "../assets/conference.jpg";

const scholarship = [
    {
        image: conference,
        title: "Conference 1",
        description: "This is conference 1",
        linkPath: "/pbcommunities"
    },
    {
        image: conference,
        title: "Conference 2",
        description: "This is conference 2",
        linkPath: "/pbcommunities"
    },
    {
        image: conference,
        title: "Conference1",
        description: "This is conference 3",
        linkPath: "/pbcommunities"
    },
    {
        image: conference,
        title: "Conference 3",
        description: "This is conference 4",
        linkPath: "/pbcommunities"
    },
    {
        image: conference,
        title: "Conference 5",
        description: "This is conference 5",
        linkPath: "/pbcommunities"
    },
    {
        image: conference,
        title: "Conference 6",
        description: "This is conference 6",
        linkPath: "/pbcommunities"
    },


];

function PBScholarships() {
    return (
        <div className="scholarship-container">
                    {scholarship.map((scholarship, index) => (
                        <PBcommunitiesCard
                            key={index}
                            title={scholarship.title}
                            image={scholarship.image}
                            description={scholarship.description}
                            linkPath={scholarship.linkPath}
                        />
                    ))}
                </div>
    )
};

export default PBScholarships; 