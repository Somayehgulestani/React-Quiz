// import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function Questions({ questions, answer, dispatch, index, point, time }) {
  const mins = Math.floor(time / 60);
  const second = time % 60;

  const res = questions.map((v) => {
    return v;
  });
  console.log(res);

  return (
    <div className="questions-box">
      <h4>{res[index].question}</h4>
      <div className="score">
        <p>
          Question: {index + 1}/ {questions.length}
        </p>
        <p>Point: {point}</p>
      </div>

      <>
        {res[index].options.map((v, i) => (
          <button
            className="options"
            key={i}
            onClick={() => {
              return dispatch({ type: "setanswer", payload: i });
            }}
          >
            {v}
          </button>
        ))}
      </>
      <div className="time-btn">
        <span className="time">
          {String(mins).padStart(2, "0")}:{String(second).padStart(2, "0")}
        </span>
        {answer !== null && (
          <button
            className="next-btn"
            onClick={() => {
              dispatch({ type: "next", payload: index + 1 });
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Questions;
