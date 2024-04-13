import React from 'react';
import '../Styles/MediaPreview.css';

function MediaPreview({ media }) {
    const { url, fileType } = media;

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
                return <iframe src={url} style={{ width: '100%', height: '500px' }} title="PDF Preview"></iframe>;
            default:
                return <p>No preview available</p>;
        }
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            {renderMedia()}
        </div>
    );
}

export default MediaPreview;
