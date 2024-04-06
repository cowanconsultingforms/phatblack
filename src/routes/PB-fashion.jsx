import React from "react";
import "../Styles/PB-fashion.css"
import Barimage from "../assets/bar.jpg"
import redpants from "../assets/redpants-radio.jpg"
import model from "../assets/model.jpg"
import gathering from "../assets/gathering.jpg"
import { CiCircleCheck } from "react-icons/ci";


function PBfashion() {
    return (
        <div className="pbfashion-page">
            <div className="Top-Featured">
                <div className="Featured-Info">
                    <h4>Place holder</h4>
                    <h1>his is where the caption for the daily trends will go</h1>
                    <h3>Name of author(s)</h3>
                    <h4>PhatBlack.com</h4>
                </div>
                <div className="Featured-Image">
                    <img className = "Image" src={Barimage} alt="barimage" />
                </div>
            </div>
            <hr />
            <h1>FASHION</h1>
            <hr />
            <div className="Fashion">
                <div className="Current-Popular-Item">
                    <div className="BigOne">
                        <img className="Pop-Image" src={Barimage} alt="barimage" />
                        <h2>Title</h2>
                        <p>Here is something about the article that you might like.</p>
                        <h4>Author</h4>
                    </div>
                    <div className="Side">
                        <div className="SideContainer">
                            <img className="Small-Pop-Image" src={Barimage} alt="barimage" />
                            <div className="Small-text">
                                <h3>Title</h3>
                                <p>Here is something about the article that you might like.</p>
                                <h5>Author</h5>
                            </div>
                        </div>
                        <div className="SideContainer">
                            <img className="Small-Pop-Image" src={Barimage} alt="barimage" />
                            <div className="Small-text">
                                <h3>Title</h3>
                                <p>Here is something about the article that you might like.</p>
                                <h5>Author</h5>
                            </div>
                        </div>
                        <div className="SideContainer">
                            <img className="Small-Pop-Image" src={Barimage} alt="barimage" />
                            <div className="Small-text">
                                <h3>Title</h3>
                                <p>Here is something about the article that you might like.</p>
                                <h5>Author</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="Middle-Subscribe">
                <CiCircleCheck className="svg"/><h2>Get Unlimited Access to Exclusive content only on PhatBlack.com </h2><button className="Subscribe">SUBSCRIBE</button>
            </div>
            <hr />
            <div className="Fashion-Articles">
                <div className="Article-1">
                    <img className="Article-Image" src={Barimage} alt="barimage" />
                    <h3>Title</h3>
                    <h5>Author</h5>
                </div>
                <div className="Article-2">
                    <img className="Article-Image" src={Barimage} alt="barimage" />
                    <h3>Title</h3>
                    <h5>Author</h5>
                </div>
                <div className="Article-3">
                    <img className="Article-Image" src={Barimage} alt="barimage" />
                    <h3>Title</h3>
                    <h5>Author</h5>
                </div>
                <div className="Article-4">
                    <img className="Article-Image" src={Barimage} alt="barimage" />
                    <h3>Title</h3>
                    <h5>Author</h5>
                </div>
                <div className="Article-5">
                    <img className="Article-Image" src={Barimage} alt="barimage" />
                    <h3>Title</h3>
                    <h5>Author</h5>
                </div>
                <div className="Article-6">
                    <img className="Article-Image" src={Barimage} alt="barimage" />
                    <h3>Title</h3>
                    <h5>Author</h5>
                </div>
            </div>
            <div className="Beauty"></div>
                <div className="Cover">
                    <div className="Cover-Image">
                        <img src={model} alt="redpants" />
                    </div>
                    <div className="Cover-text">
                        <h4>Beauty</h4>
                        <h2>Amazing Beauty Products</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <h4>By John</h4>
                    </div>
                </div>
                <div className="Beauty-Articles">
                    <div className="Beauty-Article-1">
                        <img className="Beauty-Article-Image" src={Barimage} alt="barimage" />
                        <h3>Title</h3>
                        <h5>Author</h5>
                    </div>
                    <div className="Beauty-Article-2">
                        <img className="Beauty-Article-Image" src={Barimage} alt="barimage" />
                        <h3>Title</h3>
                        <h5>Author</h5>
                    </div>
                    <div className="Beauty-Article-3">
                        <img className="Beauty-Article-Image" src={Barimage} alt="barimage" />
                        <h3>Title</h3>
                        <h5>Author</h5>
                    </div>
                </div>
            <hr />
            <h1>CULTURE</h1>
            <hr />
            <div className="Culture">
                <div className="Culture-Container">
                    <img src={redpants} alt="barimage" />
                    <h1>Title</h1>
                    <h2>Discription</h2>
                    <h3>Author</h3>
                </div>    
                <div className="Culture-Side">
                    <div className="Culture-SideContainer">
                        <img className="Culture-Small-Pop-Image" src={Barimage} alt="barimage" />
                        <div className="Culture-Small-text">
                            <h3>Title</h3>
                            <p>Here is something about the article that you might like.</p>
                            <h5>Author</h5>
                        </div>
                    </div>
                    <div className="Culture-SideContainer">
                        <img className="Culture-Small-Pop-Image" src={Barimage} alt="barimage" />
                        <div className="Culture-Small-text">
                            <h3>Title</h3>
                            <p>Here is something about the article that you might like.</p>
                            <h5>Author</h5>
                        </div>
                    </div>
                    <div className="Culture-SideContainer">
                        <img className="Culture-Small-Pop-Image" src={Barimage} alt="barimage" />
                        <div className="Culture-Small-text">
                            <h3>Title</h3>
                            <p>Here is something about the article that you might like.</p>
                            <h5>Author</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Celebrities">
                <div>
                    <img src={gathering} alt="gathering" />
                    <h1>Name of Celeb</h1>
                </div>
                <div>
                    <img src={gathering} alt="gathering" />
                    <h1>Name of Celeb</h1>
                </div>
                <div>
                    <img src={gathering} alt="gathering" />
                    <h1>Name of Celeb</h1>
                </div>
                <div>
                    <img src={gathering} alt="gathering" />
                    <h1>Name of Celeb</h1>
                </div>
                <div>
                    <img src={gathering} alt="gathering" />
                    <h1>Name of Celeb</h1>
                </div>
                <div>
                    <img src={gathering} alt="gathering" />
                    <h1>Name of Celeb</h1>
                </div>
                <div>
                    <img src={gathering} alt="gathering" />
                    <h1>Name of Celeb</h1>
                </div>
            </div>       
        </div>
    )
};

export default PBfashion; 