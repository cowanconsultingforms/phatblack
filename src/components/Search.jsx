// Search.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../Styles/Search.css'; // Make sure this path is correct

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchContainerStyling, setSearchContainerStyling] = useState('searchContainer');
    const [searchBarStyling, setSearchBarStyling] = useState('searchBar');
    const [searchInputStyling, setSearchInputStyling] = useState('searchInput');
    const [searchButtonStyling, setSearchButtonStyling] = useState('searchButton');
    const navigate = useNavigate();

    var windowWidth;
    var windowWidthTooBig;
    function updateWindowSize(){
        windowWidth = window.innerWidth;
        if(windowWidth>560){
            windowWidthTooBig = true;
        } 
        if(windowWidth<561){
            windowWidthTooBig = false;
        }
        if(windowWidthTooBig){
            setSearchContainerStyling('searchContainer');
            setSearchInputStyling('searchInput');
            setSearchBarStyling('searchBar');
            setSearchButtonStyling('searchButton');
        }
    }
    window.addEventListener('resize', updateWindowSize);

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

    /* */
    const handleSearchExpansion = () =>{

        

        if((window.innerWidth < 560) && (searchContainerStyling == 'searchContainer')){
            setSearchContainerStyling('searchContainerExpanded');
            setSearchInputStyling('searchInputExpanded');
            setSearchBarStyling('searchBarExpanded');
            setSearchButtonStyling('searchButtonExpanded');
        }
        else if((window.innerWidth < 560) && (searchContainerStyling == 'searchContainerExpanded')){
            setSearchContainerStyling('searchContainer');
            setSearchInputStyling('searchInput');
            setSearchBarStyling('searchBar');
            setSearchButtonStyling('searchButton');
        }
        console.log(windowWidth);
    };

    return (
        // Wrap the input and button with a form and set the onSubmit handler
        <form className={searchContainerStyling} onSubmit={handleSearch}>
            <div className={searchBarStyling}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={searchInputStyling}
                />
                <button className={searchButtonStyling} onClick={handleSearchExpansion}>
                    <FaSearch className="faSearch" />
                </button>
            </div>
        </form>
    );
};

export default Search;
