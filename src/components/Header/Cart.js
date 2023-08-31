import { Button, Table, Modal } from "react-bootstrap";
import classes from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/CartContext";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx.cartItems,"cartItems in cart");

  const totalPrice = cartCtx.cartItems.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity, 0);

  const hasItems = cartCtx.cartItems.length > 0;

  return (
    <Modal 
      className={classes.modal} 
      show={props.showCart} 
      onHide={props.hideCartHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Cart Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasItems && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cartCtx.cartItems.map((item) => (
                <tr key={item.title}>
                  <td>
                    <img width="80px" alt="Not Loaded" src={item.imageUrl} />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className={classes.parentBtn}>
                      <Button 
                        variant="btn-danger" 
                        onClick={cartCtx.removeFromCart.bind(null, item)} 
                        className="btn btn-sm text-light"
                      >
                        <strong>-</strong>
                      </Button>
                      <h3 className={classes.quantity}>{item.quantity}</h3>
                      <Button 
                        variant="btn-danger" 
                        onClick={cartCtx.addtoCart.bind(null, item)} 
                        className="btn btn-sm text-light"
                      >
                        <strong>+</strong>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {!hasItems && <p>No Items Added</p>}
        {hasItems && 
          <h4 className={classes.price} >Total Price: {`\u20B9`}{totalPrice}</h4>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideCartHandler}>
          Close
        </Button>
        <Button onClick={cartCtx.checkOutHandler} variant="primary">
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
