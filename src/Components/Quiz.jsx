import React, { useState } from "react";
import "../Assets/Styles/Quiz.css";
import { QuestionsAndAnswers } from "../Constants/data";

const Quiz = () => {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [Answer1, setAnswer1] = useState("");
  const [Answer2, setAnswer2] = useState("");
  const [Answer3, setAnswer3] = useState("");

  const optionClicked = (option) => {

    if (currentQuestion === 0) {
      setAnswer1(option.text);
    } else if (currentQuestion === 1) {
      setAnswer2(option.text);
    } else {
      setAnswer3(option.text);
    }

    if (option.isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < QuestionsAndAnswers.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
  };

  return (
    <>
      {showResults ? (
        <div className="quiz">
          <h1 className="questionnumber">Results</h1>
          <h3 className="questionheader">
            {score} out of {QuestionsAndAnswers.length} correct - (
            {(score / QuestionsAndAnswers.length) * 100}%)
          </h3>
          <button
            type="button"
            className="btn btn-danger restart"
            onClick={() => restartGame()}
          >
            Restart
          </button>
        </div>
      ) : (
        <div className="quiz">
          <h1 className="questionnumber">
            Question: {currentQuestion + 1} out of {QuestionsAndAnswers.length}
          </h1>
          <h3 className="questionheader">
            {QuestionsAndAnswers[currentQuestion].text}
          </h3>
          <div>
            {QuestionsAndAnswers[currentQuestion].options.map((option) => {
              return (
                <button
                  type="button"
                  key={option.id}
                  className="btn btn-outline-success"
                  style={{ margin: "40px" }}
                  onClick={() => optionClicked(option)}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-light back"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0 ? true : false}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-success submit"
            onClick={() => setShowResults(true)}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-light next"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={
              currentQuestion === QuestionsAndAnswers.length - 1 ? true : false
            }
          >
            Next
          </button>
        </div>
      )}
      <div className="reviewanswers">
        <div className="questionsandanswers">
          <div id="answer-0">
            <h1 className="heading1">{Answer1 === "" ? "" : "Answer 1"}</h1>
            <h3 className="heading2">{Answer1}</h3>
          </div>
          <div id="answer-1">
            <h1 className="heading1">{Answer2 === "" ? "" : "Answer 2"}</h1>
            <h3 className="heading2">{Answer2}</h3>
          </div>
          <div id="answer-2">
            <h1 className="heading1">{Answer3 === "" ? "" : "Answer 3"}</h1>
            <h3 className="heading2">{Answer3}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
