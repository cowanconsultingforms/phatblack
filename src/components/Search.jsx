import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../Styles/Search.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchContainerStyling, setSearchContainerStyling] = useState('searchContainer');
    const [searchBarStyling, setSearchBarStyling] = useState('searchBar');
    const [searchInputStyling, setSearchInputStyling] = useState('searchInput');
    const [searchButtonStyling, setSearchButtonStyling] = useState('searchButton');

    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    //focused state for conditionally rendering X icon for clearing search
    const [isFocused, setIsFocused] = useState(false);
    
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
    };

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
              setTimeout(() => { setIsFocused(false)},200);
              }}
            className={searchInputStyling}
          />
          {searchTerm === "" ? null : (
            <AiOutlineClose className={`clear ${isFocused ? "visible" : "invisible" }`} onClick={()=>{
            setSearchTerm("");
            }}/>
          )}
          <button className={searchButtonStyling} onClick= {handleSearchExpansion}>
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
            <div className="suggestion-dropdown-item">{setShowDropdown(false)}</div>
          )}
        </div>
          )}
        </div>
      </form>
      );
    };


export default Search;