import './App.css';
import Cart from './components/Cart';
import Footer from './components/Footer';
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import { useContext } from 'react';
import CartContext from './store/CartContext';
import Home from './components/Home';
import About from './components/About';

function App() {

  const authCtx = useContext(CartContext);
  // console.log(authCtx.isLoggedin,"isLoggedIn in App comp");

  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          {authCtx.isLoggedin && <Redirect to="/home" />}
          {!authCtx.isLoggedin && <Redirect to="/login" />}
        </Route>
        <Route exact path="/home">
            <Home />
        </Route>
        <Route exact path="/store">
          <ProductList/>
        </Route>
        <Route exact path="/cart">
          <Cart/>
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
        {!authCtx.isLoggedin && ( 
        <>
          <Route exact path="/signup">
            <SignUpPage/>
          </Route>
          <Route exact path="/login">
            <LoginPage/>
          </Route>
        </>
        )}
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
