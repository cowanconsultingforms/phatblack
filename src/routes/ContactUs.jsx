import React from "react";
import { useState } from "react";
//import "../css/ContactUs.css"

function ContactUs() {
    const[name, setName] = useState("");
    const[email,setEmail] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[message, setMessage] = useState("");

    //A placeholder function for now, printing inputs into console log
    const handleSubmit = () => {
        e.preventDefault()
        console.log({name, email, phoneNumber, message});
    }
    return (
        <div>
            <h1 className="Contact-Us-Header">Contact Us</h1>
                <div className="Forms-Container">
                <form>
                    <input
                        className="Contact-Us-Input"
                        type="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        className="Contact-Us-Input"
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        className="Contact-Us-Input"
                        type="phoneNumber"
                        value={phoneNumber}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                    />

                    <textarea
                        className="Contact-Us-Input Contact-Us-Textarea" 
                        type="message"
                        value={message}
                        onChange={(e) =>setMessage(e.target.value)}
                        placeholder="Enter A Message..."
                    ></textarea>
                    <button className="Contact-Us-Button"onClick={handleSubmit}>Send Message</button>
                </form>
                </div>
        </div>
    );
};

export default ContactUs; 