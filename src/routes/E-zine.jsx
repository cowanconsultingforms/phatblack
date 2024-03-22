import React from 'react';
import {FaLock} from 'react-icons/fa';
import '../Styles/Ezine.css';
import speakerImage from "../assets/SpeakerImage.png"; 
import cameraImage from "../assets/tech_camera.jpg";
import micImage from "../assets/tech_mic.jpg";
import phoneImage from "../assets/tech_phone.jpg";
import tabletImage from "../assets/tech_tablet.jpg";
import typewriterImage from "../assets/tech_typewriter.jpg";
import Carousel from '../components/Carousel';

//array of images/slides for carousel
const eZineCards = [
  {
    url: speakerImage,
    title: "speaker",
    text: "speaker image",
    alt: "speaker image",
    link: `details`
  },
  {
    url: cameraImage,
    title: "camera",
    text: "camera Image",
    alt: "camera Image",
    link: `details`
  },
  {
    url: micImage,
    title: "mic",
    text: "mic Image",
    alt: "mic Image",
    link: `details`
  },
  {
    url: phoneImage,
    title: "phone",
    text: "phone Image",
    alt: "phone Image",
    link: `details`
  },
  {
    url: tabletImage,
    title: "tablet",
    text: "tablet Image",
    alt: "tablet Image",
    link: `details`
  },
  {
    url: typewriterImage,
    title: "Typewriter",
    text: "Typewriter Image",
    alt: "Typewriter Image",
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