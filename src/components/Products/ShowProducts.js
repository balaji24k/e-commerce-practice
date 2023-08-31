import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./ProductList.module.css";
import { NavLink } from "react-router-dom";

const ShowProducts = (props) => {
	const cartCtx = useContext(CartContext);
	const products = props.productList;

  // console.log(cartCtx.cartItems,"cartItems arr in showProd");
	
  return (
    <Container className={classes.productBox}>
      <Row>
        {products.map((product) => (
          <Col key={product.title} className="col-6">
            <div className={classes.item}>
              <h4 className={classes.text}>{product.title}</h4>
              <NavLink 
                className={classes.itemNavlink} 
                to={`/store/${product.prodId}`} 
              >
                <img 
                  width="250px" 
                  src={product.imageUrl} 
                  alt="Not Loaded" 
                />
              </NavLink>
              <div className={classes.childItem}>
                <h5 className={classes.text}>
                  {`\u20B9`}{product.price}
                </h5>
                {cartCtx.isAddingToCart === product.prodId ? (
                  <button className={classes.addToCartBtn}>Adding....</button>
                ) : (
                  <button
                    className={classes.addToCartBtn}
                    disabled={cartCtx.isAddingToCart}
                    onClick={cartCtx.addtoCart.bind(null, product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Button
        onClick={props.showCartHandler}
        className={classes.cartBtn}
        variant="dark"
      >
        Go To Cart
      </Button>
    </Container>
  );
};

export default ShowProducts;
