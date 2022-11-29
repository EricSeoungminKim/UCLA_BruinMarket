import React, { useState, useRef, useContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "../service/userPool";
import Signup from "./Signup";
import Login from "./Login";
import VerifyEmail from "./VerifyEmail";
import { Account } from "./Account";
import Status from "../components/Status";

const Auth = ({ onAdd }) => {
  let [authMode, setAuthMode] = useState("signin");
  let [cognitoUser, setCognitoUser] = useState("");
  let [user, setUser] = useState(null);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const changeAuthMode = (mode) => {
    setAuthMode(mode);
    // setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  // const { name, uid, major, email, password } = useState(""); //deconstructioning
  const formRef = useRef();
  const nameRef = useRef();
  const uidRef = useRef();
  const majorRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const vcodeRef = useRef();

  return (
    <Account>
      {authMode === "signin" && <Login changeAuthMode={changeAuthMode} />}
      {authMode === "signup" && (
        <Signup
          onAdd={onAdd}
          changeAuthMode={changeAuthMode}
          setUser={setUser}
          setCognitoUser={setCognitoUser}
        />
      )}
      {authMode === "verifyEmail" && (
        <VerifyEmail
          onAdd={onAdd}
          currentUser={user}
          cognitoUser={cognitoUser}
        />
      )}
    </Account>
  );
};

export default Auth;