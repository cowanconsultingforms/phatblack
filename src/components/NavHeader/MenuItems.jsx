import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

//index identifies each individual button, active states are stored for each using menuActiveState-${index}

const MenuItems = ({ items, depthLevel, index }) => {
  // Initialize active state for the current menu item
  const [active, setActive] = useState(() => {
    const storedActive = sessionStorage.getItem(`menuActiveState-${index}`);
    return storedActive ? JSON.parse(storedActive) : false;
  });

  // Reference to the menu item
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)
        && event.target.closest('.exclude-container')) {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [active, index]);

  useEffect(() => {
    // Save active state to localStorage whenever it changes
    sessionStorage.setItem(`menuActiveState-${index}`, JSON.stringify(active));
  }, [active, index]); 

  const handleClick = () => {
    setActive(true);
  };

  // Function to toggle active state
  const toggleActive = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="exclude-container">
      <li
        className="menu-items"
        ref={ref}
      >
        {items.url && items.submenu ? (
          <>
            <button
              type="button"
              aria-haspopup="menu"
              className={active ? "active" : ""}
              onClick={toggleActive}
            >
              <Link to={items.url}>
                {items.title}
              </Link>
              {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
            </button>
          </>
        ) : !items.url && items.submenu ? (
          <>
            <button
              type="button"
              aria-haspopup="menu"
              className={active ? "active" : ""}
              onClick={toggleActive}
            >
              {items.title}
              {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
            </button>
          </>
        ) : (
          <Link 
            to={items.url} 
            className={active ? "active" : ""}
            onClick={handleClick}
          >
            {items.title}
          </Link>
        )}
      </li>
    </div>
  );
};

export default MenuItems;