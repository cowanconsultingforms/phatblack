import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebaseConfig";
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import Sidebar from "./Sidebar";
import "./Header.css";
import Search from "../Search";
import DropdownMenu from "./ProfileDropdownmenu.jsx"; // Import the DropdownMenu component
import PBPremiumLogo from "../../assets/PHATBLACK.png"
import profileIcon from "../../assets/ProfileIcon.png"
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiYoutubeFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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

  const dumpSesh = () => {
    
  }

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("User authentication state changed:", user);
      setIsAuthenticated(!!user);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          console.log("User role and profile image URL:", userDoc.data().role, userDoc.data().profileImageUrl);
          setRole(userDoc.data().role);
          setProfileImageUrl(userDoc.data().profileImageUrl);
        }
      } else {
        setProfileImageUrl('https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png');
      }
    });
  
    return () => unsubscribe();
  }, []);


  return (
    <header>
      <Sidebar />
      <div className="HeaderContainer">
      <div className="header-media-container">
          <div>
            <a href="https://www.facebook.com/phatblackonline" target="_blank"><RiFacebookCircleFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://twitter.com/phatblackonline" target="_blank"><FaSquareXTwitter className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.youtube.com/@PhatBlack-ex7ow" target="_blank"><RiYoutubeFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.instagram.com/phatblackonline/" target="_blank"><RiInstagramFill className="header-media" /></a>
          </div>
        </div>
      <div className="header-media-container">
          <div>
            <a href="https://www.facebook.com/phatblackonline" target="_blank"><RiFacebookCircleFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://twitter.com/phatblackonline" target="_blank"><FaSquareXTwitter className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.youtube.com/@PhatBlack-ex7ow" target="_blank"><RiYoutubeFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.instagram.com/phatblackonline/" target="_blank"><RiInstagramFill className="header-media" /></a>
          </div>
        </div>
      <div className="nav-area">

        <Link to="/" >
          <img className="logo" src={PBPremiumLogo} alt="PhatBlackLogo" onClick={ dumpSesh } />
        </Link>

        <Search />
        <div className="ProfileIcon">
          <div className="ProfileIconContainer">
          <button className="Profilebutton" onClick={toggleDropdown}>
              <img src={profileImageUrl || profileIcon} alt="Profile Icon"/>
          </button>
          </div>
          {showDropdown && (
            <div ref={dropdownRef} className="menu">
              <DropdownMenu handleLogout={handleLogout} navigate={navigate} role={role} authenticated={isAuthenticated} />
            </div>
          )}
        </div>
        {/* )} */}

      </div>
      {/* for large screens */}
      <Navbar />

      {/* for small screens 
        <MobileNav />
        */}
      </div>  
    </header>
  );
};

export default Header;