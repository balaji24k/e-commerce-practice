import { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import AuthContext from "./AuthContext";
import useHttp from "../hooks/useHttp";

const CartProvider = (props) => {
  const [cartItems, setcartItems] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const sendRequest = useHttp();
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;

  useEffect(() => {
    const getDetails = async () => {
      const data = await sendRequest();
			let loadedProducts = []
			if (data) {
				loadedProducts = Object.keys(data).map(fbId => ({ fbId, ...data[fbId] }));
			}
      setcartItems(loadedProducts);
    };
    userEmail && getDetails();
  }, [userEmail, sendRequest]);

	const updateCartItemHandler = async(updatingCartItem, quantityChange) => {
		try {
			const updatedItem = {
        ...updatingCartItem,
        quantity: updatingCartItem.quantity + quantityChange,
      };

			await sendRequest({
				method: "PUT",
				body : updatedItem,
				id : updatingCartItem.fbId
			})
			const updatedCart = cartItems.map((cartItem) =>
				cartItem.id === updatingCartItem.id ? updatedItem : cartItem
			);
			setcartItems(updatedCart);
      setIsAddingToCart(null);
      
		} catch (error) {
			console.log(error,"updateCartItemHandler")
		}
	}

  const addtoCart = async (addingProduct) => {
    setIsAddingToCart(addingProduct.id);
    console.log(addingProduct, "prod in add");
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === addingProduct.id
    );

    if (!existingCartItem) {
			const newItem = { ...addingProduct, quantity: 1 };
			const data = await sendRequest({
				method : "POST",
				body : newItem
			})
			const newItemWithId = {...newItem, fbId : data.name};
			setcartItems([...cartItems,newItemWithId]);
			setIsAddingToCart(null);
			return;
    } 
		updateCartItemHandler(existingCartItem,1);
  };

  const removeFromCart = async (product) => {
    const deleteItem = cartItems.find(
      (cartItem) => cartItem.id === product.id
    );

    if (deleteItem.quantity === 1) {
      const updatedCart = cartItems.filter((item) => item.id !== deleteItem.id);
      setcartItems(updatedCart);

			await sendRequest({
				method: "Delete",
				id : deleteItem.fbId
			})
			return;
    } 
		updateCartItemHandler(deleteItem, -1);
  };

  const checkOutHandler = async() => {
    if (cartItems.length === 0) {
      alert("No items added, Add items to place Order.");
      return;
    }
		await sendRequest({method:"DELETE"});
    setcartItems([]);
    alert("Order Placed Succefully.");
  };

  const obj = {
    cartItems,
    addtoCart,
    removeFromCart,
    isAddingToCart,
    checkOutHandler
  };

  return (
    <CartContext.Provider value={obj}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
