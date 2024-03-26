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
import DropdownMenu from "./ProfileDropdownmenu.jsx"; // Import the DropdownMenu component
import PBPremiumLogo from "../../assets/PhatBlackLogo.png"
import profileIcon from "../../assets/ProfileIcon.png"

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
          <img src={PBPremiumLogo} alt="PhatBlackLogo" />
        </Link>

        <Search />

        {!isAuthenticated ? (
          <div className="ProfileIcon">
          <div className="ProfileIconContainer">
          <button className="Profilebutton" onClick={toggleDropdown}><img src={profileIcon}/></button>
          </div>
          {showDropdown && (
              <div className="menu">
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Sign up</button></Link>
              </div>
          )}
          </div>
        ) : (
          <div className="ProfileIcon">
            <div className="ProfileIconContainer">
              <button className="Profilebutton" onClick={toggleDropdown}><img src={profileIcon}></img></button>
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