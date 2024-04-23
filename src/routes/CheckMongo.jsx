import React, { useState, useEffect } from "react";
import axios from "axios";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function CheckMongo() {
    const [data, setData] = useState([]);
    const db = getFirestore();
    const API_URL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}getAllData`);
                const mongoData = response.data;

                const checkFirestore = async (item) => {
                    const docRef = doc(db, item.firestoreCollection, item.title);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        return { ...item, existsInFirestore: true };
                    } else {
                        return { ...item, existsInFirestore: false };
                    }
                };

                const dataWithFirestoreCheck = await Promise.all(mongoData.map(item => checkFirestore(item)));
                setData(dataWithFirestoreCheck);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleMongoDBDelete = async (title) => {
        try {
            const response = await axios.delete(`${API_URL}delete?title=${encodeURIComponent(title)}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('MongoDB delete successful');
        } catch (error) {
            console.error('Error deleting MongoDB:', error);
        }
        setData(data.filter(item => item.title !== title));
    };

    return (
        <>
            <div className="users-list-container">
                <h1 className="users-list-title">Data from MongoDB</h1>
                <div className="users-list-table-wrapper">
                    <table className="users-list-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Collection</th>
                                <th>Exists in Firestore</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>{item.firestoreCollection}</td>
                                    <td>
                                        {item.existsInFirestore ? (
                                            <FaCheckCircle color="green" className="action-icon" />
                                        ) : (
                                            <FaTimesCircle color="red" className="action-icon" />
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => handleMongoDBDelete(item.title)}
                                                className="delete-button action-button"
                                            >
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CheckMongo;
