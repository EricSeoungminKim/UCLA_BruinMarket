import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserRepository from "./service/user_repository";
import { firebaseApp } from "./service/firebase";

const userRepository = new UserRepository(firebaseApp);

ReactDOM.render(
  <React.StrictMode>
    <App userRepository={userRepository} />
  </React.StrictMode>,
  document.getElementById("root")
);
