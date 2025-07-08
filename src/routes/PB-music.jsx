import React from "react";
import "../Styles/Pb-music.css";

const hits = [
  {
    title: "TIDAL's Top Hits",
    subtitle: "TIDAL",
    tracks: 100,
    img: "https://via.placeholder.com/180x180?text=Top+Hits"
  },
  {
    title: "Pop Hits",
    subtitle: "TIDAL",
    tracks: 48,
    img: "https://via.placeholder.com/180x180?text=Pop+Hits"
  },
  {
    title: "Rock Hits",
    subtitle: "TIDAL",
    tracks: 50,
    img: "https://via.placeholder.com/180x180?text=Rock+Hits"
  },
  {
    title: "Country Hits",
    subtitle: "TIDAL",
    tracks: 50,
    img: "https://via.placeholder.com/180x180?text=Country+Hits"
  },
  {
    title: "Rap Hits",
    subtitle: "TIDAL",
    tracks: 50,
    img: "https://via.placeholder.com/180x180?text=Rap+Hits"
  },
  {
    title: "R&B Hits",
    subtitle: "TIDAL",
    tracks: 50,
    img: "https://via.placeholder.com/180x180?text=R%26B+Hits"
  },
  {
    title: "Indie Hits",
    subtitle: "TIDAL",
    tracks: 50,
    img: "https://via.placeholder.com/180x180?text=Indie+Hits"
  }
];

const newTracks = [
  {
    cover: "https://via.placeholder.com/48x48?text=Track",
    title: "Together",
    artist: "David Guetta, Hypaton, Bonnie Tyler",
    duration: "2:34"
  },
  {
    cover: "https://via.placeholder.com/48x48?text=Track",
    title: "America (12'' Version)",
    artist: "Prince, The Revolution",
    duration: "21:41"
  },
  {
    cover: "https://via.placeholder.com/48x48?text=Track",
    title: "Tree",
    artist: "Chance the Rapper, Lil Wayne, Smino",
    duration: "4:28"
  },
  {
    cover: "https://via.placeholder.com/48x48?text=Track",
    title: "Summer '25",
    artist: "Benny The Butcher",
    duration: "2:19"
  },
  {
    cover: "https://via.placeholder.com/48x48?text=Track",
    title: "pray4dagang (feat. KayCyy)",
    artist: "A$AP Rocky, KayCyy",
    duration: "3:23"
  }
];

function PBmusic() {
  return (
    <div className="pb-music-page">
      <h2 className="pb-music-section-title">The Hits</h2>
      <div className="pb-music-hits-row">
        {hits.map((hit, idx) => (
          <div className="pb-music-hit-card" key={idx}>
            <img src={hit.img} alt={hit.title} className="pb-music-hit-img" />
            <div className="pb-music-hit-info">
              <div className="pb-music-hit-title">{hit.title}</div>
              <div className="pb-music-hit-subtitle">{hit.subtitle}</div>
              <div className="pb-music-hit-tracks">{hit.tracks} TRACKS</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="pb-music-section-title" style={{marginTop: 48}}>New Tracks</h2>
      <div className="pb-music-tracks-table">
        {newTracks.map((track, idx) => (
          <div className="pb-music-track-row" key={idx}>
            <img src={track.cover} alt={track.title} className="pb-music-track-cover" />
            <div className="pb-music-track-title">{track.title}</div>
            <div className="pb-music-track-artist">{track.artist}</div>
            <div className="pb-music-track-duration">{track.duration}</div>
            <div className="pb-music-track-fav">♡</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PBmusic; 