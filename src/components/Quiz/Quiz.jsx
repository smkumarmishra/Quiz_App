import React, { useState } from "react";

import "./Quiz.css";
import { data } from "../../assets/data";
import { useRef } from "react";

function Quiz() {
  const [darkMode, setDarkMode] = useState(false);
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  //   using ref ---

  const aRef = useRef(null);
  const bRef = useRef(null);
  const cRef = useRef(null);
  const dRef = useRef(null);

  let opt_array = [aRef, bRef, cRef, dRef];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans == ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);

        opt_array[question.ans.charCodeAt(0) - 97].current.classList.add(
          "correct"
        );
      }
    }
  };

  const next = () => {
    if (lock == true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      opt_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };
  return (
    <>
      <div className={`container ${darkMode ? "dark" : "light"}`}>
        <button 
          className="themeToggle"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <h1>Quiz App</h1>

        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={aRef}
                onClick={(e) => {
                  checkAns(e, "a");
                }}
              >
                {question.a}
              </li>
              <li
                ref={bRef}
                onClick={(e) => {
                  checkAns(e, "b");
                }}
              >
                {question.b}
              </li>
              <li
                ref={cRef}
                onClick={(e) => {
                  checkAns(e, "c");
                }}
              >
                {question.c}
              </li>
              <li
                ref={dRef}
                onClick={(e) => {
                  checkAns(e, "d");
                }}
              >
                {question.d}
              </li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="indexDiv">
              <span>
                {index + 1} of {data.length} Quistion{" "}
              </span>
            </div>
          </>
        )}
        {result ? (
          <>
            {" "}
            <h2>
              Your Scored : {score} Out of {data.length}
            </h2>
            <button onClick={reset}>Reset</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Quiz;
