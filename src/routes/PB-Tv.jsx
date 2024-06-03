import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import PBTvCard from "../components/PBTvCard.jsx";
import { db } from "../firebaseConfig.js";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { IoMdPlay } from "react-icons/io";
import { RiInformationLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../Styles/PBTv.css";

//const PBTvCard = lazy(() => import("../components/PBTvCard.jsx"))

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

    const handlePlayButtonClick = () => {
        if (videoRef.current) {
            videoRef.current.play(); // Play the video
        }
    };

    return (
        <div className="pbtv-page">
            <div className="pbtv-head">
            <div className="subtopics-container">
                    <a href="/pbtv">
                        <h2 className="Subtopics">PB-Music</h2>
                    </a>
                    <a href="/pbtv">
                        <h2 className="Subtopics">Genres</h2>
                    </a>
                    <a href="/pbtv">
                        <h2 className="Subtopics">On-Demand</h2>
                    </a>
                    <a href="/pbtv">
                        <h2 className="Subtopics">Movies</h2>
                    </a>
                    <a href="/pbtv">
                        <h2 className="Subtopics">Documentaries</h2>
                    </a>
                    <a href="/pbtv">
                        <h2 className="Subtopics">TV-Series</h2>
                    </a>
                    <a href="/pbtv">
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
                <button className="featured-play-button" onClick={handlePlayButtonClick}>
                    <IoMdPlay />  Play
                </button>
                <button className="featured-more-info-button">
                    <RiInformationLine />  More Info
                </button>
            </div>

           

            <h3>Featured <MdKeyboardArrowRight className="arrow-icon"/></h3>
            <div className="pbtv-featured-card-container">
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

            <h3>Top 10 Movies <MdKeyboardArrowRight className="arrow-icon"/></h3>
            <div className="pbtv-top-movies-card-container" id="top-movies">
                {pbtvVideos.map((video, index) => (
                    <div className="number-and-card-div">
                        <p className="ranking">{index+1}</p>
                        <PBTvCard 
                            key={index}
                            src={video.url}
                            title={video.title}
                            vendor={video.vendor}
                            timeuploaded={video.time_uploaded.toDate()}
                            views={video.views}
                        />
                    </div>
                ))}
            </div>

            <h3>Suggested <MdKeyboardArrowRight className="arrow-icon"/></h3>
            <div className="pbtv-featured-card-container">
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

            <h3>Top 10 TV-Shows <MdKeyboardArrowRight className="arrow-icon"/></h3>
            <div className="pbtv-top-movies-card-container" id="top-movies">
                {pbtvVideos.map((video, index) => (
                    <div className="number-and-card-div">
                        <p className="ranking">{index+1}</p>
                        <PBTvCard 
                            key={index}
                            src={video.url}
                            title={video.title}
                            vendor={video.vendor}
                            timeuploaded={video.time_uploaded.toDate()}
                            views={video.views}
                        />
                    </div>
                ))}
            </div>

            <h3>Favorites <MdKeyboardArrowRight className="arrow-icon"/></h3>
            <div className="pbtv-featured-card-container">
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