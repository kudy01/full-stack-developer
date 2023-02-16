import React from "react";

import { organisation } from "./shared/data";
import { generateHeirarchy } from "./shared/generateHeirarchy";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <p className="heading">Organisation Hierarchy</p>
      {generateHeirarchy(organisation)}
      <hr />
    </div>
  );
};

export default App;
