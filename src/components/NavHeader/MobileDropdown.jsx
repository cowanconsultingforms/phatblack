import MobileMenuItems from "./MobileMenuItems";

const MobileDropdown = ({ submenus, dropdown, depthLevel }) => {
  // Increment the depth level for nested dropdowns
  depthLevel = depthLevel + 1;
  
  // Determine the CSS class for the dropdown
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return (
    // Render the dropdown menu with appropriate classes based on dropdown state
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {/* Map over each submenu item and render a MobileMenuItems component */}
      {submenus.map((submenu, index) => (
        <MobileMenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default MobileDropdown;
