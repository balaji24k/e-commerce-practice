import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./ProductDetails.module.css";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import { useHistory, useParams } from "react-router-dom";
import ProductsContext from "../../store/ProductContext";

const ProductDetails = () => {
  const cartCtx = useContext(CartContext);
  const { products } = useContext(ProductsContext);

  const { id } = useParams();
  // console.log(id, "products in prod details");
  const product = products.find(ele => ele.id === +id);
  // console.log(product, "product in prod details");

  const history = useHistory();
  const goToStore = () => {
    history.replace("/store");
  };

  return (
    <>
      {product && 
        <Container className={classes.box}>
          <Row>
            <Col className="col-4">
              <img width="300px" src={product && product.image} alt="Not Loaded" />
              <div className={classes.innerBox}>
                <Button variant="dark" onClick={goToStore}>
                  Go To Store
                </Button>
                {!cartCtx.isAddingToCart && (
                  <Button
                    variant="dark"
                    onClick={cartCtx.addtoCart.bind(null, product)}
                  >
                    Add to Cart
                  </Button>
                )}
                {cartCtx.isAddingToCart && <Button variant="dark">Adding...</Button>}
              </div>
            </Col>
            <Col className="col-8">
              <h4 className={classes.heading}>{product.title}</h4>
              <h5>{product.description}</h5>
              <h5><strong>Rating:</strong> {product.rating.rate} ({product.rating.count})</h5>
              <h5><strong>Price:</strong> {`\u20B9`}{product.price}</h5>
            </Col>
          </Row>
        </Container>
      }
    </>
  );
};

export default ProductDetails;
