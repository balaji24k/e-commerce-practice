import React from "react"

const CartContext = React.createContext({
    cartItems : [],
    totalPrice : 0,
    addtoCart : () => {},
    removeFromCart : () => {},
    login : () => {},
    logout : () => {},
    isLoggedin : false
})

export default CartContext