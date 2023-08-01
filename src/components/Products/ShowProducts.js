import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./ProductList.module.css";


const ShowProducts = (props) => {
	const cartCtx = useContext(CartContext);
	const products = props.productList;

  for (let i =0; i<products.length; i++) {
    for (let cartItem of cartCtx.cartItems) {
      if(products[i].title === cartItem.title) {
        let newItem = {...products[i], quanity : cartItem.quantity};
        products[i] = newItem
      }
    }
  }
  // console.log(products,"prod arr in showProd")
	
  return (
    <Container style={{ width: "800px" }} className={classes.productBox}>
      <Row>
        {products.map((product) => (
          <Col key={product.title} className="col-6">
            <div className={classes.item}>
              <h4 className={classes.text}>{product.title}</h4>
              <img width="250px" src={product.imageUrl} alt="Not Loaded" />
              <div className={classes.childItem}>
                <h5 className={classes.text}>
                  {`\u20B9`}
                  {product.price}
                </h5>
                {product.quanity > 0 ? (
                  <div className={classes.addRemoveBtns}>
                    <Button
                      variant="btn-danger"
                      onClick={cartCtx.removeFromCart.bind(null, product)}
                      className="btn btn-sm text-light"
                    >
                      <strong>-</strong>
                    </Button>
                    <h6 className={classes.quantity}>{product.quanity}</h6>
                    <Button
                      variant="btn-danger"
                      onClick={cartCtx.addtoCart.bind(null, product)}
                      className="btn btn-sm text-light"
                    >
                      <strong>+</strong>
                    </Button>
                  </div>
                ) : cartCtx.isAddingToCart === product.title ? (
                  <button className={classes.addToCartBtn}>Adding....</button>
                ) : (
                  <button
                    className={classes.addToCartBtn}
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
        See To Cart
      </Button>
    </Container>
  );
};

export default ShowProducts;
