import React, { useState, useRef, useContext, useEffect } from "react";
import userPool from "../service/userPool";
import { useNavigate } from "react-router-dom";

const VerifyEmail = ({ onAdd, currentUser, cognitoUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [authMode, setAuthMode] = useState("signup");

  const formRef = useRef();
  const nameRef = useRef();
  const uidRef = useRef();
  const majorRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const vcodeRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    console.log("cognitoUser : ", cognitoUser);
  });

  const navigateHome = () => {
    navigate("/");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let verificationCode = vcodeRef.current.value;
    // console.log("verificationCode : ", verificationCode);

    cognitoUser.confirmRegistration(
      verificationCode,
      true,
      function (err, result) {
        if (err) {
          alert(err);
          return;
        }

        alert("Verified! Please Log-In Again!");
        onAdd(currentUser);
        // console.log("user: ", user);
        navigateHome();
      }
    );
  };

  return (
    <div className="Auth-form-container">
      <form ref={formRef} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Email Verification</h3>
          <div className="form-group mt-3">
            <label>Verification Code</label>
            <br />
            <span>We have sent a verification code to your email.</span>
            <br />
            <span>{currentUser.email}</span>
            <input
              ref={vcodeRef}
              type="text"
              className="form-control mt-1"
              placeholder="Type your verification code here."
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

export default VerifyEmail;
