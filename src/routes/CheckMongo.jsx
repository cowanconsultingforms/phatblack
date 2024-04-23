import React, { useState, useEffect } from "react";
import axios from "axios";
import { doc, getDoc, getFirestore } from "firebase/firestore";

function Test() {
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

    return (
        <div>
            <h1>Data from MongoDB</h1>
            <ul>
                {data.map(item => (
                    <li key={item._id}>
                        <h2>{item.title}</h2>
                        <p>Collection: {item.firestoreCollection}</p>
                        <p>Exists in Firestore: {item.existsInFirestore ? "Yes" : "No"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test;
