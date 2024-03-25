import Dropdown from "./Dropdown";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

const MenuItems = ({ items, depthLevel }) => {
  // State to manage the dropdown visibility
  const [dropdown, setDropdown] = useState(false);

  // Reference to the dropdown menu
  let ref = useRef();

  useEffect(() => {
    // Function to handle clicks outside the dropdown menu
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    // Add event listeners for clicks and touch events
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    // Cleanup the event listeners when component unmounts
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  // Function to handle mouse entering the menu item
  const onMouseEnter = () => {
    setDropdown(true);
  };

  // Function to handle mouse leaving the menu item
  const onMouseLeave = () => {
    setDropdown(false);
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  // Function to close the dropdown when an item is clicked
  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}

      >
      {items.url && items.submenu ? (
        // Render button with link if there's a submenu
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}>
            <Link to={items.url}>{items.title}</Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          {/* Render the Dropdown component if submenu exists */}
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        // Render button if there's a submenu without a link
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
            {items.title}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          {/* Render the Dropdown component if submenu exists */}
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        // Render a regular link if no submenu
        <Link to={items.url}>{items.title}</Link>
      )}
    </li>
  );
};

export default MenuItems;
