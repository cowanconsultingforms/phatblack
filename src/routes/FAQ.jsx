import React, { useState } from "react";
import { Questions } from "./Questions";
import { Link } from "react-router-dom";
import "../Styles/FAQ.css";
import newBackground from "../assets/DeviceBackground.jpg";


const FAQ = () => {
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  const handleTopicClick = (topicIndex) => {
    setExpandedTopics((prevExpandedTopics) => ({
      ...prevExpandedTopics,
      [topicIndex]: !prevExpandedTopics[topicIndex],
    }));
  };

  const handleQuestionClicked = (topicIndex, questionIndex) => {
    setSelectedQuestions((prevSelectedQuestions) => ({
      ...prevSelectedQuestions,
      [topicIndex]:
        questionIndex === prevSelectedQuestions[topicIndex]
          ? null
          : questionIndex,
    }));
  };

  return (
    <div className="faq-page">
      <img className="backgroundImage" src={newBackground} alt="Device Background" />

      <h1 className="faq-title">FAQ</h1>
      <div className="faq-container">
        {Questions.map((topic, topicIndex) => (
          <div key={topicIndex} className="topic" id={topic.topic}>
            <h2
              className={`topic-head ${
                expandedTopics[topicIndex] ? "active" : ""
              }`}
              onClick={() => handleTopicClick(topicIndex)}
            >
              {topic.topic}{" "}
              <span className="arrow">
                {expandedTopics[topicIndex] ? "▼" : "▶"}
              </span>
            </h2>
            <div
              className={`questions ${
                expandedTopics[topicIndex] ? "expanded" : ""
              }`}
            >
              {topic.questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className={`questionDiv ${
                    selectedQuestions[topicIndex] === questionIndex
                      ? "expanded"
                      : ""
                  }`}
                  onClick={() => handleQuestionClicked(topicIndex, questionIndex)}
                >
                  <h3>
                    {question.question}{" "}
                    <span className="arrow">
                      {selectedQuestions[topicIndex] === questionIndex ? "▼" : "▶"}
                    </span>
                  </h3>
                  <p
                    className={
                      selectedQuestions[topicIndex] === questionIndex
                        ? "answerShown"
                        : "answerNotShown"
                    }
                  >
                    Answer: {question.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    <div className="faq-footer">
        <h3>
          Can't find an answer?{" "}
          <Link target="_blank" className="faq-header contact" to="/contactus">
            Contact Us
          </Link>
        </h3>
        <h3>
          What are your restrictions? <br />
          <Link target="_blank"
            className="faq-header"
            to="https://phatblack.com/WP/restrictions/"
          >
            SEE RESTRICTIONS
          </Link>
        </h3>
        <h3>
          What are your terms of service? <br />
          <Link target="_blank"
            className="faq-header"
            to="https://phatblack.com/WP/terms-of-service/"
          >
            SEE TERMS OF SERVICE
          </Link>
        </h3>
        <h3>
          What are your copyright rules? <br />
          <Link target="_blank"
            className="faq-header"
            to="https://phatblack.com/WP/copyright/"
          >
            SEE COPYRIGHT
          </Link>
        </h3>
        <h3>
          What is your privacy policy? <br />
          <Link target="_blank"
            className="faq-header"
            to="https://phatblack.com/WP/privacy-policy/"
          >
            SEE PRIVACY POLICY
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default FAQ;