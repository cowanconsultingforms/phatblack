import React, { useState, useEffect } from "react";
import { Questions } from "./Questions";
import { Link } from "react-router-dom";
import "../Styles/FAQ.css";

const FAQ = () => {
    const [selectedQuestions, setSelectedQuestions] = useState({});

    useEffect(() => {
        const handleScroll = () => {
            const lis = document.querySelectorAll('.faq-grid li');
            const topicHeads = document.querySelectorAll('.topic');
            const viewportTop = window.scrollY;
            const topThreshold = 180; // Adjust this value as needed
            let activeIndex = -1; // Initialize as -1 to track active topic
        
            topicHeads.forEach((head, index) => {
                const isTopicInTopPixels = head.offsetTop <= viewportTop + topThreshold; // Check if top of "topic" is within top threshold
        
                if (isTopicInTopPixels) {
                    activeIndex = index; // Update activeIndex if topic is in top section
                }
            });
        
            lis.forEach((li, index) => {
                li.style.color = index === activeIndex ? 'orange' : 'white'; // Apply orange color to active topic's li, otherwise white
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleTopicClick = (e, topic) => {
        e.preventDefault();
        const targetElement = document.getElementById(topic.topic);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            const targetPosition = offsetTop - 180;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleQuestionClicked = (topicIndex, questionIndex) => {
        setSelectedQuestions(prevState => {
            const newSelectedQuestions = { ...prevState };
            newSelectedQuestions[topicIndex] = questionIndex === newSelectedQuestions[topicIndex] ? null : questionIndex;
            return newSelectedQuestions;
        });
    };

    return (
        <div className="faq-page">
            <h1>FAQ</h1>
            <h2 className="contactus-header">If you cannot find the answers you are looking for here, contact us <Link className="contact-Link" to={"/contactus"}>here</Link></h2>
                <nav className="faq-navbar">
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
                    {Questions.map((topic, topicIndex) => (
                        <div key={topicIndex} className="topic" id={topic.topic}>
                            <h2 className="topic-head">{topic.topic}</h2>
                            <div className="questions">
                                {topic.questions.map((question, questionIndex) => (
                                    <div key={questionIndex} className="questionDiv">
                                        <h3 className="question" onClick={() => handleQuestionClicked(topicIndex, questionIndex)}>
                                        {question.question} <p>{selectedQuestions[topicIndex] === questionIndex ? '▼' : '◀︎'}</p>
                                        </h3>
                                        <p className={selectedQuestions[topicIndex] === questionIndex ? "answerShown" : "answerNotShown"}>
                                            Answer: {question.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            <div className="faq-footer">
                <h3>Can't find an answer? <Link className="faq-header contact" to="/contactus">Contact Us</Link></h3>
                <h3>What are your restrictions? <br /><Link className="faq-header" to="https://phatblack.com/WP/restrictions/">SEE RESTRICTIONS</Link></h3>
                <h3>What are your terms of service? <br /><Link className="faq-header" to="https://phatblack.com/WP/terms-of-service/">SEE TERMS OF SERVICE</Link></h3>
                <h3>What are your copyright rules? <br /><Link className="faq-header" to="https://phatblack.com/WP/copyright/">SEE COPYRIGHT</Link></h3>
                <h3>What is your privacy policy? <br /><Link className="faq-header" to="https://phatblack.com/WP/privacy-policy/">SEE PRIVACY POLICY</Link></h3>
            </div>
        </div>
    );
};

export default FAQ;