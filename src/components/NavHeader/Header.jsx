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
      <Sidebar />
      <div className="HeaderContainer">
      <div className="header-media-container">
          <div>
            <a href="https://www.facebook.com/phatblackonline"><RiFacebookCircleFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://twitter.com/phatblackonline"><FaSquareXTwitter className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.youtube.com/@PhatBlack-ex7ow"><RiYoutubeFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.instagram.com/phatblackonline/"><RiInstagramFill className="header-media" /></a>
          </div>
        </div>
      <div className="header-media-container">
          <div>
            <a href="https://www.facebook.com/phatblackonline"><RiFacebookCircleFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://twitter.com/phatblackonline"><FaSquareXTwitter className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.youtube.com/@PhatBlack-ex7ow"><RiYoutubeFill className="header-media" /></a>
          </div>
          <div>
            <a href="https://www.instagram.com/phatblackonline/"><RiInstagramFill className="header-media" /></a>
          </div>
        </div>
      <div className="nav-area">

        <Link to="/" >
          <img className="logo" src={PBPremiumLogo} alt="PhatBlackLogo" />
        </Link>

        <Search />
        {/* {!isAuthenticated ? (
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
          </div> */}
        {/* ) : ( */}
        <div className="ProfileIcon">
          <div className="ProfileIconContainer">
            <button className="Profilebutton" onClick={toggleDropdown}><img src={profileIcon}></img></button>
          </div>
          {showDropdown && (<DropdownMenu handleLogout={handleLogout} navigate={navigate} role={role} authenticated={isAuthenticated} />)}
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