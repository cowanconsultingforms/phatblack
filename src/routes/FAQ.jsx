import React from "react";
import { Questions } from "./Questions";
import "../Styles/FAQ.css"

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
        </div>
    )
};

export default FAQ;
