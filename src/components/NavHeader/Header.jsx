import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
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
      <div className='Container'>
            <div className='Login'>
              <Link to='/Login'><button type='button'>Login</button></Link>
            </div>
            <div className='Sign-up'>
              <Link to='/Signup'><button type='button'>Sign up</button></Link>
            </div>
        </div>
    </header>
  );
};

export default Header;