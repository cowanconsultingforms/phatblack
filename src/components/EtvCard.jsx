import React, { useRef, useState } from "react";

const VideoCard = ({ src, title }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const handleHover = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        videoRef.current.muted = !isMuted;
    };

    const handleOnClick = () => {
        window.location.href = "/etv/test";
    }

    return (
        <div
            className="etv-card"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnClick}
        >
            <video
                ref={videoRef}
                controls={false}
                muted
                loop
                onClick={toggleMute}
            >
                <source src={src} type="video/mp4" />
            </video>
            <div className="mute-button" onClick={toggleMute}>
                {isMuted ? (
                    <i className="fas fa-volume-mute"></i>
                ) : (
                    <i className="fas fa-volume-up"></i>
                )}
            </div>
            <h2>{title}</h2>
        </div>
    );
};

export default VideoCard;
