import { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {

    const [cartItems,setcartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addtoCartHandler = (product) => {
        setTotalPrice(totalPrice + product.price)

        const itemIndex = cartItems.findIndex(item => item.title === product.title);
        const existingItem = cartItems[itemIndex];
        // console.log(existingItem,"existing")
        let updatedCart;
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                quantity : existingItem.quantity + 1
            }

            updatedCart = [...cartItems]
            updatedCart[itemIndex] = updatedItem
        }

        else{
            const newItem = {...product,quantity:1}
            updatedCart = [...cartItems,newItem]
        }
        setcartItems(updatedCart);
    };

    const removeFromCartHandler = (product) => {
        setTotalPrice(totalPrice - product.price);

        let updatedCart;
        if (product.quantity === 1) {
            updatedCart = cartItems.filter(item => item.title !== product.title)
        }

        else{
            const itemIndex = cartItems.findIndex(item => item.title === product.title);
            const item = cartItems[itemIndex];

            const updatedItem = {
                ...item,
                quantity : item.quantity-1
            }

            updatedCart = [...cartItems];
            updatedCart[itemIndex] = updatedItem
        }
        setcartItems(updatedCart)
    };


    const obj = {
        cartItems : cartItems,
        totalPrice : totalPrice,
        addtoCart : addtoCartHandler,
        removeFromCart : removeFromCartHandler
    }

    return (
        <CartContext.Provider value={obj} >
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;