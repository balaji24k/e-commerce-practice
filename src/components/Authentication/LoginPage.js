import React, { useContext, useState } from "react";
import classes from "./SignUpPage.module.css";
import { Button, Form, Nav } from "react-bootstrap";
import { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import AuthContext from "../../store/AuthContext";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  // console.log(history,"histoty login")
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  }; 

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail === "" || enteredPassword === "") {
      alert("Must fill both Email and Password");
      return;
    } else {
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHSKu9D7nHr91P9s6pTOnfc9y7TeEuxlw",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            // console.log("Login succesfullly");
            return res.json().then((data) => {
              // console.log(data, "data in login");
              authCtx.login(data.idToken, data.email);
              history.replace("/store");
            });;
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication filed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
        })
    }
  };

  return (
    <>
      <h5 className={classes.desclaimer}>
        Disclaimer: This is a demo website and is for Education purposes only.
      </h5>
      <section className={classes.box}>
        <h1>Login</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" ref={emailInputRef} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                ref={passwordInputRef}
              />
              <Button
                className="input-group-append"
                onClick={showPasswordHandler}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </Button>
            </div>
          </Form.Group>

          <div>
            <Button type="submit" variant="primary">Login</Button>
          </div>

          <Nav>
            <NavLink to="signup" style={{ color: "white", paddingTop: "1rem" }}>
              Don't have an Account?
            </NavLink>
          </Nav>
        </Form>
      </section>
    </>
  );
};

export default LoginPage;
