import React, { useEffect, useState, useRef } from "react";
import PBTvCard from "../components/PBTvCard.jsx";
import { db } from "../firebaseConfig.js";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import "../Styles/PBTv.css";

function PBTv() {
    const [pbtvVideos, setPbTvVideos] = useState([]);
    const [featuredVideo, setFeaturedVideo] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchPBTvVideos = async () => {
            try {
                const pbtvVideosCollection = collection(db, "pb-tv");
                const q = query(pbtvVideosCollection);
                const querySnapshot = await getDocs(q);
                const videos = querySnapshot.docs.map(doc => doc.data());
                setPbTvVideos(videos);

                // Find the video with the most views
                const sortedVideos = videos.sort((a, b) => b.views - a.views);
                if (sortedVideos.length > 0) {
                    setFeaturedVideo(sortedVideos[0]);
                }
            } catch (error) {
                console.error("Error fetching pb-tv videos:", error);
            }
        };

        fetchPBTvVideos();

    }, []);

    useEffect(() => {
        if (videoRef.current) {
            // Set the start time of the featured video to 1 second in
            videoRef.current.currentTime = 0.1;
        }
    }, [featuredVideo]); // Update the effect dependency

    const handleVideoClick = async (videoTitle) => {
        try {
            const videoDocRef = doc(db, "pb-tv", videoTitle);
            await updateDoc(videoDocRef, {
                views: increment(1)
            });
        } catch (error) {
            console.error("Error updating view count:", error);
        }
    };

    return (
        <div className="pbtv-page">
            <h1>PB-TV</h1>
            <div className="pbtv-head">
                <div className="subtopics-container">
                    <a href="/tv">
                        <h2 className="Subtopics">PB-Music</h2>
                    </a>
                    <a href="/tv">
                        <h2 className="Subtopics">Genres</h2>
                    </a>
                    <a href="/tv">
                        <h2 className="Subtopics">On-Demand</h2>
                    </a>
                    <a href="/tv">
                        <h2 className="Subtopics">Movies</h2>
                    </a>
                    <a href="/tv">
                        <h2 className="Subtopics">Documentaries</h2>
                    </a>
                    <a href="/tv">
                        <h2 className="Subtopics">TV-Series</h2>
                    </a>
                    <a href="/tv">
                        <h2 className="Subtopics">Live Broadcast</h2>
                    </a>

                    {/* Maybe add search bar? Or would it be too much with the general search bar of the website?
      <FontAwesomeIcon icon={faSearch} className="search-icon"> */}
                </div>
            </div>


            <div className="pbtv-featured">
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

            <div className="pbtv-card-container">
                {pbtvVideos.map((video, index) => (
                    <PBTvCard
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

export default PBTv;
