import React from "react";

const Home = (props) => {
  return (
    <div>
      <h2>Welcome to the {props.name}'s Home Page</h2>
      <p>This is the main landing page of the application.</p>
    </div>
  );
}

export default Home;