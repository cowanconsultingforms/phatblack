import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "../Styles/ContactUs.css"
import emailjs from '@emailjs/browser';

function ContactUs() {
    const[name, setName] = useState("");
    const[email,setEmail] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[message, setMessage] = useState("");
    const form = useRef();
    const InitialPlaceHolders = {
        name: 'Name',
        email : 'Email',
        phone: 'Phone Number',
        message: 'Enter a message...'
    };
    const [placeHolders, setPlaceHolders] = useState(InitialPlaceHolders);
    const [showPopUp, setShowPopUp] = useState(false);

    //import service id, template id, service key for emailjs
    const serviceID = import.meta.env.VITE_APP_SERVICE_ID;
    const templateID = import.meta.env.VITE_APP_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;
    
    //Using emailjs, allows users to send a message to email
    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs
        .sendForm(serviceID, templateID, form.current, {
            publicKey: publicKey,
        })
        .then(
            () => {
                console.log("Success!");
                resetForm();
                setShowPopUp(true);
            },
            (error) => {
                console.log("Failed!", error.text)
            },
        );
    };

    //Resets form to original placeholder value 
    const resetForm = () => {
        form.current.reset();
        setName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
        setPlaceHolders(InitialPlaceHolders);
      };

      const closePopUp = () => {
        setShowPopUp(false);
      }

    return (
        <div>
            <h1 className="Contact-Us-Header">Contact Us</h1>
                <div className="Forms-Container">
                    <form ref={form} onSubmit={sendEmail}>
                        <input
                            className="Contact-Us-Input"
                            type="name"
                            value={name}
                            name= "name"
                            onChange={(e)=>setName(e.target.value)}
                            placeholder={placeHolders.name}
                        />
                        <input
                            className="Contact-Us-Input"
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder={placeHolders.email}
                        />
                        <input
                            className="Contact-Us-Input"
                            type="phoneNumber"
                            value={phoneNumber}
                            name= "phoneNumber"
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            placeholder={placeHolders.phone}
                        />

                        <textarea
                            className="Contact-Us-Input Contact-Us-Textarea" 
                            type="message"
                            value={message}
                            name= "message"
                            onChange={(e) =>setMessage(e.target.value)}
                            placeholder={placeHolders.message}
                        ></textarea>
                        <button className="Contact-Us-Button" type="submit">Send Message</button>
                    </form>
                </div>
                {showPopUp && (
                    <div className= "popup-container">
                        <div className="popup-content">
                            <h2>Message Sent Successfully!</h2>
                            <p>Allow 24 hours for a response</p>
                            <button className="close-popup" onClick={closePopUp}>Close</button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ContactUs; 