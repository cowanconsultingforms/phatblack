import React from "react";
import { useState } from "react";
import "../css/ContactUs.css"

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
            <h1>Contact Us</h1>
                <div className="Forms-Container">
                <form>
                    <input
                        type="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="phoneNumber"
                        value={phoneNumber}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                    />

                    <textarea
                        type="message"
                        value={message}
                        onChange={(e) =>setMessage(e.target.value)}
                        placeholder="Enter A Message..."
                    ></textarea>
                    <button onClick={handleSubmit}>Send Message</button>
                </form>
                </div>
        </div>
    );
};

export default ContactUs; 