import React from "react";
import "./ProfileDropdownmenu.css"


const DropdownMenu = ({ handleLogout, navigate, role, isActive, authenticated }) => {

  return (
    <div>
    {authenticated ? (
      <div className={`dropdown-menu ${isActive ? 'active' : ''}`}>
      <button className="dropdown-item" onClick={() => navigate('/profile')}>
        Profile
      </button>
      {(role === 'admin' || role === 'staff' || role === 'super admin') && (
        <>
          <button className="dropdown-item" onClick={() => navigate('/users')}>
            Admin Panel
          </button>
          <button className="dropdown-item" onClick={() => navigate('/upload')}>
            Upload Media
          </button>
        </>
      )}
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </div>
    ) : (
      <div className={`dropdown-menu guest ${isActive ? 'active' : ''}`}>
      <button className="dropdown-item guest" onClick={() => navigate('/login')}>
        Login
      </button>
      <button className="dropdown-item guest" onClick={() => navigate('/signup')}>
        Sign up
      </button>
    </div>
    )}
    </div>
  );
};

export default DropdownMenu;