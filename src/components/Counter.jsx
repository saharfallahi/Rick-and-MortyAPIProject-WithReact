import { useReducer, useState } from "react";

const initialState = 10;

function countReducer(state, { type, payload = 0 }) {

  switch (type) {
    case "inc": {
      return state + payload;
    }
    case "dec": {
      return state - payload;
    }
    case "reset": {
      return initialState;
    }
    default:
      return state;
  }
}
export default function Counter() {
  const [count, dispatch] = useReducer(countReducer, initialState);
  //   const [count, setCount] = useState(initialState);
  const handleInc = () => {
    dispatch({ type: "inc", payload: 5 });
  };
  const handleDec = () => {
    dispatch({ type: "dec", payload: 5 });
  };
  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div style={{ color: "white" }}>
      <div>count : {count}</div>
      <div>
        <button style={{ color: "white", padding: "1rem" }} onClick={handleInc}>
          +
        </button>
        <button
          style={{ color: "white", padding: "1rem" }}
          onClick={handleReset}
        >
          reset
        </button>
        <button style={{ color: "white", padding: "1rem" }} onClick={handleDec}>
          {" "}
          -
        </button>
      </div>
    </div>
  );
}
