import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { organisation } from "./shared/data";
import { generateHeirarchy } from "./shared/generateHeirarchy";
import "./App.css";

const App = () => {
  const [data, setData] = useState([<div></div>]);

  useEffect(() => setData(generateHeirarchy(organisation)), []);
  return (
    <div className="container">
      <ToastContainer />
      <p className="heading">Organisation Hierarchy</p>
      {data}
      <hr />
    </div>
  );
};

export default App;
