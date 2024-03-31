import React from "react";
import { Nav } from "./components";

export default (props) => {
  return (
    <main>
      <Nav />
      <div className="container"> {props.children}</div>
    </main>
  );
};
