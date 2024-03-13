import React, { useEffect, useRef, useState } from "react";
import { menuItemsData } from "./menuItemsData";
import MobileMenuItems from "./MobileMenuItems";

const MobileNav = () => {
  // Initial depth level for menu items
  const depthLevel = 0;

  // State to manage the visibility of the mobile menu
  const [showMenu, setShowMenu] = useState(false);

  // Ref for detecting clicks outside the mobile menu
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (showMenu && ref.current && !ref.current.contains(event.target)) {
        // Close the menu if clicked outside
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [showMenu]);

  return (
    <nav className="mobile-nav">
      {/* Button to toggle the mobile menu */}
      <button
        className="mobile-nav__menu-button"
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}>
        Menu
      </button>

      {/* Render the mobile menu if showMenu is true */}
      {showMenu && (
        <ul className="menus" ref={ref}>
          {/* Map through menu items and render MobileMenuItems component */}
          {menuItemsData.map((menu, index) => {
            return (
              <MobileMenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default MobileNav;
