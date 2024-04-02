
import React from "react";
import { Questions } from "./Questions";
import "../Styles/FAQ.css"
import { Link } from "react-router-dom";
import { useState } from "react";

const TopicQuestions = ({ questions }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleQuestionClick = (index) => {
        if (index === expandedIndex) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <div>
            {questions.map((question, index) => (
                <div key={index} className="question-container">
                    <div className="question" onClick={() => handleQuestionClick(index)}>
                        <h3>{question.question}</h3>
                        <span className={`arrow ${expandedIndex === index ? "rotate" : ""}`}></span>
                    </div>
                    {expandedIndex === index && (
                        <div className="answer">
                            <p>{question.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const FAQ = () => {
    const [selectedTopic, setSelectedTopic] = useState(Questions[0]);

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    return (
        <div className="faq-page">

            <h1>Frequently Asked Questions</h1>
            <h2>If you can't find the answers you were looking for, please contact us <a href="/contactus">here</a></h2>
            <div className="faq-container">
                <div >
                    <h3>Topics</h3>
                    <ul>
                        {Questions.map((topic, index) => (
                            <li key={index} onClick={() => handleTopicClick(topic)}>
                                {topic.topic}
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedTopic && (
                    <div className="all-questions">
                        <h2>{selectedTopic.topic}</h2>
                        <TopicQuestions questions={selectedTopic.questions} />
                    </div>
                )}
            </div>
            <div className="faq-footer">
                <h3 className="faq-header"><Link to="/restrictions">RESTRICTIONS</Link></h3>
                <h3 className="faq-header"><Link to="/terms-of-service">TERMS OF SERVICE</Link></h3>
                <h3 className="faq-header"><Link to="/copyright">COPYRIGHT</Link></h3>
                <h3 className="faq-header"><Link to="/privacy-policy">PRIVACY POLICY</Link></h3>
            </div>
        </div>

    );
};

export default FAQ;