// Search.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../Styles/Search.css'; // Make sure this path is correct

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Updated to be form submission handler
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedSearchTerm = searchTerm.trim();
        if (!trimmedSearchTerm) {
            return;
        }

        const queryTerm = trimmedSearchTerm.toLowerCase();
        // Use `navigate` to push the user to the /search route with the searchTerm as a query param
        navigate(`/search?q=${encodeURIComponent(queryTerm)}`);
    };

    return (
        // Wrap the input and button with a form and set the onSubmit handler
        <form className="searchContainer" onSubmit={handleSearch}>
            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                />
                <button className="searchButton">
                    <FaSearch className="faSearch" />
                </button>
            </div>
        </form>
    );
};

export default Search;
