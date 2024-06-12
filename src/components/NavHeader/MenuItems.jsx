import Dropdown from "./Dropdown";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';

const MenuItems = ({ items, depthLevel }) => {
  // State to manage the dropdown visibility
  const [dropdown, setDropdown] = useState(false);

  // State to manage if button clicked
  const [active, setActive] = useState(false);

  // Reference to the dropdown menu
  let ref = useRef();

  useEffect(() => {
    // Close the dropdown when another menu item is clicked
    if (active) {
      setActive(false);
    }
  }, [active]);

  // Function to handle mouse entering the menu item
  const onMouseEnter = () => {
    setDropdown(true);
  };

  // Function to handle mouse leaving the menu item
  const onMouseLeave = () => {
    setDropdown(false);
  };

  const handleClick = () => {
    onClick();
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
    setActive((prev) => !prev);
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
      onClick={handleClick}
    >
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown(!dropdown)}
            className={isActive ? "active" : ""}
          >
            <Link 
              to={items.url} 
            >
              {items.title}
            </Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}
          >
            {items.title}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link 
          to={items.url} 
          className={active ? "active" : ""}
          onClick={() => setActive(true)}
        >
          {items.title}
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
