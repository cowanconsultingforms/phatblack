import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/Search.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaFilter } from 'react-icons/fa';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchContainerStyling, setSearchContainerStyling] = useState('searchContainer');
  const [searchBarStyling, setSearchBarStyling] = useState('searchBar');
  const [searchInputStyling, setSearchInputStyling] = useState('searchInput');
  const [searchButtonStyling, setSearchButtonStyling] = useState('searchButton');
  const [filterButtonContainerStyling, setFilterButtonContainerStyling] = useState('filter-button-container');
  const [filterButtonStyling, setFilterButtonStyling] = useState('filter-button');

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  //focused state for conditionally rendering X icon for clearing search
  const [isFocused, setIsFocused] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [filterSearch, setFilterSearch] = useState("all");

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_APP_API_URL;

  var windowWidth;
  var windowWidthTooBig;
  function updateWindowSize() {
    windowWidth = window.innerWidth;
    if (windowWidth > 560) {
      windowWidthTooBig = true;
    }
    if (windowWidth < 561) {
      windowWidthTooBig = false;
    }
    if (windowWidthTooBig) {
      setSearchContainerStyling('searchContainer');
      setSearchInputStyling('searchInput');
      setSearchBarStyling('searchBar');
      setSearchButtonStyling('searchButton');
      setFilterButtonContainerStyling('filter-button-container');
      setFilterButtonStyling('filter-button');
    }
  }
  window.addEventListener('resize', updateWindowSize);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`${API_URL}searchSuggestions?query=${filterSearch === 'all' ? 'all' : filterSearch}`);
        const data = await response.json();
        setSuggestions(data.map(doc => ({
          id: doc._id, // Assuming MongoDB gives you an '_id'
          ...doc
        })));
      } catch (error) {
        console.error("Error fetching suggestions: ", error);
      }
    };

    fetchSuggestions();
  }, [filterSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      return;
    }

    const queryTerm = trimmedSearchTerm.toLowerCase();
    navigate(`/search?q=${encodeURIComponent(queryTerm)}`);
    setShowFilterButton(true);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion); // Check if this log is printed
    setSearchTerm(suggestion);
    setShowDropdown(false);
  };

  const handleSearchExpansion = () => {
    if ((window.innerWidth < 560) && (searchContainerStyling === 'searchContainer')) {
      setSearchContainerStyling('searchContainerExpanded');
      setSearchInputStyling('searchInputExpanded');
      setSearchBarStyling('searchBarExpanded');
      setSearchButtonStyling('searchButtonExpanded');
      setFilterButtonStyling('filter-button-expanded');
    } else if ((window.innerWidth < 560) && (searchContainerStyling === 'searchContainerExpanded')) {
      setSearchContainerStyling('searchContainer');
      setSearchInputStyling('searchInput');
      setSearchBarStyling('searchBar');
      setSearchButtonStyling('searchButton');
      setFilterButtonStyling('filter-button');
    }
  };

  const handleApplyFilter = (filtervalue) => {
    setFilterSearch(filtervalue);
    setTimeout(() => setShowFilterForm(false), 100);
  }



  return (
    <form className={searchContainerStyling} onSubmit={handleSearch}>
      <div className={searchBarStyling}>
        {/* <button className={`back ${(!windowWidthTooBig && (searchContainerStyling == 'searchContainer')) ? "invisible" : "visible"}`} onClick={handleSearchExpansion}>
          <AiOutlineArrowLeft />
          </button> */}
        <input
          type="text"
          placeholder="Search PhatBlack-Premium..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => {
            setShowDropdown(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => { setShowDropdown(false) }, 200);
            setTimeout(() => { setIsFocused(false) }, 200);
          }}
          className={searchInputStyling}
        />
        <AiOutlineClose className={`clear ${isFocused ? "visible" : "invisible"}`} onClick={() => {
          setSearchTerm(""); setShowDropdown(false);
        }} />
        <button className={searchButtonStyling} onClick={handleSearchExpansion}>
          <FaSearch className="faSearch" />
        </button>
        {showDropdown && (
          <div className="suggestion-dropdown">
            {suggestions
              .filter((suggestion) =>
                suggestion.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="suggestion-dropdown-item"
                  onClick={() => handleSuggestionClick(suggestion.title)}
                >
                  {suggestion.title}
                </div>
              ))}
            {/* Add this conditional rendering */}
            {suggestions.filter((suggestion) =>
              suggestion.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 && searchTerm.length > 0 && (
                <div className="suggestion-dropdown-item">No Results Found</div>
              )}
          </div>
        )}
        {showFilterButton && (
          <div className="filter-button-container">
            <button
              className={filterButtonStyling}
              onClick={() => setShowFilterForm(true)}>
              Filter <FaFilter />
            </button>
          </div>
        )}
        {showFilterForm && (
          <div className="filterform-container">
            <div className="filterform-content">
              <div className="filterform-header">
                <h2>Search</h2>
                <button className="filterform-close" onClick={() => setShowFilterForm(false)}>
                  &times;
                </button>
              </div>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-tv">
                PB-TV
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-radio">
                PB-Radio
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-zine">
                PB-Zine
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-event">
                PB-Event
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-mall">
                PB-Mall
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-gaming">
                PB-Gaming
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-digital">
                PB-Digital
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="PB-Fashion">
                PB-Fashion
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-music">
                PB-Music
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-communities">
                PB-Communities
              </button>
              <button
                className="filterform-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="pb-social">
                PB-Social
              </button>
              <button
                className="filterform-reset-button"
                onClick={(e) => handleApplyFilter(e.target.value)}
                value="default"
              >Reset Filter</button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};


export default Search;