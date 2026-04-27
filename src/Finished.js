import React from "react";

function Finished({ status, dispatch }) {
  return (
    <div className="finish-screen">
      <h2>Time is out</h2>
      <button className="btn-ui" onClick={() => dispatch({ type: "try" })}>
        Try again
      </button>
    </div>
  );
}

export default Finished;
