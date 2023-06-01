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
                
                <Col className="col-4"></Col>
                <Col className="col-7">
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
                    
            </Navbar>
        </div>
    )
}

export default NavBar;