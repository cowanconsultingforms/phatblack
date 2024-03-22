import { menuItemsData } from "./menuItemsData";
import MenuItems from "./MenuItems";
import { useState } from "react";

const Navbar = () => {
  // Initial depth level for menu items
  const depthLevel = 0;
  const [currentMenuItems, setCurrentMenuItems] = useState(menuItemsData.slice(0,15));
  const [startIndex, setStartIndex] = useState(0);
  const [isNextDisable, setNextDisable] = useState(false);
  const [isPrevDisable, setPrevDisable] = useState(true);  //Initially disable

  //Handle Next Button Click
  const handleNextClick = () => {
    const newStartIndex = startIndex + 15;
    const newMenuItems = menuItemsData.slice(newStartIndex, newStartIndex + 15);
    setCurrentMenuItems(newMenuItems);
    setStartIndex(newStartIndex);
    setPrevDisable(false);

    //Disable next button when reached the end
    if (newStartIndex + 15 >= menuItemsData.length) {
      setNextDisable(true);
    }
  }

  const handlePrevClick = () => {
    const newStartIndex = startIndex - 15;
    const newMenuItems = menuItemsData.slice(newStartIndex, startIndex);
    setCurrentMenuItems(newMenuItems);
    setStartIndex(newStartIndex);
    setNextDisable(false);

    //Disables prev button when reached the beginning
    if (newStartIndex === 0) {
      setPrevDisable(true);
    }
  };


  return (
    <nav className="desktop-nav">
      {/* Render the desktop navigation */}
      <button className="arr left" onClick={handlePrevClick} disabled={isPrevDisable}></button>
      <ul className="menus">
  
        {/* Map through menu items and render MenuItems component */}
        
        {currentMenuItems.map((menu, index) => (
          <MenuItems items={menu} key={index} depthLevel={depthLevel} />
        ))}
        
        <button className= "arr right" onClick={handleNextClick} disabled={isNextDisable}></button>
      </ul>
      <button className= "arr right" onClick={handleNextClick} disabled={isNextDisable}></button>
    </nav>
  );
};
export default Navbar;
