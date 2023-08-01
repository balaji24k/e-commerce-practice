import './App.css';
import Cart from './components/Header/Cart';
import Footer from './components/Footer/Footer';
import NavBar from "./components/Header/NavBar";
import ProductList from "./components/Products/ProductList";
import { Switch, Route, Redirect} from 'react-router-dom';
import SignUpPage from './components/Authentication/SignUpPage';
import LoginPage from './components/Authentication/LoginPage';
import { useContext, useState } from 'react';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import AuthContext from './store/AuthContext';
import ContactUsPage from './components/Pages/ContacUsPage';

function App() {

  const authCtx = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    console.log("inShowHandler")
    setShowCart(true)
  };
  const hideCartHandler = () => {
    console.log("inHideHandler")
    setShowCart(false)
  };

  return (
    <>
      <NavBar showCartHandler={showCartHandler} />
      {showCart && 
        <Cart 
          showCart={showCart} 
          hideCartHandler={hideCartHandler}
        />
      }
      <Switch>
        {authCtx.isLoggedin && 
          <>
            <Route exact path="/home">
                <Home />
            </Route>
            <Route exact path="/store">
              <ProductList showCartHandler={showCartHandler}/>
            </Route>
            <Route exact path="/about">
              <About/>
            </Route>
            <Route exact path="/contact">
              <ContactUsPage/>
            </Route>
            <Route exact path = "/">
              <Redirect to="/store"/>
            </Route>
          </>
        }
        {!authCtx.isLoggedin && ( 
        <>
          <Route exact path="/signup">
            <SignUpPage/>
          </Route>
          <Route exact path="/login">
            <LoginPage/>
          </Route>
          <Route path="/">
            <Redirect to="/login"/>
          </Route>
        </>
        )}
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
