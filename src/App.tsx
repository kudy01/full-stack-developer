import React, { useEffect, useState } from "react";

import { organisation } from "./shared/data";
import { generateHeirarchy } from "./shared/generateHeirarchy";
import "./App.css";

const App = () => {
  const [data, setData] = useState([<div></div>]);

  useEffect(() => setData(generateHeirarchy(organisation)), []);
  return (
    <div className="container">
      <p className="heading">Organisation Hierarchy</p>
      {data}
      <hr />
    </div>
  );
};

export default App;
