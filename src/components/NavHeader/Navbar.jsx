import { menuItemsData } from "./menuItemsData";
import MenuItems from "./MenuItems";
import { useState, useRef } from "react";

const Navbar = () => {
  // Initial depth level for menu items
  const depthLevel = 0;
  const [currentMenuItems, setCurrentMenuItems] = useState(menuItemsData.slice(0,16));
  const [startIndex, setStartIndex] = useState(0);
  const [isNextDisable, setNextDisable] = useState(false);
  const [isPrevDisable, setPrevDisable] = useState(false);  //Initially disable

  //Attributes used to refer to the list and respective buttons
  const menuRef = useRef(null);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null)

  /* Checks to see if list is scrolled all the way to the left,right, 
  or is somewhere in between and adjusts the visibility of buttons accordingly*/
  const handleCheckButtons = () => {
  const scrollThreshold = 10; // Adjust this value as needed

  const { scrollLeft, clientWidth, scrollWidth } = menuRef.current;
  const scrollRemaining = scrollWidth - scrollLeft - clientWidth;

  if (scrollLeft < 10) {
    leftButtonRef.current.style.display = "none";
    menuRef.current.style.webkitMask = "var(--mask1)";
  } else if (scrollRemaining > scrollThreshold) {
    leftButtonRef.current.style.display = "inline";
    rightButtonRef.current.style.display = "inline";
    menuRef.current.style.webkitMask = "var(--mask2)";
  } else {
    rightButtonRef.current.style.display = "none";
    menuRef.current.style.webkitMask = "var(--mask3)";
  }
};

  

  //Handle Next Button Click
  const handleNextClick = () => {


    if(menuRef.current){
      menuRef.current.scrollLeft += 400;
    }

    


    // const newStartIndex = startIndex + 15;
    // const newMenuItems = menuItemsData.slice(newStartIndex, newStartIndex + 15);
    // setCurrentMenuItems(newMenuItems);
    // setStartIndex(newStartIndex);
    // setPrevDisable(false);

    // //Disable next button when reached the end
    // if (newStartIndex + 15 >= menuItemsData.length) {
    //   setNextDisable(true);
    // }
  }

  const handlePrevClick = () => {


    if(menuRef.current){
      menuRef.current.scrollLeft -= 400;
    }
    // const newStartIndex = startIndex - 15;
    // const newMenuItems = menuItemsData.slice(newStartIndex, startIndex);
    // setCurrentMenuItems(newMenuItems);
    // setStartIndex(newStartIndex);
    // setNextDisable(false);

    // //Disables prev button when reached the beginning
    // if (newStartIndex === 0) {
    //   setPrevDisable(true);
    // }
  };

  return (
    <nav className="desktop-nav">
      {/* Render the desktop navigation */}
      <button ref={leftButtonRef} className="arr left" onClick={handlePrevClick} disabled={isPrevDisable}></button>
      <ul ref={menuRef} className="menus" onScroll={handleCheckButtons} >
  
        {/* Map through menu items and render MenuItems component */}
        
        {currentMenuItems.map((menu, index) => (
          <MenuItems items={menu} key={index} depthLevel={depthLevel} />
        ))}
      </ul>
      <button ref={rightButtonRef} className= "arr right" onClick={handleNextClick} disabled={isNextDisable}></button>
    </nav>
  );
};

export default Navbar;