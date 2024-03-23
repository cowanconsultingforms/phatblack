import React from "react";
import '../Styles/PbMall.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

function PBmall() {  
    return (
        <div className="pb-mall">
            <Header />
            <Imagemap /> 
            <Bottompage />
        </div>
    );
}


function Imagemap(){
        return(
        <div className = "image-map">
            <a href= "https://phat-black.web.app/mall">
            <img src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="image" className="image"/>
            </a>
            <a href= "https://phat-black.web.app/mall">
            <img src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="map" className="map-image"/>
            </a>
           
        </div>
    );
};
{/* Header and sub headers for the page */}
function Header(){
    return(
    <div className="header-container"> {/* container for header and sub headers */ }
    <h1 className="Header">PB-Mall</h1>
    <div className="subtopics-container">
        <a href= "https://phat-black.web.app/mall">
        <h2 className="Subtopics">Featured </h2>
        </a>
        <a href= "https://phat-black.web.app/mall">
        <h2 className="Subtopics">Clothes</h2>
        </a>
        <a href= "https://phat-black.web.app/mall">
        <h2 className="Subtopics">Accessories</h2>
        </a>
        <a href= "https://phat-black.web.app/mall">
        <h2 className="Subtopics">Home</h2>
        </a>
        <a href= "https://phat-black.web.app/mall">
        <h2 className="Subtopics">Electronics</h2>
        </a>
        <a href= "https://phat-black.web.app/mall">
        <h2 className="Subtopics">Personal Care</h2>
        </a>
        <a href= "https://phat-black.web.app/mall">
        <h2 className="Subtopics">Miscellaneous</h2>
        </a>
        
      {/* Maybe add search bar? Or would it be too much with the general search bar of the website?
      <FontAwesomeIcon icon={faSearch} className="search-icon"> */}
    </div>
</div>
    );
};

{/* Bottom page suggestions and header */}
function Bottompage(){
    return(
        <div className= "bottom-page">
            <div>
            <h2 className= "bottomHeader"> You Might Like</h2>
            </div>
        <div className= "bottom-suggestions">
            <a href= "https://phat-black.web.app/mall">
            <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" alt="image"/>
            </a>
            <a href= "https://phat-black.web.app/mall">
            <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" alt="image"/>
            </a>
            <a href= "https://phat-black.web.app/mall">
            <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" alt="image"/>
            </a>
            <a href= "https://phat-black.web.app/mall">
            <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" alt="image"/>
            </a>
        </div>




        </div>


    );
}



export default PBmall; 