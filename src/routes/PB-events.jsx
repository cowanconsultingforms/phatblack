import React from "react";
import { Link } from "react-router-dom";
import "../Styles/PBevents.css";
import EventCard from "../components/EventCard";
import neonDj from "../assets/neondj.jpg";
import jazz from "../assets/jazz.jpg";
import concertHall from "../assets/concerthall.jpg";
import bar from "../assets/bar.jpg";
import mixer from "../assets/mixer.jpg";
import nightDj from "../assets/nightdj.jpg";
import pioneerDj from "../assets/pioneerdj.jpg";
import recordStore from "../assets/recordstore.jpg";
import bandInstruments from "../assets/bandinstruments.jpg";
import Carousel from "../components/Carousel";

const eventItems = [
    {
        url: jazz,
        title: "Live Jazz",
        text: "Social event: Live Jazz at...",
        alt: "Live Jazz Event image",
        link: `details`
    },
    {
        url: neonDj,
        title: "Neon Night",
        text: "Neon Night: Neon DJ set on friday night at...",
        alt: "Neon DJ Image",
        link: `details`
    },
    {
        url: nightDj,
        title: "Hip Hop Night",
        text: "Hip Hop Night: Listen and dance to the hottest hip hop songs out at...",
        alt: "Night DJ Image",
        link: `details`
    },
];

function PBevents() {
    return (
        <div className="events-page">
            <Carousel items={eventItems}></Carousel>
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
                    <EventCard path="pbevent" title='neon night' imgSrc={neonDj} />
                    <EventCard path="pbevent" title='book club' imgSrc={recordStore} />
                    <EventCard path="pbevent" title='underground dj' imgSrc={pioneerDj} />
                    <EventCard path="pbevent" title='bar karaoke' imgSrc={bar} />
                </div>
            </div>

            <div className="popular-near-events">
                <h1 className="sub-header">Popular Near You </h1>
                <div className="events">
                    {/**TEST IMAGES */}
                    <EventCard path="pbevent" title='hip hop night' imgSrc={nightDj} />
                    <EventCard path="pbevent" title='jazz concert' imgSrc={concertHall} />
                    <EventCard path="pbevent" title='dj set' imgSrc={mixer} />
                    <EventCard path="pbevent" title='the ensemble' imgSrc={bandInstruments} />                </div>
            </div>
        </div>
    );
}

export default PBevents;
