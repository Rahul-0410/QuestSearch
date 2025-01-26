import React, { useState } from "react";
import "./mcq.css";

const MCQCard = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  
  const correctAnswer = question.options.find(option => option.isCorrectAnswer)?.text;

  return (
    <div className="mcq-container">
      <div className="mcq-card">
        <div className="mcq-header">
          <span className="question-typemcq">{question.type}</span>
        </div>
        <h3 className="mcq-title">{question.title}</h3>
        <ul className="mcq-options">
          {question.options.map((option, index) => (
            <li key={index} className="mcq-option">
              {option.text}
            </li>
          ))}
        </ul>
        <div className="answer-section">
          <button 
            onClick={() => setShowAnswer(!showAnswer)}
            className="show-answer-btn"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <div className={`answer-wrapper ${showAnswer ? 'show' : ''}`}>
            <p className="answer">
              Correct Answer: {correctAnswer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQCard;