import { useContext } from "react";
import { Navbar, Button, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CartContext from "../../store/CartContext";
import AuthContext from "../../store/AuthContext";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  // console.log(authCtx.userEmail, "userEmail in navbar comp");
  const userName = authCtx.userEmail && authCtx.userEmail.split("@")[0];
  console.log(userName,"userName")

  const totalQuantity = cartCtx.cartItems.reduce(
    (sum, item) => sum + item.quantity,
  0);

  return (
    <div>
      <Navbar fixed="top" bg="black" variant="dark">
        {!authCtx.isLoggedin && (
          <>
            <Col className="col-5"></Col>
            <Col>
              <Navbar.Brand className="m-5">
                <NavLink to="/login" activeClassName={classes.activeLink} className={classes.navlink} >Login</NavLink>
              </Navbar.Brand>
              <Navbar.Brand className="m-5">
                <NavLink to="/signup" activeClassName={classes.activeLink} className={classes.navlink} >SignUp</NavLink>
              </Navbar.Brand>
            </Col>
          </>
        )}

        {authCtx.isLoggedin && (
          <>
            <Col className="col-4">
              <h4 style={{ color: "white", marginLeft: "50px" }}>
                User : {userName}
              </h4>
            </Col>
            <Col className="col-6">
              <Navbar.Brand className="m-4">
                <NavLink 
                  to="/home" 
                activeClassName={classes.activeLink} 
                className={classes.navlink}
                >
                  HOME
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand className="m-4">
                <NavLink 
                  to="/store" 
                  activeClassName={classes.activeLink} 
                  className={classes.navlink}
                >
                  STORE
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand className="m-4">
                <NavLink 
                  to="/about" 
                  activeClassName={classes.activeLink} 
                  className={classes.navlink}
                >
                  ABOUT
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand className="m-4">
                <NavLink 
                  to="/contact" 
                  activeClassName={classes.activeLink} 
                  className={classes.navlink}
                >
                  CONTACT US
                </NavLink>
              </Navbar.Brand>
            </Col>
            
            <Col className="col-1">
                <Button onClick={props.showCartHandler}>Cart {totalQuantity}</Button>
            </Col>
            <Col className="col-1">
              <NavLink to="/login">
                <Button onClick={authCtx.logout} variant="danger">
                  Logout
                </Button>
              </NavLink>
            </Col>
          </>
        )}
      </Navbar>
    </div>
  );
};

export default NavBar;
