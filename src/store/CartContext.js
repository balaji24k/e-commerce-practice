import React from "react"

const CartContext = React.createContext({
    cartItems : [],
    totalPrice : 0,
    addtoCart : () => {},
    removeFromCart : () => {}
})

export default CartContext