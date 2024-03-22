import { menuItemsData } from "./menuItemsData";
import MenuItems from "./MenuItems";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Navbar = () => {
  // Initial depth level for menu items
  const depthLevel = 0;
  const [currentMenuItem, setCurrentMenuItems] = useState(menuItemsData.slice(0,4));
  const [startIndex, setStartIndex] = useState(0);
  const [isNextDisable, setNextDisable] = useState(false);
  const [isPrevDisable, setPrevDisable] = useState(true); // Initially disable

  // Initialize dragX to track drag position
  const dragX = useMotionValue(0);

  //Handle Next Button Click
  const handleNextClick = () => {
    const newStartIndex = startIndex + 4;
    const newMenuItems = menuItemsData.slice(newStartIndex, newStartIndex + 4);
    setCurrentMenuItems(newMenuItems);
    setStartIndex(newStartIndex);
    setPrevDisable(false);

    //Disable next button when reached the end
    if (newStartIndex + 4 >= menuItemsData.length) {
      setNextDisable(true);
    }
  }

  const handlePrevClick = () => {
    const newStartIndex = startIndex - 4;
    const newMenuItems = menuItemsData.slice(newStartIndex, startIndex);
    setCurrentMenuItems(newMenuItems);
    setStartIndex(newStartIndex);
    setNextDisable(false);

    //Disables prev button when reached the beginning
    if (newStartIndex === 0) {
      setPrevDisable(true);
    }
  };

  // Handle drag end
  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -1 && !isNextDisable) {
      handleNextClick();
    } else if (x >= 1 && !isPrevDisable) {
      handlePrevClick();
    }
    dragX.set(0); // Reset drag position
  };

  //
  return (
    <nav className="desktop-nav">
      {/* Render the desktop navigation */}
      <ul className="menus">
        {/* Previous Button */}
        <button className="arr left" onClick={handlePrevClick} disabled={isPrevDisable}></button>
        {/* Carousel Content */}
            {currentMenuItem.map((menu, index) => (
              <motion.div
              className="carousel-container"
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0
              }}
              style={{
                x: dragX
              }}
              onDragEnd={onDragEnd}
            >
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
              </motion.div>
            ))}
        {/* Next Button */}
        <button className="arr right" onClick={handleNextClick} disabled={isNextDisable}></button>
      </ul>
    </nav>
  );
};

export default Navbar;
