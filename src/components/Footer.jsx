import React from "react";
import { FiMapPin} from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { RiFacebookCircleFill } from "react-icons/ri";
import { RiTwitterFill } from "react-icons/ri";
import { RiYoutubeFill } from "react-icons/ri";
import { RiInstagramFill } from "react-icons/ri";
import "../Styles/Footer.css";

function Footer() {

    function handleOnClick() {
        window.location.href = "/subscribe"
    }

    return (
        <footer className="footer-container">
            <div className="footer-banner">
                <div>
                    <h2>UPCOMING EVENTS AND SPECIAL OFFERS</h2>
                    <h1>GET WEEKLY NEWSLETTER</h1>
                </div>
                <div className="footer-subscribe">
                    <button onClick={handleOnClick}>Subscribe Now</button>
                </div>
            </div>

            <div className="footer-contents">
                <div className="footer-about">
                    <h1>PHATBLACK</h1>
                    <p>
                        <strong>Explore</strong>
                    </p>
                    <p>
                        <strong>About Us</strong>: Learn about our mission, vision, and the values that drive our dedication to urban culture.
                    </p>
                    <p>
                        <strong>Podcasts</strong>: Immerse yourself in the diverse sounds of the city with our range of exclusive audio and video podcasts.
                    </p>
                    <p>
                        <strong>Events</strong>: Stay on top of the hottest urban events around the globe and experience culture as it happens.
                    </p>
                    <p>
                        <strong>Fashion</strong>: Get the latest on urban fashion trends, from streetwear to high-end designer insights.
                    </p>
                    <div className="footer-media-container">
                        <div>
                            <a href="https://www.facebook.com/phatblackonline"><RiFacebookCircleFill className="footer-media"/></a>
                        </div>
                        <div>
                            <a href="https://twitter.com/phatblackonline"><RiTwitterFill className="footer-media"/></a>
                        </div>
                        <div>
                            <a href="https://www.youtube.com/@PhatBlack-ex7ow"><RiYoutubeFill className="footer-media" /></a>
                        </div>
                        <div>
                            <a href="https://www.instagram.com/phatblackonline/"><RiInstagramFill className="footer-media"/></a>
                        </div>
                    </div>
                    

                </div>
                <div className="footer-contact">
                    <h1>CONTACT US</h1>
                    <p>
                        Contact Us: Have questions? Reach out to our support team for assistance.
                    </p>
                    <p>
                        <strong>FAQs</strong>: Find answers to commonly asked questions and helpful tips for navigating our content.
                    </p>
                    <p>
                        <strong>Privacy Policy</strong>: Your privacy matters. Learn how we protect and use your information.
                    </p>
                    <p>
                        <strong>Terms of Service</strong>: Understand the terms that guide our services and your use of Phatblack.com.
                    </p>
                    <h1>LOCATION</h1>
                    <div>
                        <FiMapPin className='contact-icon' />
                        <a href="https://www.google.com/maps/search/?api=1&query=29+Buffalo+Avenue,+Brooklyn,+NY+11233"
                            target="_blank">29 Buffalo Avenue, Brooklyn, NY 11233</a>
                    </div>

                    <div>
                        <FiPhone className="contact-icon" />
                        <a href="tel:1-877-732-3492">1-877-732-3492</a>
                    </div>
                    <div>
                        <FiMail className="contact-icon" />
                        <a href="mailto:info@phatblack.com">info@phatblack.com</a>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <p>Copyright 2023. All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer; 