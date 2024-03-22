import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!searchTerm) return;

            setLoading(true);
            const searchDataRef = collection(db, "searchData");
            const q = query(
                searchDataRef,
                where("title", ">=", searchTerm),
                where("title", "<=", searchTerm + '\uf8ff')
            );

            try {
                const querySnapshot = await getDocs(q);
                setResults(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })));
            } catch (error) {
                console.error("Error fetching search results: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {results.length > 0 ? (
                results.map(item => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.keywords}</p>
                    </div>
                ))
            ) : (
                <div>No results found for "{searchTerm}"</div>
            )}
        </div>
    );
};

export default SearchResults;
