import React from "react";
import { useState } from "react";
import { QuizData } from "../Data/QuizData";
import QuizResult from "./QuizResult";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const changeQuestion = () => {
// next pe click hone k baad first of all SCORE UPDATE krte hai 
    updateScore();
// next pe click krne pe first of all ye condition paas krna pdega
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
// jbb next pe click krne k baad new question ayega toh set kr denge option ko 0
      setClickedOption(0);
    } else {
          
      setShowResult(true);
    }
  };

  const updateScore = () => {
    if (clickedOption === QuizData[currentQuestion].answer) 
    setScore(score + 1);
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };
  

  return (
    <div>
      <p className="heading-txt">QUIZ APP</p>
      <div className="container">
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={QuizData.length}
            tryAgain={resetAll}
          />
        ) : (
          <>
            <div className="question">
              <span id="question-number"> {currentQuestion + 1}.</span> 
              {/* becoz currentQuestion = 0 at initial stage, btt we have to strat with 1 */}
              <span id="question">{QuizData[currentQuestion].question}</span>
            </div>

            <div className="option-container">
              {QuizData[currentQuestion].options.map((option, i) => {
                return (
                  <button
                    //       className="option-btn"
                    className={`option-btn ${
                      clickedOption === i + 1 ? "checked" : null
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                    // ye hme click hone pe clicked index provide krega
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value="Next"
              id="next-button"
              onClick={changeQuestion}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
