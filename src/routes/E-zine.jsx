import React from 'react';
import {FaLock} from 'react-icons/fa';
import '../Styles/Ezine.css';
import speakerImage from "../assets/redpants-radio.jpg"; 
import Carousel from '../components/Carousel';
import barImage from "../assets/bar.jpg";
import cassetteImage from "../assets/cassette.jpg";
import studioImage from "../assets/studio.jpg";
import recordsImage from "../assets/records.jpg";
import studioMicImage from "../assets/studiomic.jpg";

//array of images/slides for carousel
const eZineCards = [
  {
    url: recordsImage,
    title: "Records",
    text: "Records Image",
    alt: "Records image",
    link: `details`
  },
  {
    url: barImage,
    title: "Bar",
    text: "Bar Image",
    alt: "Bar Image",
    link: `details`
  },
  {
    url: cassetteImage,
    title: "Cassettes",
    text: "Cassettes Image",
    alt: "Cassettes Image",
    link: `details`
  },
  {
    url: studioImage,
    title: "Studio",
    text: "Studio Image",
    alt: "Studio Image",
    link: `details`
  },
  {
    url: studioMicImage,
    title: "Studio Mic",
    text: "Studio Mic Image",
    alt: "Studio Mic Image",
    link: `details`
  },
];

export default function Ezine() {
    return (
      <div className="background-page">
        <div> <News_pictures /> </div>
        <div> <Bottom_content /> </div>
      </div>  
    );
}

const handleClick = (url) => { // this function is used to open a new tab when the user clicks on the image
  window.location.href = url;
}

//displays the news images on middle of the page
function News_pictures() { 
  
  return (
    <div className='news-pictures'>
      <Carousel items={eZineCards}></Carousel>
    </div>
  )
   
}

// content that appears after the news thumbnails
function Bottom_content() {
  return(
    <div>
    <div className='header2-container'>
      <h2 className = "header2">E-Zine</h2>
    </div>
      <div className ="Bottom-image-container"></div>
    <div className="image-container">
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img className='Bottom-image'
      src={speakerImage} alt="Subscibers only message" />
      </a>
      <div className="lockSymbol">
    <div><FaLock /></div>
    <div className = "subOnly">Subscribers only</div>
</div>
      </div>
    </div>
  )
}