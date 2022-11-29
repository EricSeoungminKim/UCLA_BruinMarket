import React, { useState, useRef } from "react";
import userPool from "../service/userPool";
import { useNavigate } from "react-router-dom";

const Signup = ({ onAdd, changeAuthMode, setUser, setCognitoUser }) => {
  const [errors, setErrors] = useState([{}]);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [validEmailForamt, setValidEmailFormat] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  let [authMode, setAuthMode] = useState("signup");

  const nameRef = useRef();
  const uidRef = useRef();
  const majorRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  // const checkFields = (event) => {
  //   /**check for empty fields */
  //   let errorList = [];
  //   /**check for confirmpassword match with password */
  // if (passwordRef.current.value !== confirmPasswordRef.current.value) {
  //   errorList.push({ confirmPassword: "Passwords don't match!" });
  // }
  //   setErrors(errorList);
  //   console.log("errorList : ", errorList);

  //   if (errorList.length === 0) {
  //     onSubmit(event);
  //   } else {
  //     console.log("errorList.length !== 0, errorList : ", errorList);
  //   }
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    // checkFields();

    const user = {
      id: Date.now(), //uuid
      name: nameRef.current.value || "",
      uid: uidRef.current.value || "",
      major: majorRef.current.value || "",
      email: emailRef.current.value || "",
      // password: passwordRef.current.value || "",
    };

    let passedAllRequirements = true;

    if (
      user.name === "" ||
      user.uid === "" ||
      user.major === "" ||
      user.email === "" ||
      passwordRef.current.value === ""
    ) {
      setIsEmpty(true);
      passedAllRequirements = false;
    } else {
      setIsEmpty(false);
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setPasswordMatch(false);
      passedAllRequirements = false;
    } else {
      setPasswordMatch(true);
    }

    if (!passedAllRequirements) return;

    setPasswordMatch(true);
    setUser(user);
    console.log("@signup, setting user: ", user);

    userPool.signUp(
      emailRef.current.value,
      passwordRef.current.value,
      [],
      null,
      (err, data) => {
        if (err) {
          console.log("err.name: ", err.name);
          if (err.name === "UsernameExistsException") {
            setDuplicateEmail(true);
          } else {
            setDuplicateEmail(false);
          }
          if (err.name == "InvalidParameterException") {
            setValidEmailFormat(false);
          } else {
            setValidEmailFormat(true);
          }
          if (err.name == "InvalidPasswordException") {
            setValidPassword(false);
          } else {
            setValidPassword(true);
          }
          return console.error(err);
        }

        changeAuthMode("verifyEmail");
        setCognitoUser(data.user);
      }
    );
  };
  console.log("before return, errors : ", errors);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary"
              onClick={() => {
                changeAuthMode("signin");
              }}
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name*</label>
            <input
              ref={nameRef}
              type="text"
              className="form-control mt-1"
              placeholder="e.g. Your Name"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>UID*</label>
            <input
              ref={uidRef}
              type="text"
              className="form-control mt-1"
              placeholder="e.g. 000000000 (MUST BE 9 DIGITS)"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Major*</label>
            <input
              ref={majorRef}
              type="text"
              className="form-control mt-1"
              placeholder="e.g. Computer Science"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address*</label>
            <input
              ref={emailRef}
              type="text"
              className="form-control mt-1"
              placeholder="e.g. letsgetA@gmail.com"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password*</label>
            <input
              ref={passwordRef}
              type="password"
              className="form-control mt-1"
              placeholder="**Password**"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password*</label>
            <input
              ref={confirmPasswordRef}
              type="password"
              className="form-control mt-1"
              placeholder="**Password**"
              required
            />
            {!passwordMatch && (
              <span className="errorMessage">
                Your password doesn't match.
                <br />
              </span>
            )}
            {isEmpty && (
              <span className="errorMessage">
                Please fill out all the informations above.
                <br />
              </span>
            )}
            {duplicateEmail && (
              <span className="errorMessage">
                This is email is already in use.
                <br />
              </span>
            )}
            {!validEmailForamt && (
              <span className="errorMessage">
                Incorrect Email Information. Please Check It Again.
                <br />
              </span>
            )}
            {!validPassword && (
              <span className="errorMessage">
                Doesn't Satisfy Password Requirement. Please Check the
                Requirements Below.
                <br />
                At least 8 characters
                <br />
                At least 1 number
                <br />
                At least 1 speacial character (e.g. !, @, ~)
                <br />
                At least 1 upper case letter and 1 lower case letter.
              </span>
            )}
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

export default Signup;
