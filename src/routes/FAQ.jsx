import React from "react";
import { Questions } from "./Questions";
import "../Styles/FAQ.css"
import {Link } from "react-router-dom";

function FAQ() {
    return (
        <div className="faq-page">
            <h1 className="faq-head">Frequently asked Questions</h1>
            <ul className="question-container">
                {Questions.map((item, index) => (
                    <li className='question' key={index}>
                        <h3>Question: {item.question}</h3>
                        <p>Answer: {item.answer}</p>
                    </li>
                ))}
            </ul>
            <div className="faq-footer">
                <h3 className="faq-header"><Link to="/restrictions">RESTRICTIONS</Link></h3>
                <h3 className="faq-header"><Link to="/terms-of-service">TERMS OF SERVICE</Link></h3>
                <h3 className="faq-header"><Link to="/copyright">COPYRIGHT</Link></h3>
                <h3 className="faq-header"><Link to="/privacy-policy">PRIVACY POLICY</Link></h3>

        </div>
        </div>
    )
};

export default FAQ;