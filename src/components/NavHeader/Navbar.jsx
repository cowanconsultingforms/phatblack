import { menuItemsData } from "./menuItemsData";
import MenuItems from "./MenuItems";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Navbar = () => {
  // Initial depth level for menu items
  const depthLevel = 0;
  const [isNextDisable, setNextDisable] = useState(false);
  const [isPrevDisable, setPrevDisable] = useState(true); // Initially disable

  // Initialize dragX to track drag position
  const dragX = useMotionValue(0);

  //Handle Next Button Click
  const handleNextClick = () => {
    const newX = dragX.get() - 100;
    dragX.set(newX);

    //Disable next button when reached the end
    if (newX <= -1000) {
      setNextDisable(true);
    } else {
      setNextDisable(false);
    }

    //Enable prev button
    setPrevDisable(false);
  };

  const handlePrevClick = () => {
    const newX = dragX.get() + 200;
    dragX.set(newX);

    //Disable prev button when reached the beginning
    if (newX >= 10) {
      setPrevDisable(true);
    } else {
      setPrevDisable(false);
    }

    //Enable next button
    setNextDisable(false);
  };

  // Handle drag end
  const onDragEnd = () => {
    const x = dragX.get();
    const threshold = 1; 

    if (Math.abs(x) > threshold) {
      if (x > 0 && !isPrevDisable) {
        handlePrevClick();
      } else if (x < 0 && !isNextDisable) {
        handleNextClick();
      }
    } else {
      dragX.set(0); 
    }
  };

  return (
    <nav className="desktop-nav">
      {/* Render the desktop navigation */}
        <div className="menu-container">
          <div className="arr-button-container">
            <button className="arr left" onClick={handlePrevClick} disabled={isPrevDisable}/>
          </div>
          <ul className="menus">
            {/* Carousel Content */}
            {menuItemsData.map((menu, index) => (
              <motion.div
                className="carousel-container"
                drag="x"
                dragConstraints={{
                  left: -1100,
                  right: 0,

                }}
                style={{
                  x: dragX
                }}
                onDragEnd={onDragEnd}
              >
                <MenuItems items={menu} key={index} depthLevel={depthLevel} disabled={isPrevDisable}/>
              </motion.div>
            ))}
          </ul>
          <div className="arr-button-container">
              <button className="arr right" onClick={handleNextClick} disabled={isNextDisable}/>
          </div>
        </div> 
    </nav>
  );
};

export default Navbar;