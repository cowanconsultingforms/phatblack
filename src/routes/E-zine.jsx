import React, { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import '../Styles/Ezine.css';
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
import EzineCard from '../components/EzineCard';

//array of images/slides for carousel
const eZineCards = [
  {
    url: recordsImage,
    title: "Records",
    text: "Records Image",
    alt: "Records image",
    link: `details`
  },
  {
    url: barImage,
    title: "Bar",
    text: "Bar Image",
    alt: "Bar Image",
    link: `details`
  },
  {
    url: cassetteImage,
    title: "Cassettes",
    text: "Cassettes Image",
    alt: "Cassettes Image",
    link: `details`
  },
  {
    url: studioImage,
    title: "Studio",
    text: "Studio Image",
    alt: "Studio Image",
    link: `details`
  },
  {
    url: studioMicImage,
    title: "Studio Mic",
    text: "Studio Mic Image",
    alt: "Studio Mic Image",
    link: `details`
  },
];

export default function Ezine() {
  return (
    <div className="background-page">
      <div> <News_pictures /> </div>
      <div> <Bottom_content /> </div>
    </div>
  );
}

const handleClick = (url) => { // this function is used to open a new tab when the user clicks on the image
  window.location.href = url;
}

//displays the news images on middle of the page
function News_pictures() {

  return (
    <div className='news-pictures'>
      <Carousel items={eZineCards}></Carousel>
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
        const etvVideosCollection = collection(db, "e-zine");
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
    <div className='ezine-page'>
      <div className='header2-container'>
        <h2 className="header2">E-Zine</h2>
      </div>
      {!subscribed ?
        <div className="image-container">
          <a onClick={() => handleClick('https://phatblack.com')}>
            <img className='Bottom-image' src={speakerImage} alt="Subscribe now!" />
          </a>
          <div className="lockSymbol">
            <FaLock />
            <div className="subOnly">Subscribers only</div>
          </div>
        </div>
        :
        <div className="subscribed-content">
          {ezineContent.map((zine, index) => (
                    <EzineCard
                        key={index}
                        src={zine.url}
                        title={zine.title}
                        vendor={zine.vendor}
                        timeuploaded={zine.time_uploaded.toDate()}
                        views={zine.views}
                    />
                ))}
        </div>
      }
    </div>
  );
}