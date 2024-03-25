import React from "react";
import { Link } from "react-router-dom";
import "../Styles/PBevents.css";
import EventCard from "../components/EventCard";

function PBevents() {
    return (
        <div className="events-page">
            <div className="event-head">
                <h1 className="page-header">PB-Events</h1>
                <Link to="/host-event">
                    <h1 className="page-header"> Host an Event</h1>
                </Link>
            </div>

            <div className="upcoming-events">
                <h1 className="sub-header">Upcoming</h1>
                <div className="events">
                    {/**TEST IMAGES */}
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                </div>
            </div>

            <div className="popular-near-events">
                <h1 className="sub-header">Popular Near You </h1>
                <div className="events">
                    {/**TEST IMAGES */}
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                    <EventCard title='Event Name' imgSrc="https://www.w3schools.com/w3images/tech_camera.jpg" />
                </div>
            </div>
        </div>
    );
}

export default PBevents;
