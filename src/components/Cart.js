 import { Button, Table } from "react-bootstrap";
 import classes from "./Cart.module.css"
import { useContext } from "react";
import CartContext from "../store/CartContext";
 
const Cart = () => {
    const cartCtx = useContext(CartContext);
    console.log(cartCtx.cartItems,"cartItems in cart");

    const totalPrice = cartCtx.cartItems.reduce((totalPrice,item) => {
        return totalPrice + item.price*item.quantity;
    },0);

    const hasItems = cartCtx.cartItems.length>0;
    
    return (
        <div className={classes.cart} >  
            <h3 className={classes.header}>Cart Items</h3>
            {hasItems && (<Table striped bordered hover className="table-secondary">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    
                </thead>

                <tbody>
                
                    {cartCtx.cartItems.map( item => (
                        <tr key={item.title}>
                            <td> <img width="80px" alt="Not Loaded" src={item.imageUrl} /> </td>
                            <td>{item.title} </td>
                            <td>{item.quantity} </td>
                            <td>{item.price} </td>
                            <td> 
                                <Button onClick={cartCtx.removeFromCart.bind(null,item)} className={classes.bottons} >-</Button>
                                <Button onClick={cartCtx.addtoCart.bind(null,item)} className={classes.bottons}>+</Button> 
                            </td>
                        </tr>
                        
                    ))}
                    
                </tbody>

            </Table>)}
            {!hasItems && <h5 className={classes.header}>No Items Added</h5>}
            {hasItems && <h5 className={classes.header} >Total Price: {totalPrice} </h5>}
        </div>
      
    );
};

export default Cart;
  