import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </HashRouter>
);
