import MenuItems from "./MenuItems";

/**
 * Dropdown Component
 * Renders a dropdown menu with submenus.
 * @param {Object[]} submenus - Array of submenu items.
 * @param {boolean} dropdown - Flag to determine whether the dropdown is open.
 * @param {number} depthLevel - Depth level of the dropdown.
 */
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  // Increment the depth level for nested dropdowns
  depthLevel = depthLevel + 1;

  // Determine the class for the dropdown based on depth level
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  // Render the dropdown menu
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;