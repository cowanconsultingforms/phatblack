import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./routes/Home"
import Eevents from './routes/E-events';
import Egaming from './routes/E-gaming';
import Emall from './routes/E-mall';
import Eradio from './routes/E-radio';
import Etv from './routes/E-tv';
import Ezine from './routes/E-zine';
import PBdigital from './routes/PB-digital';
import PBmusic from './routes/PB-music';
import PBfashion from './routes/PB-fashion';
import DefendersOfHipHop from './routes/Defenders-of-hip-hop';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Eevents />} />
          <Route path="/tv" element={<Etv />} />
          <Route path="/mall" element={<Emall />} />
          <Route path="/radio" element={<Eradio />} />
          <Route path="/zine" element={<Ezine />} />
          <Route path="/gaming" element={<Egaming />} />
          <Route path="/pbdigital" element={<PBdigital />} />
          <Route path="/pbfashion" element={<PBfashion />} />
          <Route path="/pbmusic" element={<PBmusic />} />
          <Route path="/defendersofhiphop" element={<DefendersOfHipHop />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
