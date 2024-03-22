import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebaseConfig";
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import Sidebar from "./Sidebar";
import "./Header.css";
import Search from "../Search";
import DropdownMenu from "./Dropdownmenu.jsx"; // Import the DropdownMenu component

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <header>
      <div className="nav-area">
        <Sidebar />
        <Link to="/" className="logo">
          PHATBLACK
        </Link>

        <Search />

        {!isAuthenticated ? (
          <div className='Container'>
            <Link to='/login'><button className='login' type='button'>Login</button></Link>
            <Link to='/signup'><button className='sign-up' type='button'>Sign up</button></Link>
          </div>
        ) : (
          <div className="ProfileIcon">
            <div className="ProfileIconContainer">
              <button className="Profilebutton" onClick={toggleDropdown}><img src="src/assets/ProfileIcon.png"></img></button>
            </div>
            {showDropdown && (<DropdownMenu handleLogout={handleLogout} navigate={navigate} role={role} />)}
            </div>
        )}
       
      </div>
        {/* for large screens */}
        <Navbar />

        {/* for small screens 
        <MobileNav />
        */}
    </header>
  );
};

export default Header;