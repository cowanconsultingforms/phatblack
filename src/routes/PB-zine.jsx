import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import '../Styles/PBzine.css';
import speakerImage from "../assets/redpants-radio.jpg";
import Carousel from '../components/Carousel';
import barImage from "../assets/bar.jpg";
import cassetteImage from "../assets/cassette.jpg";
import studioImage from "../assets/studio.jpg";
import recordsImage from "../assets/records.jpg";
import studioMicImage from "../assets/studiomic.jpg";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import PBzineCard from '../components/PBZineCard';

function Top_content() {

  const [carouselData, setCarouselData] = useState([]);
  const [pbZineCards, setPbZineCards] = useState([
    {
      url: recordsImage,
      title: "",
      text: "",
      alt: "Records image",
      link: `details`
    },
    {
      url: barImage,
      title: "",
      text: "",
      alt: "Bar Image",
      link: `details`
    },
    {
      url: cassetteImage,
      title: "",
      text: "",
      alt: "Cassettes Image",
      link: `details`
    },
    {
      url: studioImage,
      title: "",
      text: "",
      alt: "Studio Image",
      link: `details`
    },
    {
      url: studioMicImage,
      title: "",
      text: "",
      alt: "Studio Mic Image",
      link: `details`
    },
  ])
  const fetchCarousel = async () => {
    try {
      const carouselCollection = collection(db, "zine-carousel");
      const z = query(carouselCollection);
      const querySnapshot = await getDocs(z);
      const carousels = querySnapshot.docs.map(doc => doc.data());
      setCarouselData(carousels);

      const updatedPbZineCards = pbZineCards.map((card, index) => ({
        ...card,
        title: carousels[index]?.title || card.title,
        text: carousels[index]?.subtitle || card.subtitle,
      }));

      setPbZineCards(updatedPbZineCards);
      setCarouselData(carousels);
    } catch (error) {
      console.error("Error fetching e-zine content", error);
    }
  }

  useEffect(() => {
    fetchCarousel();
  }, []);
  



  const handleClick = (url) => { // this function is used to open a new tab when the user clicks on the image
    window.location.href = url;
  }

  return (
    <div className='pb-zine'>
      <div className='news-pictures'>
        <Carousel items={pbZineCards} carouselData={carouselData}/>
      </div>
    </div>
  )

}

// content that appears after the news thumbnails
function Bottom_content() {

  const auth = getAuth();
  const [subscribed, setSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [ezineContent, setEzineContent] = useState([]);

  useEffect(() => {
    const getUserRole = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
          setIsLoggedIn(true);
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists() && ['admin', 'staff', 'super admin', 'premium_user', 'partner', 'client', 'vendor'].includes(userDoc.data().role)) {
            setSubscribed(true);
          } else {
            setSubscribed(false);
          }
        } else {
          setIsLoggedIn(false);
          setSubscribed(false);
        }
      });
    };

    const fetchEzine = async () => {
      try {
        const etvVideosCollection = collection(db, "pb-zine");
        const q = query(etvVideosCollection);
        const querySnapshot = await getDocs(q);
        const zines = querySnapshot.docs.map(doc => doc.data());
        setEzineContent(zines);

      } catch (error) {
        console.error("Error fetching e-zine content", error);
      }
    };

    fetchEzine();

    getUserRole();

  }, [auth]);

  return (
    <div className='pbzine-page'>
      <div className='header2-container'>
        <h2 className="header2">PB-Zine</h2>
      </div>
      <div className="subscribed-content">
        {ezineContent.map((zine, index) => (
          <PBzineCard
            col={'pbzine'}
            key={index}
            src={zine.url}
            title={zine.title}
            vendor={zine.vendor}
            timeuploaded={zine.time_uploaded.toDate()}
            views={zine.views}
            id={zine.id}
            zine={zine}
          />
        ))}
      </div>
    </div>
  )
}

export default function PBzine() {
  return (
    <div className="background-page">
      <div> <Top_content /> </div>
      <div> <Bottom_content /> </div>
    </div>
  );
}