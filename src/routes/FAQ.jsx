import React, { useState } from "react";
import { Questions } from "./Questions";
import { Link } from "react-router-dom";
import "../Styles/FAQ.css";

const FAQ = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleTopicClick = (e, topic) => {
        e.preventDefault();
        const targetElement = document.getElementById(topic.topic);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            const windowHeight = window.innerHeight;
            const targetPosition = offsetTop - (windowHeight / 2);
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    

    return (
        <div className="faq-page">
            <h1>Frequently Asked Questions</h1>
            <nav className="faq-navbar">
                <h3>Search by Topic</h3>
                <ul className="faq-grid">
                    {Questions.map((topic, index) => (
                        <li key={index}>
                            <a href={`#${topic.topic}`} onClick={(e) => handleTopicClick(e, topic)}>
                                {topic.topic}
                            </a>
                        </li>
                    ))}

                </ul>
            </nav>
            <div className="faq-container">
                {Questions.map((topic, index) => (
                    <div key={index} className="topic" id={topic.topic}>
                        <h2 className="topic-head">{topic.topic}</h2>
                        <div className="questions">
                            {topic.questions.map((question, qIndex) => (
                                <div key={qIndex} className="question">
                                    <h3>Question: {question.question}</h3>
                                    <p>Answer: {question.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="faq-footer">
                <h3>Can't find an answer? <Link className="faq-header" to="/contactus">Contact Us</Link></h3>
                <h3><Link className="faq-header" to="/restrictions">RESTRICTIONS</Link></h3>
                <h3><Link className="faq-header" to="/terms-of-service">TERMS OF SERVICE</Link></h3>
                <h3><Link className="faq-header" to="/copyright">COPYRIGHT</Link></h3>
                <h3><Link className="faq-header" to="/privacy-policy">PRIVACY POLICY</Link></h3>
            </div>
        </div>
    );
};

export default FAQ;
