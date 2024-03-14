import { useState } from "react";
import { Link } from "react-router-dom";
import MobileDropdown from "./MobileDropdown";

const MobileMenuItems = ({ items, depthLevel, showMenu, setShowMenu }) => {
  // State to manage the dropdown visibility
  const [dropdown, setDropdown] = useState(false);

  // Function to close the dropdown
  const closeDropdown = () => {
    dropdown && setDropdown(false);
    showMenu && setShowMenu(false);
  };

  // Function to toggle the dropdown visibility
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdown((prev) => !prev);
  };

  return (
    <li className="menu-items" onClick={closeDropdown}>
      {/* Check if the menu item has both URL and submenu */}
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
            {/* Link to the URL with closeDropdown handler */}
            <Link to={items.url} onClick={closeDropdown}>
              {items.title}
            </Link>
            {/* Arrow icon to toggle the dropdown */}
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? (
                <span className="arrow-close" />
              ) : (
                <span className="arrow" />
              )}
            </div>
          </button>
          {/* Render the MobileDropdown component with submenu */}
          <MobileDropdown
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
            aria-expanded={dropdown ? "true" : "false"}>
            {/* Display the menu title */}
            {items.title}{" "}
            {/* Arrow icon to toggle the dropdown */}
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? (
                <span className="arrow-close" />
              ) : (
                <span className="arrow" />
              )}
            </div>
          </button>
          {/* Render the MobileDropdown component with submenu */}
          <MobileDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        // Render a link for items without submenu
        <Link to={items.url}>{items.title}</Link>
      )}
    </li>
  );
};

export default MobileMenuItems;
