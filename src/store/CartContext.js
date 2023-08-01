import React from "react"

const CartContext = React.createContext({
    cartItems : [],
    addtoCart : () => {},
    removeFromCart : () => {},
    isAddingToCart : false,
    checkOutHandler : () => {}
})

export default CartContext;