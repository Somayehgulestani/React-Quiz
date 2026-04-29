import React, { useEffect, useReducer } from "react";
import Description from "./Description";
import Header from "./Header";
import Main from "./Main";
import Loader from "./loader";
import Questions from "./Questions";
import Finished from "./Finished";
import Result from "./result";

const intialState = {
  questions: [],
  status: "",
  answer: null,
  index: 0,
  point: 0,
  time: 200,
};

function reducer(state, action) {
  switch (action.type) {
    case "receiveData":
      return { ...state, questions: action.payload, status: "ready" };
    case "loading":
      return { ...state, status: "loading" };
    case "start":
      return { ...state, status: "start" };
    case "setanswer": {
      const correct =
        action.payload === state.questions[state.index].correctOption;
      const questionPoints = state.questions[state.index]?.points || 0;

      return {
        ...state,
        answer: action.payload,
        point: state.point + (correct ? questionPoints : 0),
      };
    }

    case "next":
      return { ...state, index: action.payload, answer: null };

    case "timer":
      return {
        ...state,
        time: state.time - 1,
        status: state.time <= 0 ? "active" : state.status,
      };
    case "try":
      return { ...state, status: "ready", time: 200, index: 0, point: 0 };
    case "result":
      return { ...state, status: "result" };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const { status, questions, answer, index, point, time } = state;

  useEffect(() => {
    const time = setInterval(() => {
      if (status !== "start") return;
      dispatch({ type: "timer" });
    }, 1000);
    return function () {
      clearInterval(time);
    };
  }, [status]);

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
        {status === "start" && questions[index] && (
          <Questions
            questions={questions}
            answer={answer}
            dispatch={dispatch}
            index={index}
            point={point}
            time={time}
            status={status}
          />
        )}
        {status === "active" && (
          <Finished status={status} dispatch={dispatch} />
        )}
        {status === "result" && <Result />}
      </Main>
    </div>
  );
}

export default App;
