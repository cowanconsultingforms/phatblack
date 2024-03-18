import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import Sidebar from "./Sidebar";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <header>
      <div className="nav-area">
        <Sidebar />
        <Link to="/" className="logo">
          PHATBLACK
        </Link>

        {/* for large screens */}
        <Navbar />

        {/* for small screens 
        <MobileNav />
        */}
        {!isAuthenticated ? (
          <div className='Container'>
            <Link to='/login'><button className='login' type='button'>Login</button></Link>
            <Link to='/signup'><button className='sign-up' type='button'>Sign up</button></Link>
          </div>
        ) : (
          <div className='Container'>
            <button className="logout" type='button' onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;