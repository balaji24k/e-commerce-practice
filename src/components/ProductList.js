import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./ProductList.module.css"
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { NavLink } from "react-router-dom";

const ProductList = () => {

    const products = [
        {
          title: "Album 1",
      
          price: 100,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
        },
        
      
        {
          title: "Album 2",
      
          price: 50,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
        },
      
        {
          title: "Album 3",
      
          price: 70,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
        },
      
        {
          title: "Album 4",
      
          price: 100,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
        },
    ];

    const cartCtx = useContext(CartContext);

    return (
        <div>
            <h1 className={classes.heading}>The Generics</h1>
            <h1 style={{textAlign:"center", fontFamily:"fantasy", marginTop:"40px"}} >Music</h1>
            <Container style={{width:"800px"}} className={classes.productBox}>
                <Row>
                {products.map( product => (
                    <Col key={product.title} className="col-6">
                            <div className={classes.item}>
                                <h4>{product.title}</h4>
                                <img width="250px" src={product.imageUrl} alt="Not Loaded"/>
                                <div className={classes.childItem}>
                                    <h5>${product.price}</h5>
                                    <Button onClick={cartCtx.addtoCart.bind(null, product)} variant="success">Add to cart </Button>
                                </div>
                            </div>
                    </Col>
                    ))}
                </Row>
                <NavLink to="/cart">
                  <Button className={classes.cartBtn} variant="dark">See To Cart</Button>
                </NavLink>
            </Container>
        </div>
    )
}

export default ProductList;