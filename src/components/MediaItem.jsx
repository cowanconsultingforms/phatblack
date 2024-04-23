import React, { useState, useEffect } from 'react';
import { FaTrash, FaPen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import MediaPreview from './MediaPreview';
import axios from 'axios';

function MediaItem({ item, onDelete, onEdit }) {
    const [existsInMongoDB, setExistsInMongoDB] = useState(null);
    const API_URL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const checkExistsInMongoDB = async () => {
            try {
                const response = await axios.get(`${API_URL}getOneData`, {
                    params: { title: item.title }
                });
                setExistsInMongoDB(response.data ? true : false);
            } catch (error) {
                console.error('Error checking MongoDB for:', item.title, error);
                setExistsInMongoDB(false);
            }
        };

        checkExistsInMongoDB();
    }, [item.title]);

    return (
        <div className="media-item" style={{ position: 'relative' }}>
            {existsInMongoDB !== null && (
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    {existsInMongoDB ? (
                        <FaCheckCircle color="green" title="Exists in MongoDB" />
                    ) : (
                        <FaTimesCircle color="red" title="Does not exist in MongoDB" />
                    )}
                </div>
            )}

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
