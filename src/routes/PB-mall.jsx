import React from "react";
import { Link } from "react-router-dom";
import '../Styles/PbMall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Carousel from "../components/Carousel";
import carouselItem1 from "../assets/ClothesExample1.jpeg";
import carouselItem2 from "../assets/ClothesExample2.jpeg";
import carouselItem3 from "../assets/ClothesExample3.jpeg";
import mensImage from "../assets/mensClothes.jpeg";
import womensImage from "../assets/womensClothes.png";


const mallCarouselItems = [
    {
        url: carouselItem1,
        title: "Live Jazz",
        text: "Social event: Live Jazz at...",
        alt: "Live Jazz Event image",
        link: `Clothes Example`
    },
    {
        url: carouselItem2,
        title: "Neon Night",
        text: "Neon Night: Neon DJ set on friday night at...",
        alt: "Neon DJ Image",
        link: `Clothes Example`
    },
    {
        url: carouselItem3,
        title: "Hip Hop Night",
        text: "Hip Hop Night: Listen and dance to the hottest hip hop songs out at...",
        alt: "Night DJ Image",
        link: `Clothes Example`
    },
];

function PBmall() {
    return (
        <div className="pb-mall">
            <Header />
            <Imagemap />
            <Carousel items={mallCarouselItems} className="carousel"></Carousel>
            <Bottompage />
        </div>
    );
}


function Imagemap() {
    return (
        <div className="image-map">
            <Link to="/pbmall" className="image-map-cards">
                <img src={mensImage} alt="image" className="image" />
            </Link>
            <Link to="/pbmall" className="image-map-cards">
                <img src={womensImage} alt="image" className="image" />
            </Link>
        </div>
    );
};

{/* Header and sub headers for the page */ }
function Header() {
    return (
        <>
            <h1 >PB-Mall</h1>
            <div className="header-container"> {/* container for header and sub headers */}

                <div className="subtopics-container">
                    <a href="/pbmall">
                        <h2 className="Subtopics">Home</h2>
                    </a>
                    <a href="/pbmall">
                        <h2 className="Subtopics">Featured</h2>
                    </a>
                    <a href="/pbmall">
                        <h2 className="Subtopics">Clothes</h2>
                    </a>
                    <a href="/pbmall">
                        <h2 className="Subtopics">Accessories</h2>
                    </a>
                    <a href="/pbmall">
                        <h2 className="Subtopics">Electronics</h2>
                    </a>
                    <a href="/pbmall">
                        <h2 className="Subtopics">Personal Care</h2>
                    </a>
                    <a href="/pbmall">
                        <h2 className="Subtopics">Miscellaneous</h2>
                    </a>

                    {/* Maybe add search bar? Or would it be too much with the general search bar of the website?
      <FontAwesomeIcon icon={faSearch} className="search-icon"> */}
                </div>
            </div>
        </>

    );
};

{/* Bottom page suggestions and header */ }
function Bottompage() {
    return (
        <div className="bottom-page">
            <div>
                <h2 className="bottomHeader"> You May Also Like</h2>
            </div>
            <div className="bottom-suggestions">
                <a href="/pbmall/Clothes Example">
                    <img src={carouselItem1} alt="image" />
                </a>
                <a href="/pbmall/Clothes Example">
                    <img src={carouselItem1} alt="image" />
                </a>
                <a href="/pbmall/Clothes Example">
                    <img src={carouselItem1} alt="image" />
                </a>
                <a href="/pbmall/Clothes Example">
                    <img src={carouselItem1} alt="image" />
                </a>
            </div>




        </div>


    );
}



export default PBmall; 