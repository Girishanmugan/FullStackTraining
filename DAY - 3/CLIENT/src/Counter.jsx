import React from "react";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
    return (
    <>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
    );
}

export default Counter;