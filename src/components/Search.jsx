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

    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    //focused state for conditionally rendering X icon for clearing search
    const [isFocused, setIsFocused] = useState(false);
    const [showFilterButton, setShowFilterButton] = useState(false);
    const [showFilterForm, setShowFilterForm] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
    
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
            let suggestionRef;
            if (filterSearch === 'all') {
              suggestionRef = collection (db, 'searchData')
            } else {
            switch(filterSearch) {

              case "pb-tv":
                suggestionRef = collection(db, "pb-tv");
                break;

              case "pb-radio":
                suggestionRef = collection(db, "pb-radio");
                break;
              
              case "pb-zine":
                suggestionRef = collection(db, "pb-zine");
                break;

              case "pb-events":
                suggestionRef = collection(db, "pb-events");
                break;
              
              case "pb-mall":
                suggestionRef = collection(db, "pb-mall");
                break;
              
              case "pb-gaming":
                suggestionRef = collection(db, "pb-gaming");
                break;

              case "pb-digital":
                suggestionRef = collection(db, "pb-digital");
                break;

              case "pb-fashion":
                suggestionRef = collection(db, "pb-fashion");
                break;
              
              case "pb-music":
                suggestionRef = collection(db, "pb-music");
                break;

              case "pb-communities":
                suggestionRef = collection(db, "pb-communities");
                break;
              
              case "pb-social":
                suggestionRef = collection(db, "pb-social");
                break;
              {/*Add more options here */}

              default:
                suggestionRef = collection(db, "searchData");
            }
            }

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

    const handleApplyFilter = (filtervalue) => {
      setFilterSearch(filtervalue);
      setTimeout(setShowFilterForm(false), 100);
    }

    const handleFilterChange = (filtervalue) => {
      setFilterSearch(filtervalue);
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
              setTimeout(() => { setIsFocused(false);},200);
              }}
            className={searchInputStyling}
          />
            <AiOutlineClose className={`clear ${isFocused ? "visible" : "invisible" }`} onClick={()=>{
            setSearchTerm(""); setShowDropdown(false);
            }}/>
          <button className={searchButtonStyling} onClick= {handleSearchExpansion}>
            <FaSearch className="faSearch" />
          </button>
          {showDropdown && (
            <div className="suggestion-dropdown">
               <FilterTabs
                onFilterChange={handleFilterChange}
                visible={showDropdown}
              />
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
                    className="filter-button"
                    onClick={() => setShowFilterForm(true)}>
                      Filter <FaFilter/>
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
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-tv">
                        PB-TV
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-radio">
                        PB-Radio
                      </button>
                      <button 
                      className="filterform-button"
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-zine">
                        PB-Zine
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-events">
                        PB-Events
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-mall">
                        PB-Mall
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-gaming">
                        PB-Gaming
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-digital">
                        PB-Digital
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="PB-Fashion">
                        PB-Fashion
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-music">
                        PB-Music
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-communities">
                        PB-Communities
                      </button>
                      <button
                      className= "filterform-button" 
                      onClick = {(e) => handleApplyFilter(e.target.value)}
                      value="pb-social">
                        PB-Social
                      </button>
                      <button
                      className="filterform-reset-button"
                      onClick = {(e) => handleApplyFilter(e.target.value)}
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