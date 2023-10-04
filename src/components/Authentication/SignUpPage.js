import { useState } from "react";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import SignUpForm from "./SignupForm";

const SignUpPage = () => {
  const history = useHistory();
  // console.log(process.env.REACT_APP_BACKEND_API,"env in signup");

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(email,password) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZmAyELegQIUlAxdcsCJ-P-HtMA5EvRis",{
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData,"fail signup");
        throw new Error(errorData.error.message || 'Something went wrong!');
      }
      history.replace('/login');
      alert("Accouct Created Succesfully!")
    } 
    catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  return (
    <section className={classes.box}>
      <h1>SignUp</h1>
      <SignUpForm submitHandler={submitHandler} isLoading={isLoading} />
    </section>
  );
};
export default SignUpPage;