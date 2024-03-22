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

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
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

        <Search />

        {!isAuthenticated ? (
          <div className='Container'>
            <Link to='/login'><button className='login' type='button'>Login</button></Link>
            <Link to='/signup'><button className='sign-up' type='button'>Sign up</button></Link>
          </div>
        ) : (
          <div className='Container'>

            {(role == 'admin' || role == 'viewer' || role == 'owner') && <Link to='/users'><button className='login' type='button'>Admin Panel</button></Link>}

            <button className="login" type='button' onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;