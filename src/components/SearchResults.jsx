import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SearchCard from './SearchCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            if (!searchTerm) return;
            setLoading(true);

            try {
                const response = await fetch(`${API_URL}search?query=${encodeURIComponent(searchTerm)}`);
                const searchResults = await response.json();

                const docsFetchPromises = searchResults.map(result =>
                    getDoc(doc(db, result.firestoreCollection, result.title))
                );

                const docsSnapshots = await Promise.all(docsFetchPromises);
                const fetchedResults = docsSnapshots.map(snapshot => ({
                    id: snapshot.id,
                    ...snapshot.data(),
                }));

                setResults(fetchedResults);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            {results.length > 0 ? (
                results.map(item => (
                    <SearchCard
                        item={item}
                    />
                ))
            ) : (
                <div>No results found for "{searchTerm}"</div>
            )}
        </div>
    );
};

export default SearchResults;
