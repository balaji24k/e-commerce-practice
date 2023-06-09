import React from "react"

const CartContext = React.createContext({
    cartItems : [],
    totalPrice : 0,
    addtoCart : () => {},
    removeFromCart : () => {},
    login : () => {},
    logout : () => {},
    isLoggedin : false,
    userEmail : ""
})

export default CartContext