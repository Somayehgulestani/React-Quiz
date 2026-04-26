import React, { useEffect, useReducer } from "react";
import Description from "./Description";
import Header from "./Header";
import Main from "./Main";
import Loader from "./loader";
import Questions from "./Questions";

const intialState = {
  questions: [],
  status: "",
  choice: null,
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receiveData":
      return { ...state, questions: action.payload, status: "ready" };
    case "loading":
      return { ...state, status: "loading" };
    case "start":
      return { ...state, status: "start" };
    case "choice":
      return { ...state, choice: action.payload };
    case "next":
      return { ...state, index: action.payload, choice: null };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const { status, questions, choice, index } = state;

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchData() {
      const res = await fetch("http://localhost:8000/questions");
      const data = await res.json();
      dispatch({ type: "receiveData", payload: data });
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <Description questions={questions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <Questions
            questions={questions}
            choice={choice}
            dispatch={dispatch}
            index={index}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
