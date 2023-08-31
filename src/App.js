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
import ProductDetails from './components/Pages/ProductDetails';

function App() {

  const authCtx = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false);
    
  const showCartHandler = () => {
    setShowCart(true)
  };
  const hideCartHandler = () => {
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
        <Route exact path="/home">
          {authCtx.isLoggedin && <Home />}
          {!authCtx.isLoggedin && <Redirect to="/login"/>}
        </Route>
        <Route exact path="/store">
          {authCtx.isLoggedin && <ProductList showCartHandler={showCartHandler}/>}
          {!authCtx.isLoggedin && <Redirect to="/login"/>}
        </Route>
        <Route exact path="/store/:prodId">
          {authCtx.isLoggedin && <ProductDetails />}
          {!authCtx.isLoggedin && <Redirect to="/login"/>}
        </Route>
        <Route exact path="/about">
          {authCtx.isLoggedin && <About/>}
          {!authCtx.isLoggedin && <Redirect to="/login"/>}
        </Route>
        <Route exact path="/contact">
          {authCtx.isLoggedin && <ContactUsPage/>}
          {!authCtx.isLoggedin && <Redirect to="/login"/>}
        </Route>
        <Route exact path="/signup">
          {authCtx.isLoggedin && <Redirect to="/store"/>}
          {!authCtx.isLoggedin && <SignUpPage/>}
        </Route>
        <Route exact path="/login">
          {authCtx.isLoggedin && <Redirect to="/store"/>}
          {!authCtx.isLoggedin && <LoginPage/>}
        </Route>
        <Route exact path = "/">
          {authCtx.isLoggedin && <Redirect to="/store"/>}
          {!authCtx.isLoggedin && <Redirect to="/login"/>}
        </Route>
        <Route exact path="*">
          {authCtx.isLoggedin && <Redirect to="/store"/>}
          {!authCtx.isLoggedin && <LoginPage/>}
        </Route>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
