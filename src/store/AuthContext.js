import React,{ useState } from "react"
const AuthContext = React.createContext({
    login : () => {},
    logout : () => {},
    isLoggedin : false,
    userEmail : ""
});

export const AuthProvider = (props) => {

    const [userEmail,setUserEmail] = useState(localStorage.getItem("email"));
    const [token,setToken] = useState(localStorage.getItem("token"));

    const isLoggedin = !!token;

    const loginHandler = (token,email) => {
        setToken(token);
        setUserEmail(email);
        localStorage.setItem("token",token);
        localStorage.setItem("email",email);
    }

    const logoutHandler = () => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        alert("Logged out");
    }

    const obj = {
        login : loginHandler,
        logout : logoutHandler,
        isLoggedin : isLoggedin,
        userEmail : userEmail
    }

    return (
        <AuthContext.Provider value={obj}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;