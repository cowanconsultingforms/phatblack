import React, { useEffect, useState }from "react";
import "../Styles/PBcommunities.css";
import PBcommunitiesCard from "../components/PBcommunitiesCard";
import teaching from "../assets/teaching.jpg";

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

function PBTeaching() {
    return (
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
    )
};

export default PBTeaching; 