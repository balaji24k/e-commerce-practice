 import { Table } from "react-bootstrap";
 import classes from "./Cart.module.css"

const cartItems = [
    {
    
    title: 'Colors',
    
    price: 100,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    
    quantity: 2,
    
    },
    
    {
    
    title: 'Black and white Colors',
    
    price: 50,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    
    quantity: 3,
    
    },
    
    {
    
    title: 'Yellow and Black Colors',
    
    price: 70,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    
    quantity: 1,
    
    }
    
    ]

const Cart = () => {
    return (
        <div className={classes.cart} >  
            <h3 className={classes.header}>Cart Items</h3>
            <Table striped bordered hover className="table-secondary">
                <thead>
                    <th>Item</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </thead>

                <tbody>
                
                    {cartItems.map( item => (
                        <tr>
                            <th> <img width="80px" alt="Not Loaded" src={item.imageUrl} /> </th>
                            <th>{item.title} </th>
                            <th>{item.quantity} </th>
                            <th>{item.price} </th>
                        </tr>
                    ))}
                    
                </tbody>

            </Table>
        </div>
      
    );
};

export default Cart;
  