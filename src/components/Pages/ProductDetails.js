import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import classes from "./ProductDetails.module.css";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import ProductsContext from "../../store/ProductContext";
import {useHistory} from "react-router-dom";

const ProductDetails = () => {
  const cartCtx = useContext(CartContext);
  const productCtx = useContext(ProductsContext);

  const { prodId } = useParams();

  const product = productCtx.products.find((prod) => prod.prodId === prodId);
  console.log(product, "product in prod details");

	const history = useHistory();
	const goToStore = () => {
		history.replace("/store");
	}

  return (
    <div className={classes.box}>
        <div className={classes.innerBox}>
          <img
            width="300px"	
            src={product && product.imageUrl}
            alt="Not Loaded"
          />
          <div className={classes.childBtns}>
						<Button variant="dark" onClick={goToStore}>
							Go To Store
						</Button>
            {!cartCtx.isAddingToCart && <Button 
              variant="dark" 
              onClick={cartCtx.addtoCart.bind(null, product)}>
              Add to Cart
            </Button>}
            {cartCtx.isAddingToCart && 
              <Button variant="dark" >
                Adding...
              </Button>
            }
          </div>
        </div>
        <div className={classes.innerBox}>
					<h3 className={classes.heading}>Specifications:</h3>
					<div>
						<h5>Product: {product.title}</h5>
						<h5>RAM: {product.RAM}</h5>
						<h5>ROM: {product.ROM}</h5>
            <h5>Rear Camera: {product.rear}</h5>
            <h5>Front Camera: {product.front}</h5>
						<h5>CPU: {product.CPU}</h5>
						<h5>Battery: {product.Battery}</h5>
						<h5>Price: {`\u20B9`}{product.price}</h5>
					</div>
				</div>
    </div>
  );
};

export default ProductDetails;
