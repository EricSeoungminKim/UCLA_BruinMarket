import React, { useState, useRef, useContext } from "react";
import userPool from "../service/userPool";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom";

const Login = ({ changeAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [user, setUser] = useState(null);
  let [cognitoUser, setCognitoUser] = useState("");

  const formRef = useRef();
  const nameRef = useRef();
  const uidRef = useRef();
  const majorRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { authenticate } = useContext(AccountContext); //deconstructioning

  const navigateHome = () => {
    navigate("/");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log("email : ", email, ", password: ", password);

    authenticate(email, password)
      .then((data) => {
        console.log("Logged In!", data);
        navigateHome();
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
  };

  return (
    <div className="Auth-form-container">
      <form ref={formRef} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span
              className="link-primary"
              onClick={() => {
                changeAuthMode("signup");
              }}
            >
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
