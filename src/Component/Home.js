import React from "react";

function Home(props) {
  const myFun = () => {
    props.socket.emit("Hello", "Test");
  };
  myFun();
  return <div>Home</div>;
}

export default Home;
