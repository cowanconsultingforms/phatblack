import React from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';
import MediaPreview from './MediaPreview';

// MediaItem component for managing media items
function MediaItem({ item, onDelete, onEdit }) {
    return (
        <div className="media-item">
            <MediaPreview media={item} />
            <h3>Title: {item.title}</h3>
            <p>Description: {item.description}</p>
            <button onClick={() => onEdit(item)} className="media-btn">
                <FaPen /> Edit
            </button>
            <br />
            <button onClick={() => onDelete(item)} className="media-btn">
                <FaTrash /> Delete
            </button>
        </div>
    );
}

export default MediaItem;
