import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "../Styles/ContactUs.css"
import { db } from "../firebaseConfig";
import { addDoc,collection } from "firebase/firestore";
//import emailjs, { sendForm } from '@emailjs/browser';

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
    const [selectedOption, setSelectedOption] = useState("");

    /*
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
    */

    const sendFormData = async(e) => {
        e.preventDefault();
        let recipientEmail;
        let mailLocation;
        switch (selectedOption) {
            case "billing":
                recipientEmail = "billing@phatblack.com";
                mailLocation = "mail-billing"
                break;
            case "media":
                recipientEmail = "media@phatblack.com"
                mailLocation = "mail-media"
                break;
            case "advertisement":
                recipientEmail = "advertising@phatblack.com"
                mailLocation = "mail-advertisement"
                break;
            case "copyright":
                recipientEmail = "copyright@phatblack.com"
                mailLocation = "mail-copyright"
                break;
            case "support":
                recipientEmail = "support@phatblack.com"
                mailLocation = "mail-support"
                break
            case "general":
                recipientEmail= "general@phatblack.com";
                mailLocation = "mail-general"
                break
        }

        try {
            const docRef = await addDoc(collection(db, mailLocation), {
                to: recipientEmail,
                from: email,
                message: {
                    subject: `Case:${selectedOption}`,
                    html: `
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>Phone Number: ${phoneNumber}</p>
                    <p>Message: ${message}</p>
                    `,
                },
            });
            resetForm();
            setShowPopUp(true);
            console.log("Success")
        } catch (error) {
            console.log("Error", error)
        }
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
        <div className="ContactUs-page">
                <div className="Forms-Container">
                    <form ref={form} onSubmit={sendFormData}>
                        <select
                        className="Contact-Us-Input"
                        type="Select-Menu"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option value="">Reason for contacting...</option>
                            <option value="billing">Billing</option>
                            <option value="media">Media</option>
                            <option value="advertisement">Advertisement</option>
                            <option value="copyright">Copyright</option>
                            <option value="support">Support</option>
                            <option value="general">General</option>
                        </select>
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