import React, { useEffect, useState }from "react";
import "../Styles/PBcommunities.css";
import PBcommunitiesCard from "../components/PBcommunitiesCard";
import service from "../assets/service.jpg";

const Service = [
    {
        image: service,
        title: "Service 1 ",
        description: "This is service 1",
        linkPath: "/pbcommunities"
    },
    {
        image: service,
        title: "Service 2",
        description: "This is service 2",
        linkPath: "/pbcommunities"
    },
    {
        image: service,
        title: "Service 3",
        description: "This is service 3",
        linkPath: "/pbcommunities"
    },
    {
        image: service,
        title: "Service 4",
        description: "This is service 4",
        linkPath: "/pbcommunities"
    },
    {
        image: service,
        title: "Service 5",
        description: "This is service 5",
        linkPath: "/pbcommunities"
    },
    {
        image: service,
        title: "Service 6",
        description: "This is service 6",
        linkPath: "/pbcommunities"
    },


];

function PBService() {
    return (
        <div className="service-container">
                    {Service.map((Service, index) => (
                        <PBcommunitiesCard
                            key={index}
                            title={Service.title}
                            image={Service.image}
                            description={Service.description}
                            linkPath={Service.linkPath}
                        />
                    ))}
                </div>
    )
};

export default PBService; 