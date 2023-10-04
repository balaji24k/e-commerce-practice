import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import classes from "./ProductList.module.css";
import { NavLink } from "react-router-dom";

const ShowProducts = (props) => {
	const cartCtx = useContext(CartContext);
	const { products } = props;

  // console.log(cartCtx.cartItems,"cartItems arr in showProd");
	
  return (
    <Container className={classes.productBox}>
      <Row>
        {products.map((product) => (
          <Col key={product.title} className="col-3">
            <div className={classes.item}>
              <div className={classes.title} >
                <p className={classes.text}>{product.title}</p>
              </div>
              <NavLink 
                className={classes.itemNavlink} 
                to={`/store/${product.id}`} 
              >
                <img 
                  width="200px" 
                  height="300px"
                  src={product.image} 
                  alt="Not Loaded" 
                />
              </NavLink>
              <div className={classes.childItem}>
                <h5 className={classes.text}>
                  {`\u20B9`}{product.price}
                </h5>
                <button
                  className={classes.addToCartBtn}
                  disabled={cartCtx.isAddingToCart}
                  onClick={cartCtx.addtoCart.bind(null, product)}
                >
                  {cartCtx.isAddingToCart === product.id ?
                    <span>
                      Adding
                      <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                      />
                    </span>
                      : 
                    "Add to Cart"
                  }
              </button>
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
