import React, {useState}from "react";
import "../Styles/PBcommunities.css";
import PBcommunitiesCard from "../components/PBcommunitiesCard";
import teaching from "../assets/teaching.jpg";
import conference from "../assets/conference.jpg";
import service from "../assets/service.jpg";

const courses = [
    {
        image: teaching,
        title: "Course 1",
        description: "This is course 1",
        linkPath: "/pbcommunities"
    },
    {
        image: teaching,
        title: "Course 2",
        description: "This is course 2",
        linkPath: "/pbcommunities"
    },
    {
        image: teaching,
        title: "Course 3",
        description: "This is course 3",
        linkPath: "/pbcommunities"
    },
    {
        image: teaching,
        title: "Course 4",
        description: "This is course 4",
        linkPath: "/pbcommunities"
    },
    {
        image: teaching,
        title: "Course 5",
        description: "This is course 5",
        linkPath: "/pbcommunities"
    },
    {
        image: teaching,
        title: "Course 6",
        description: "This is course 6",
        linkPath: "/pbcommunities"
    },
];

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


function PBcommunuties() {
    return (
        <div className="PBcommunities">
             <div>
                <h1 className="page-header">
                    Teaching
                </h1>
                </div>
            <div className="Teaching-container">
                {courses.map((course, index) => (
                    <PBcommunitiesCard
                        key={index}
                        title={course.title}
                        image={course.image}
                        description={course.description}
                        linkPath={course.linkPath}
                    />
                ))}
            </div>
            <div>
                <h1 className="page-header2">
                    Scholarships
                </h1>
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
        </div>
        <div>
                <h1 className="page-header3">
                    Service
                </h1>
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
        </div>
        </div>
    )
};

export default PBcommunuties; 