import React from "react";
import "../Styles/Eradio.css";
import EventCard from "../components/EventCard";
import cassette from "../assets/cassette.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom previous arrow component
const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <button className={`${className} prev-arrow`} onClick={onClick}>
            Previous
        </button>
    );
};

// Custom next arrow component
const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <button className={`${className} next-arrow`} onClick={onClick}>
            Next
        </button>
    );
};


function Eradio() {
    // Settings for the carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="eradio-page">
            <div className="radio-head">
                <h1>E-Radio</h1>
            </div>

            <Slider {...settings} className="radio-container events">
                {/**TEST IMAGES */}
                <EventCard title="Test" imgSrc={cassette} />
                <EventCard title="Test" imgSrc={cassette} />
                <EventCard title="Test" imgSrc={cassette} />
                <EventCard title="Test" imgSrc={cassette} />
            </Slider>

            <div className="radio-head">
                <h1>Podcasts</h1>
            </div>

            <div className="podcast-container events">
                <EventCard title="Test" imgSrc={cassette} />
                <EventCard title="Test" imgSrc={cassette} />
                <EventCard title="Test" imgSrc={cassette} />
                <EventCard title="Test" imgSrc={cassette} />
            </div>
        </div>
    );
}

export default Eradio;
