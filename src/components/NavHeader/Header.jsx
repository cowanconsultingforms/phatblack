import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem("accessToken"));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate('/');
    window.location.reload();
  };

  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          PHATBLACK
        </Link>

        {/* for large screens */}
        <Navbar />

        {/* for small screens */}
        <MobileNav />
      </div>
      {!isAuthenticated ? (
        <div className='Container'>
          <div className='Login'>
            <Link to='/login'><button type='button'>Login</button></Link>
          </div>
          <div className='Sign-up'>
            <Link to='/signup'><button type='button'>Sign up</button></Link>
          </div>
        </div>
      ) : (
        <div className='Container'>
          <button type='button' onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;