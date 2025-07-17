import React from "react";
import AlbumCover from "../assets/pbmusic_album_cover.jpg"
import "../Styles/Pb-music.css";

const hits = [
  {
    title: "Artist's Top Hits",
    subtitle: "Subtitle",
    tracks: 100,
    img: AlbumCover
  },
  {
    title: "Pop Hits",
    subtitle: "Subtitle",
    tracks: 48,
    img: AlbumCover
  },
  {
    title: "Rock Hits",
    subtitle: "Subtitle",
    tracks: 50,
    img: AlbumCover
  },
  {
    title: "Country Hits",
    subtitle: "Subtitle",
    tracks: 50,
    img: AlbumCover
  },
  {
    title: "Rap Hits",
    subtitle: "Subtitle",
    tracks: 50,
    img: AlbumCover
  },
  {
    title: "R&B Hits",
    subtitle: "Subtitle",
    tracks: 50,
    img: AlbumCover
  },
  {
    title: "Indie Hits",
    subtitle: "Subtitle",
    tracks: 50,
    img: AlbumCover
  }
];

const newTracks = [
  {
    cover: AlbumCover,
    title: "Song title",
    artist: "Various artist names",
    duration: "2:34"
  },
  {
    cover: AlbumCover,
    title: "Song title",
    artist: "Various artist names",
    duration: "21:41"
  },
  {
    cover: AlbumCover,
    title: "Song title",
    artist: "Various artist names",
    duration: "4:28"
  },
  {
    cover: AlbumCover,
    title: "Song title",
    artist: "Various artist names",
    duration: "2:19"
  },
  {
    cover: AlbumCover,
    title: "Song title",
    artist: "Various artist names",
    duration: "3:23"
  }
];

const newAlbums = [
  {
    title: "Fresh Album 1",
    subtitle: "Brand new release",
    tracks: 12,
    img: AlbumCover
  },
  {
    title: "Fresh Album 2",
    subtitle: "Hot off the press",
    tracks: 10,
    img: AlbumCover
  },
  {
    title: "Fresh Album 3",
    subtitle: "Editor's pick",
    tracks: 14,
    img: AlbumCover
  },
  {
    title: "Summer Vibes",
    subtitle: "Feel-good tunes",
    tracks: 11,
    img: AlbumCover
  },
  {
    title: "Night Drive",
    subtitle: "Perfect for late nights",
    tracks: 13,
    img: AlbumCover
  },
  {
    title: "Acoustic Sessions",
    subtitle: "Unplugged and raw",
    tracks: 9,
    img: AlbumCover
  }
];

const editorsPicks = [
  {
    title: "Editor's Choice 1",
    subtitle: "Handpicked for you",
    tracks: 8,
    img: AlbumCover
  },
  {
    title: "Editor's Choice 2",
    subtitle: "Must listen",
    tracks: 9,
    img: AlbumCover
  },
  {
    title: "Editor's Choice 3",
    subtitle: "Top recommendation",
    tracks: 11,
    img: AlbumCover
  },
  {
    title: "Indie Gems",
    subtitle: "Hidden treasures",
    tracks: 10,
    img: AlbumCover
  },
  {
    title: "Global Beats",
    subtitle: "Sounds from around the world",
    tracks: 12,
    img: AlbumCover
  },
  {
    title: "Chill Out",
    subtitle: "Relax and unwind",
    tracks: 7,
    img: AlbumCover
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

      {/* New Albums Section */}
      <h2 className="pb-music-section-title" style={{marginTop: 48}}>New Albums</h2>
      <div className="pb-music-hits-row">
        {newAlbums.map((album, idx) => (
          <div className="pb-music-hit-card" key={idx}>
            <img src={album.img} alt={album.title} className="pb-music-hit-img" />
            <div className="pb-music-hit-info">
              <div className="pb-music-hit-title">{album.title}</div>
              <div className="pb-music-hit-subtitle">{album.subtitle}</div>
              <div className="pb-music-hit-tracks">{album.tracks} TRACKS</div>
            </div>
          </div>
        ))}
      </div>

      {/* From Our Editors Section */}
      <h2 className="pb-music-section-title" style={{marginTop: 48}}>From Our Editors</h2>
      <div className="pb-music-hits-row">
        {editorsPicks.map((pick, idx) => (
          <div className="pb-music-hit-card" key={idx}>
            <img src={pick.img} alt={pick.title} className="pb-music-hit-img" />
            <div className="pb-music-hit-info">
              <div className="pb-music-hit-title">{pick.title}</div>
              <div className="pb-music-hit-subtitle">{pick.subtitle}</div>
              <div className="pb-music-hit-tracks">{pick.tracks} TRACKS</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PBmusic; 