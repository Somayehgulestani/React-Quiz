import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function Description({ questions, dispatch }) {
  return (
    <div className="description">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} Questions to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}

export default Description;
