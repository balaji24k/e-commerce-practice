import { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {

    const [cartItems,setcartItems] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);


    useEffect( () => {
        const getDetails = async() => {
            const response = await fetch("https://react-practice-a3750-default-rtdb.firebaseio.com/ItemList.json")
            const data = await response.json();
            console.log(data, "after refreshed");

            const loadedProducts = []
            for (const key in data) {
                loadedProducts.push(data[key])
                // console.log(data[key],"inLoop")
            }
            console.log(loadedProducts,"outLoop")
            setcartItems(loadedProducts);
        }
        getDetails();

    }, [])

    const addtoCartHandler = async (product) => {
        // setTotalPrice(totalPrice + product.price)

        const itemIndex = cartItems.findIndex(item => item.title === product.title);
        const existingItem = cartItems[itemIndex]; 
        // console.log(existingItem,"existing");

        
        let updatedCart;
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                quantity : existingItem.quantity + 1
            }

            updatedCart = [...cartItems]
            updatedCart[itemIndex] = updatedItem;

            console.log("existingItem:",existingItem.id);

            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/ItemList/${existingItem.id}.json`,{
                method : "PUT",
                body : JSON.stringify(updatedItem), 
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await response.json();
            console.log(data,"afterIncresingQuantity")
        
        }

        else{
            const newItem = {...product,quantity:1}

            const response = await fetch("https://react-practice-a3750-default-rtdb.firebaseio.com/ItemList.json",{
                method : "POST",
                body : JSON.stringify(newItem),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await response.json();
            console.log(data,"afterPosting")

            const updatedItem = {...newItem, id : data.name };

            updatedCart = [...cartItems,updatedItem]

        }
        setcartItems(updatedCart);
    };

    const removeFromCartHandler = async (product) => {
        // setTotalPrice(totalPrice - product.price);

        const itemIndex = cartItems.findIndex(item => item.title === product.title);
        const item = cartItems[itemIndex];

        let updatedCart;
        if (product.quantity === 1) {
            updatedCart = cartItems.filter(item => item.title !== product.title);

            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/ItemList/${item.id}.json`,{
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

            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/ItemList/${item.id}.json`,{
                method : "PUT",
                body : JSON.stringify(updatedItem), 
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await response.json();
            console.log(data,"afterDecreseQuantity")

        }
        setcartItems(updatedCart)
    };


    const obj = {
        cartItems : cartItems,
        // totalPrice : totalPrice,
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