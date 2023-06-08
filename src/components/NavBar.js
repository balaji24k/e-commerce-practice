import { useContext } from "react";
import { Navbar, Button, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CartContext from "../store/CartContext";

const NavBar = () => {

    const cartCtx = useContext(CartContext)

    const totalQuantity = cartCtx.cartItems.reduce((sum,curr)=>{
        return sum+curr.quantity
    },0) 

    return (
        <div>
            <Navbar fixed="top"  bg="black" variant="dark">
                
                {!cartCtx.isLoggedin && (
                <>
                    <Col className="col-5" ></Col>
                    <Col>
                        <NavLink to="/login" >
                            <Navbar.Brand className="m-5">Login</Navbar.Brand>
                        </NavLink>
                        <NavLink to="/signup" >
                            <Navbar.Brand className="m-5">SignUp</Navbar.Brand>
                        </NavLink>
                    </Col>
                </>
                )}
            
                {cartCtx.isLoggedin && (<>
                    <Col className="col-4"></Col>
                    <Col className="col-6">
                        <Navbar.Brand className="m-5" href="#">HOME</Navbar.Brand>
                        <NavLink to="/" >
                            <Navbar.Brand className="m-5">STORE</Navbar.Brand>
                        </NavLink>
                        <Navbar.Brand className="m-5" href="#">ABOUT</Navbar.Brand>
                    </Col>
                    <Col className="col-1">
                        <NavLink to="/cart" >
                            <Button>Cart {totalQuantity}</Button>
                        </NavLink>
                    </Col>
                    <Col className="col-1"> 
                        <NavLink to="/login" >
                            <Button onClick={cartCtx.logout} variant="danger" >Logout</Button> 
                        </NavLink>
                    </Col>
                </>
                )}
            </Navbar>
        </div>
    )
}

export default NavBar;