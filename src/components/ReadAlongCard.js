import React from "react";
import './read.css';

const ReadAlongCard = ({ question }) => {
  return (
    <div className="read-along-card">
      <div className="card-header">
        <span className="question-typeread">{question.type}</span>
      </div>
      <h3>{question.title}</h3>
    </div>
  );
};

export default ReadAlongCard;