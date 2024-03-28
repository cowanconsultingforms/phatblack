import React, { useState } from "react";
import "./ProfileDropdownmenu.css"
import { AiOutlineClose } from "react-icons/ai";

const DropdownMenu = ({ handleLogout, navigate, role, isActive, authenticated }) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div className={`${active ? "hidden" : null}`}>
      {authenticated ? (
        <div className={`dropdown-menu ${isActive ? 'active' : ''}`}>
          <AiOutlineClose className="close-profile" onClick={()=>setActive(!active)}></AiOutlineClose>
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
          <AiOutlineClose className="close-login" onClick={()=>setActive(!active)}></AiOutlineClose>
        <button className="dropdown-item guest" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="dropdown-item guest" onClick={() => navigate('/signup')}>
          Sign up
        </button>
      </div>
      )}
      </div>
    </div>
  );
};

export default DropdownMenu;