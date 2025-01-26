import React from "react";
import MCQCard from "./MCQCard";
import AnagramCard from "./AnagramCard";
import ReadAlongCard from "./ReadAlongCard";
// css is app.css
const QuestionList = ({ questions }) => {
  return (
    <div className="question-list">
      {questions.map((question) => {
        switch (question.type) {
          case "MCQ":
            return <MCQCard key={question._id} question={question} />;
          case "ANAGRAM":
            return <AnagramCard key={question._id} question={question} />;
          case "READ_ALONG":
            return <ReadAlongCard key={question._id} question={question} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default QuestionList;
