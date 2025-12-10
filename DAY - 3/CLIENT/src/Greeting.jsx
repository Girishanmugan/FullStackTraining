import React from "react";

function Greeting(props) {
  return (
    <div>
      <h2>Greetings, {props.name}!</h2>
      <p>We're glad to have you here.</p> 
    </div>
  )
}

export default Greeting;