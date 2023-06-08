import React, { useContext } from "react";
import classes from "./SignUpPage.module.css";
import { Button, Form, Nav } from "react-bootstrap";
import { useRef } from "react";
import {NavLink, useHistory } from "react-router-dom";
import CartContext from "../store/CartContext";


const LoginPage = () => {
  const cartCtx = useContext(CartContext)

  const history = useHistory();
  const emailInpurRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInpurRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail === "" || enteredPassword === "") {
      alert("Must fill both Email and Password");

    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDljpu_v-1l_h4NikNjiqjupbGNJBBxg90",
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
          console.log("Login succesfullly");
          alert("Login succesful");
          history.replace("/");
          return res.json();
        } 
        else {
          return res.json().then((data) => {
            // console.log(data);
            let errorMessage = "Authrntication filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      })
      .then(data => {
        console.log(data,"data");
        cartCtx.login(data.idToken,data.email);
      })
    }
  };

  return (
    <section className={classes.box}>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Email</Form.Label>
          <Form.Control type="text" placeholder="Email" ref={emailInpurRef} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>

        <div>
          <Button variant="success pl-2" type="submit">
            Sign in
          </Button>
        </div>

        <Nav>
          <NavLink to="signup" style={{ color: "white", paddingTop: "1rem" }}>
            Don't have an Account?
          </NavLink>
        </Nav>
      </Form>
    </section>
  );
};

export default LoginPage;