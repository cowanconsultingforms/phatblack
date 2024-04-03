import React, { useEffect, useState, useRef } from "react";
import EtvCard from "../components/EtvCard.jsx";
import { db } from "../firebaseConfig.js";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import "../Styles/Etv.css";

function Etv() {
    const [etvVideos, setEtvVideos] = useState([]);
    const [featuredVideo, setFeaturedVideo] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchEtvVideos = async () => {
            try {
                const etvVideosCollection = collection(db, "e-tv");
                const q = query(etvVideosCollection);
                const querySnapshot = await getDocs(q);
                const videos = querySnapshot.docs.map(doc => doc.data());
                setEtvVideos(videos);

                // Find the video with the most views
                const sortedVideos = videos.sort((a, b) => b.views - a.views);
                if (sortedVideos.length > 0) {
                    setFeaturedVideo(sortedVideos[0]);
                }
            } catch (error) {
                console.error("Error fetching e-tv videos:", error);
            }
        };

        fetchEtvVideos();

    }, []);

    useEffect(() => {
        if (videoRef.current) {
            // Set the start time of the featured video to 1 second in
            videoRef.current.currentTime = 0.1;
        }
    }, [featuredVideo]); // Update the effect dependency

    const handleVideoClick = async (videoTitle) => {
        try {
            const videoDocRef = doc(db, "e-tv", videoTitle);
            await updateDoc(videoDocRef, {
                views: increment(1)
            });
        } catch (error) {
            console.error("Error updating view count:", error);
        }
    };

    return (
        <div className="etv-page">
            <h1>E-TV</h1>
            <div className="etv-head">
                <div className="subtopics-container">
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">PB-Music</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Genres</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">On-Demand</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Movies</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Documentaries</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">TV-Series</h2>
                    </a>
                    <a href="https://phat-black.web.app/etv">
                        <h2 className="Subtopics">Live Broadcast</h2>
                    </a>

                    {/* Maybe add search bar? Or would it be too much with the general search bar of the website?
      <FontAwesomeIcon icon={faSearch} className="search-icon"> */}
                </div>
            </div>


            <div className="etv-featured">
                {featuredVideo && (
                    <video
                        ref={videoRef}
                        className="featured-video"
                        src={featuredVideo.url}
                        controls
                        onClick={() => handleVideoClick(featuredVideo.title)}
                    />
                )}
            </div>

            <div className="etv-card-container">
                {etvVideos.map((video, index) => (
                    <EtvCard
                        key={index}
                        src={video.url}
                        title={video.title}
                        vendor={video.vendor}
                        timeuploaded={video.time_uploaded.toDate()}
                        views={video.views}
                    />
                ))}
            </div>
        </div>
    );
}

export default Etv;
