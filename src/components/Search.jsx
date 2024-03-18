import React, { useState } from 'react';
import { collection, query, where, getDocs, getDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { FaSearch } from 'react-icons/fa';
import '../Styles/Search.css'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    /*
        *handleSearch function
        *searches for the searchTerm in the database
        *if the searchTerm is empty, return nothing
        *if the searchTerm is not empty, retrieve the collection reference and query the database for the searchTerm
        *if there is an error, console log the error and set the results to an empty array
    */
    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        const trimmedSearchTerm = searchTerm.trim();
        const searchDataRef = collection(db, "searchData");
        const q = query(
            searchDataRef,
            where("title", ">=", trimmedSearchTerm),
            where("title", "<=", trimmedSearchTerm + '\uf8ff')
        );

        try {
            const querySnapshot = await getDocs(q);
            const searchResults = await Promise.all(querySnapshot.docs.map(async (searchDoc) => {
                // Start with the data from the searchData collection
                const item = {
                    id: searchDoc.id,
                    ...searchDoc.data(),
                    keywords: searchDoc.data().keywords ? searchDoc.data().keywords.join(', ') : '', // Convert keywords array to string
                };

                if (searchDoc.data().dataRef) {
                    const refSnapshot = await getDoc(searchDoc.data().dataRef);
                    if (refSnapshot.exists()) {
                        item.refData = refSnapshot.data();
                    } else {
                        item.refData = { error: 'Referenced document does not exist.' };
                    }
                }

                return item;
            }));

            setResults(searchResults);
        } catch (error) {
            console.error("Error fetching search results: ", error);
            setResults([]);
        }
    };



    return (
        <div className="searchContainer">
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                />
                <button onClick={handleSearch} className="searchButton">
                    <FaSearch className="faSearch" />
                </button>
            </div>

            <div className="resultsContainer">
                {results.map(item => (
                    <div key={item.id} className="item">
                        <h3>{item.title}</h3>
                        <p>{item.keywords}</p>
                        {item.refData && (
                            <div>
                                <p>{item.refData.text}</p>
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Search;
