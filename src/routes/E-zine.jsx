import React from 'react';
import {FaLock} from 'react-icons/fa';
import '../Styles/Ezine.css';
export default function Ezine() {
    return (
      <div className="background-page">
       <div><Header /> </div> 
        <div> <News_pictures /> </div>
        <div> <Bottom_content /> </div>
      </div>  
    );
}

function Header() {
    return <h1 className="header">News</h1>;
}

const handleClick = (url) => { // this function is used to open a new tab when the user clicks on the image
  window.location.href = url;
}

//displays the news images on middle of the page
function News_pictures() { 
  
  return (
    <div className="news-pictures">
      <a onClick={() => handleClick('https://phatblack.com')}>
        <img src="https://www.w3schools.com/w3images/tech_mic.jpg" alt="microphone" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_phone.jpg" alt="phone" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_tablet.jpg" alt="tablet" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_camera.jpg" alt="camera" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_typewriter.jpg" alt="typewriter" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_typewriter.jpg" alt="typewriter" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_typewriter.jpg" alt="typewriter" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_typewriter.jpg" alt="typewriter" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_typewriter.jpg" alt="typewriter" />
      </a>
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img src="https://www.w3schools.com/w3images/tech_typewriter.jpg" alt="typewriter" />
      </a>

    </div>
  )
   
}

// content that appears after the news thumbnails
function Bottom_content() {
  return(
    <div>
      <h2 className = "header2">E-Zine</h2>
      <div className ="Bottom-image-container"></div>
    <div className="image-container">
      <a onClick={() => handleClick('https://phatblack.com')}>
      <img className='Bottom-image'
      src= "https://github.com/cowanconsultingforms/phatblack/blob/Development/src/assets/SpeakerImage.png?raw=true" alt="Subscibers only message" />
      </a>
      <div className="lockSymbol">
    <div><FaLock /></div>
    <div className = "subOnly">Subscribers only</div>
</div>
      </div>
    </div>
  )
}