import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const MenuItems = ({ items, depthLevel }) => {
  // State to manage if button clicked
  const [active, setActive] = useState(false);

  // Reference to the menu item
  let ref = useRef();

  useEffect(() => {
    if (active) {
      setActive(false);
    }
  }, [active]);

  const handleClick = () => {
    setActive(true);
  };

  // Function to toggle active state
  const toggleActive = () => {
    setActive((prev) => !prev);
  };

  return (
    <li
      className="menu-items"
      ref={ref}
      onClick={handleClick}
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
  );
};

export default MenuItems;