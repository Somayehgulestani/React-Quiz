// import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function Questions({ questions, choice, dispatch, index }) {
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
        <p>Point: 0</p>
      </div>

      <>
        {res[index].options.map((v, i) => (
          <button
            className="options"
            key={i}
            onClick={() => {
              return dispatch({ type: "choice", payload: "" });
            }}
          >
            {v}
          </button>
        ))}
      </>
      {choice !== null && (
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
  );
}

export default Questions;
