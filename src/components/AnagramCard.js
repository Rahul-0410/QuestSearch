import React, { useState } from "react";
import "./anagram.css";

const AnagramCard = ({ question }) => {
  const [showSolution, setShowSolution] = useState(false);
  
  const letters = question.blocks.map(block => block.text).join(", ");

  return (
    <div className="anagram-card">
      <div className="card-header">
        <span className="question-type">{question.type}</span>
      </div>
      <h3>{question.title}</h3>
      <div className="letters-container">
        <p className="letters">Letters: {letters}</p>
      </div>
      <div className="solution-section">
        <button 
          onClick={() => setShowSolution(!showSolution)}
          className="show-solution-btn"
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
        {showSolution && (
          <p className="solution">
            Solution: {question.solution}
          </p>
        )}
      </div>
    </div>
  );
};

export default AnagramCard;