import React, { useRef, useState, useEffect } from 'react';
import '../Styles/PBzine.css';
import Carousel from '../components/Carousel';
import barImage from "../assets/bar.jpg";
import cassetteImage from "../assets/cassette.jpg";
import studioImage from "../assets/studio.jpg";
import studioMicImage from "../assets/studiomic.jpg";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import PBzineCard from '../components/PBZineCard';
import { IoAdd } from "react-icons/io5";
import Modal from "../components/Modaledit.jsx";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore"; 
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function Top_content() {

  const [carouselData, setCarouselData] = useState([]);
  const [pbZineCards, setPbZineCards] = useState([
    {
      url: "",
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
        url: carousels[index]?.url || card.url
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
  const [showModal, setShowModal] = useState(false);
  const [newFile, setNewFile] = useState();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const authorRef = useRef(null);

  const toggleModal = (event) => {
    console.log('reched');
    setShowModal(!showModal);
  }

  const handleClose = () => {
    console.log('handle close reached');
    setShowModal(false);
  }

  const chooseFile = (event) => {
      setNewFile(event.target.files[0]);
  }

  const handleEdit = async (event) =>{
    const storage = getStorage();
    const storageRef = ref(storage, `pb-zine/${newFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, newFile);
        const snapshot = await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                null,
                error => reject(error),
                () => resolve(uploadTask.snapshot)
            );
        });

        const url = await getDownloadURL(snapshot.ref);


    const docData = {
      "title": titleRef.current.value,
      "description": descriptionRef.current.value,
      "vendor": authorRef.current.value,
      "likes": 0,
      "dislikes": 0,
      "time_uploaded": Timestamp.now(),
      "views": 0,
      "url": url
    }
    
    try {
      await setDoc(doc(db, "pb-zine", titleRef.current.value), docData);
      window.location.reload();
    } catch (error) {
      console.log(error);
      window.location.reload();
    }

  
  }


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
        <h2 className="header2">PB-Zine 
        <IoAdd onClick={toggleModal} className='addButton'/>
        </h2>
      </div>
      <Modal show={showModal} onClose={handleClose} onSubmit={handleEdit}>
        <label for="title">Title:</label> <br></br>
        <input type="text" id="title" name="title" ref={titleRef}/>
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" ref={descriptionRef}/>
        <label for="vendor">Author:</label>
        <input type="text" id="vendor" name="vendor" ref={authorRef}/>
        <div className="fileChooser">
            <p>Choose File:</p>
            <input type="file" accept=".pdf" onChange={chooseFile}/>
        </div>
      </Modal>
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