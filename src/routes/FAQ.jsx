import React, { useState } from "react";
import { Questions } from "./Questions";
import { Link } from "react-router-dom";
import "../Styles/FAQ.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import nycVideo from "../assets/nyc.mp4";


const FAQ = () => {
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [expandedTopicIndex, setExpandedTopicIndex] = useState(null);

  const handleTopicClick = (topicIndex) => {
    setExpandedTopicIndex(prevIndex => prevIndex === topicIndex ? null : topicIndex);
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
    <div className="faq-page" style={{position: 'relative', overflow: 'hidden'}}>
      <video
        className="faq-bg-video"
        src={nycVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1
        }}
      />

      <div className="faq-container">
        <div className="faq-qa-section">
          <h1 className="faq-title">FAQ</h1>
          {Questions.map((topic, topicIndex) => (
            <div key={topicIndex} className="topic" id={topic.topic}>
              <h2
                className={`topic-head ${expandedTopicIndex === topicIndex ? "active" : ""}`}
                onClick={() => handleTopicClick(topicIndex)}
              >
                {topic.topic} {" "}
                <span className="arrow">
                  {expandedTopicIndex === topicIndex ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </span>
              </h2>
              {expandedTopicIndex === topicIndex && (
                <p className="faq-answer-text">
                  {topic.questions[0]?.answer}
                </p>
              )}
            </div>
          ))}
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
      </div>
    </div>
  );
};

export default FAQ;