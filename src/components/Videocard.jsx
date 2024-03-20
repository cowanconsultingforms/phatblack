import React from 'react';
import { useEffect, useState } from 'react';
import separator from "../assets/separator.png";

function VideoCard({ src, title, paragraph, href }) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice);
    }, []);
    return (
        <div className="video-card">
            {/**Uncomment the /s and *s below to disable mobile autoplay*/}
            <video className="video" autoPlay/**={!isMobile} */ controls loop muted playsInline src={src}></video>
            <a href={href} className="video-title">{title}</a>
            <img className="separator" src={separator} alt="Separator"></img>
            <p className="video-paragraph">{paragraph}</p>
        </div>
    );
}

export default VideoCard; 
