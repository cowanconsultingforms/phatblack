import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestionRef = collection(db, "searchData");
        const suggestionQuery = query(suggestionRef, limit(10));
        const querySnapshot = await getDocs(suggestionQuery);
        const suggestionList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSuggestions(suggestionList);
      } catch (error) {
        console.error("Error fetching suggestions: ", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      return;
    }

    const queryTerm = trimmedSearchTerm.toLowerCase();
    navigate(`/search?q=${encodeURIComponent(queryTerm)}`);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion); // Check if this log is printed
    setSearchTerm(suggestion);
    setShowDropdown(false);
  };
  

  return (
    <form className="searchContainer" onSubmit={handleSearch}>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search PhatBlack..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout (() => {setShowDropdown(false)}, 200)}
          className="searchInput"
        />
        <button className="searchButton">
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
          </div>
        )}
      </div>
    </form>
  );
};

export default Search;