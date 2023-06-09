import { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {

    const [cartItems,setcartItems] = useState([]);
    // const [totalPrice, setTotalPrice] = useState(0);

    const [userEmail,setUserEmail] = useState(localStorage.getItem("email"));
    const [token,setToken] = useState(localStorage.getItem("token"));

    let loggedInEmail;
    if (userEmail) {
        loggedInEmail = userEmail.replace(/[@.]/g,"");
    }
    const isLoggedin = !!token;

    const loginHandler = (token,email) => {
        setToken(token);
        setUserEmail(email);
        localStorage.setItem("token",token);
        localStorage.setItem("email",email);
    }

    const logoutHandler = () => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        alert("Logged out")
    }

    useEffect( () => {
        const getDetails = async() => {
            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/${loggedInEmail}.json`)
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

    }, [loggedInEmail])

    
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

            setcartItems(updatedCart);

            console.log("existingItem:",existingItem.id);

            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/${loggedInEmail}/${existingItem.id}.json`,{
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
            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/${loggedInEmail}.json`,{
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
        
    };

    const removeFromCartHandler = async (product) => {
        // setTotalPrice(totalPrice - product.price);

        const itemIndex = cartItems.findIndex(item => item.title === product.title);
        const item = cartItems[itemIndex];

        let updatedCart;
        if (product.quantity === 1) {
            updatedCart = cartItems.filter(item => item.title !== product.title);
            setcartItems(updatedCart);
            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/${loggedInEmail}/${item.id}.json`,{
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

            const response = await fetch(`https://react-practice-a3750-default-rtdb.firebaseio.com/${loggedInEmail}/${item.id}.json`,{
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


    const obj = {
        cartItems : cartItems,
        // totalPrice : totalPrice,
        addtoCart : addtoCartHandler,
        removeFromCart : removeFromCartHandler,
        login : loginHandler,
        logout : logoutHandler,
        userEmail : userEmail,
        isLoggedin : isLoggedin
    }

    return (
        <CartContext.Provider value={obj} >
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;