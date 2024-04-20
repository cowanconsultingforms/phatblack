import React from 'react';
import '../Styles/SearchCard.css';

function SearchCard({ item }) {
    const { title, description, url, fileType } = item;

    const renderMedia = () => {
        switch (fileType) {
            case 'image':
                return (
                    <div className="media-preview">
                        <img src={url} alt="Media Preview" />
                    </div>
                );
            case 'video':
                return (
                    <div className="media-preview">
                        <video controls>
                            <source src={url} type="video/mp4" />
                        </video>
                    </div>
                );
            case 'pdf':
                return <iframe src={url} className="media-preview" title="PDF Preview"></iframe>;
            default:
                return <p>No preview available</p>;
        }
    };

    return (
        <div className="search-card">
            {renderMedia()}
            <div className="search-card-content">
                <h2 className="search-card-title">{title}</h2>
                <p className="search-card-description">{description}</p>
            </div>
        </div>
    );
}

export default SearchCard;
