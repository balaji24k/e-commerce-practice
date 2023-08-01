import { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
    const [cartItems,setcartItems] = useState([]);
    const [isAddingToCart,setIsAddingToCart] = useState(false);

    const userEmail = localStorage.getItem("email");
    let userName = userEmail && userEmail.split("@")[0];
    // console.log(userName,"userName in cartprovider")

    const url = `https://react-projects-aaebd-default-rtdb.firebaseio.com/e-commerce/${userName}`

    useEffect( () => {
        const getDetails = async() => {
            const response = await fetch(`${url}.json`)
            const data = await response.json();
            const loadedProducts = []
            for (const id in data) {
                loadedProducts.push({id,...data[id]})
            }
            setcartItems(loadedProducts);
        }
        getDetails();

    }, [userEmail,url])

    
    const addtoCartHandler = async (product) => {
        setIsAddingToCart(product.title);
        const existingCartItemIndex = cartItems.findIndex(item => item.title === product.title);
        const existingCartItem = cartItems[existingCartItemIndex]; 

        console.log(product,"product");
        console.log(existingCartItem,"existingCartItem");
        
        let updatedCart;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity : existingCartItem.quantity + 1
            }

            updatedCart = [...cartItems]
            updatedCart[existingCartItemIndex] = updatedItem;
            setcartItems(updatedCart);

            const response = await fetch(`${url}/${existingCartItem.id}.json`,{
                method : "PUT",
                body : JSON.stringify(updatedItem), 
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const data = await response.json();
            console.log(data,"afterIncresingQuantity");
        }

        else{

            const newItem = {...product,quantity:1}
            const response = await fetch(`${url}.json`,{
                method : "POST",
                body : JSON.stringify(newItem),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await response.json();
            console.log(data,"afterPosting");

            const updatedItem = {...newItem, id : data.name };

            updatedCart = [...cartItems,updatedItem]
            setcartItems(updatedCart);
        }
        setIsAddingToCart(null);
    };

    const removeFromCartHandler = async (product) => {

        const itemIndex = cartItems.findIndex(item => item.title === product.title);
        const item = cartItems[itemIndex];
        console.log(item,"item in delete")

        let updatedCart;
        if (item.quantity === 1) {
            updatedCart = cartItems.filter(item => item.title !== product.title);
            setcartItems(updatedCart);
            const response = await fetch(`${url}/${item.id}.json`,{
                method : "Delete"
            })
            const data = await response.json();
            console.log(data,"afterDelete")
        }

        else{
            const updatedItem = {
                ...item,
                quantity : item.quantity-1
            }

            updatedCart = [...cartItems];
            updatedCart[itemIndex] = updatedItem;
            setcartItems(updatedCart);

            const response = await fetch(`${url}/${item.id}.json`,{
                method : "PUT",
                body : JSON.stringify(updatedItem), 
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const data = await response.json();
            console.log(data,"afterDecreseQuantity")
        }
    };

    const checkOutHandler = () => {
        setcartItems([]);
        fetch(`${url}.json`,{
            method : "Delete"
        });
        alert("Order Placed Succefully");

    }

    const obj = {
        cartItems : cartItems,
        addtoCart : addtoCartHandler,
        removeFromCart : removeFromCartHandler,
        isAddingToCart : isAddingToCart,
        checkOutHandler : checkOutHandler
    }

    return (
        <CartContext.Provider value={obj} >
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;