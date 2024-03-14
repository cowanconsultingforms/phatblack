import { menuItemsData } from "./menuItemsData";
import MenuItems from "./MenuItems";

const Navbar = () => {
  // Initial depth level for menu items
  const depthLevel = 0;

  return (
    <nav className="desktop-nav">
      {/* Render the desktop navigation */}
      <ul className="menus">
        {/* Map through menu items and render MenuItems component */}
        {menuItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
