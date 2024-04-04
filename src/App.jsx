import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./routes/Home"
import PBevents from './routes/PB-events';
import PBgaming from './routes/PB-gaming';
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
import TestCalls from './routes/TestCalls';
import UserProfile from './routes/UserProfile';
import UploadMedia from './routes/UploadMedia';
import Payment from './routes/Payment';
import Stripe from './routes/Stripe';
import Footer from './components/Footer';
import { useEffect } from 'react';
import CopyRight from './routes/CopyRight';
import PrivacyPolicy from './routes/PrivacyPolicy';
import TermsService from './routes/TermsService';
import Restrictions from './routes/Restrictions';
import EtvComponent from './routes/E-tv-component';

//scrolling to the top of the page whenever entering a new route
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            } />
          <Route path="/pbevents" element={
              <>
                <PBevents/>
                <Footer />
              </>
            } />
          <Route path="/tv" element={
              <>
                <Etv />
                <Footer />
              </>
            } />
            <Route path="/etv/:vidTitle" element={
              <>
                <EtvComponent/>
                <Footer />
              </>
            } />
          <Route path="/pbmall" element={
              <>
                <PBmall />
                <Footer />
              </>
            } />
          <Route path="/radio" element={
              <>
                <Eradio />
                <Footer />
              </>
            } />
          <Route path="/zine" element={
              <>
                <Ezine />
                <Footer />
              </>
            } />
          <Route path="/gaming" element={
              <>
                <PBgaming />
                <Footer />
              </>
            } />
          <Route path="/pbdigital" element={
              <>
                <PBdigital />
                <Footer />
              </>
            } />
          <Route path="/pbfashion" element={
              <>
                <PBfashion />
                <Footer />
              </>
            } />
          <Route path="/pbmusic" element={
              <>
                <PBmusic />
                <Footer />
              </>
            } />
          <Route path="/pbcommunities" element={
              <>
                <PBcommunuties />
                <Footer />
              </>
            } />
          <Route path="/pbsocial" element={
              <>
                <PBsocial />
                <Footer />
              </>
            } />
          <Route path="/defendersofhiphop" element={
              <>
                <DefendersOfHipHop />
                <Footer />
              </>
            } />
          <Route path="/about" element={
              <>
                <About />
                <Footer />
              </>
            } />
          <Route path="/subscribe" element={
              <>
                <Subscribe/>
                <Footer />
              </>
            } />
          <Route path="/faq" element={
              <>
                <FAQ/>
                <Footer />
              </>
            } />
          <Route path="/contactus" element={
              <>
                <ContactUs />
                <Footer />
              </>
            } />
           <Route path="/copyright" element={
              <>
                <CopyRight />
                <Footer />
              </>
            } />
             <Route path="/privacy-policy" element={
              <>
                <PrivacyPolicy />
                <Footer />
              </>
            } />
             <Route path="/terms-of-service" element={
              <>
                <TermsService />
                <Footer />
              </>
            } />
              <Route path="/restrictions" element={
              <>
                <Restrictions />
                <Footer />
              </>
            } />

          {/**Pages that don't need a footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/test-calls" element={<TestCalls />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/upload" element={<UploadMedia />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/stripe/:param" element={<Stripe></Stripe>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App