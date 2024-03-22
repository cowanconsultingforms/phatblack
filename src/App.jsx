import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./routes/Home"
import Eevents from './routes/E-events';
import Egaming from './routes/E-gaming';
import PBmall from './routes/PB-mall';
import Eradio from './routes/E-radio';
import Etv from './routes/E-tv';
import Ezine from './routes/E-zine';
import PBdigital from './routes/PB-digital';
import PBmusic from './routes/PB-music';
import PBfashion from './routes/PB-fashion';
import DefendersOfHipHop from './routes/Defenders-of-hip-hop';
import About from './routes/About'
import Subscribe from './routes/Subscribe';
import Header from './components/NavHeader/Header';
import ContactUs from './routes/ContactUs';
import PBcommunuties from './routes/PB-communities';
import PBsocial from './routes/PB-social'
import SignUp from './routes/Signup';
import Login from './routes/Login';
import FAQ from './routes/FAQ';
import SearchResults from './components/SearchResults';
import UsersList from './routes/UsersList';
import UserProfile from './routes/Profile';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Eevents />} />
          <Route path="/tv" element={<Etv />} />
          <Route path="/pbmall" element={<PBmall />} />
          <Route path="/radio" element={<Eradio />} />
          <Route path="/zine" element={<Ezine />} />
          <Route path="/gaming" element={<Egaming />} />
          <Route path="/pbdigital" element={<PBdigital />} />
          <Route path="/pbfashion" element={<PBfashion />} />
          <Route path="/pbmusic" element={<PBmusic />} />
          <Route path="/pbcommunities" element={<PBcommunuties />} />
          <Route path="/pbsocial" element={<PBsocial />} />
          <Route path="/defendersofhiphop" element={<DefendersOfHipHop />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/profile" element={<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App