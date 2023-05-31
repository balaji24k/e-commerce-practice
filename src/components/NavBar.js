import { Navbar, Button, Col } from "react-bootstrap";
const NavBar = () => {
    return (
        <div>
            <Navbar fixed="top"  bg="black" variant="dark">
                
                <Col className="col-4"></Col>
                <Col className="col-7">
                    <Navbar.Brand className="m-5" href="#">HOME</Navbar.Brand>
                    <Navbar.Brand className="m-5" href="#">STORE</Navbar.Brand>
                    <Navbar.Brand className="m-5" href="#">ABOUT</Navbar.Brand>
                </Col>
                <Col className="col-1">
                    <Button>Cart</Button>
                </Col>
                    
            </Navbar>
        </div>
    )
}

export default NavBar;