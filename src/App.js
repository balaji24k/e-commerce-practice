import './App.css';
import Cart from './components/Cart';
import Footer from './components/Footer';
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { Switch, Route } from 'react-router-dom';
import CartProvider from './store/CartProvider';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <CartProvider>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <ProductList/>
        </Route>
        <Route exact path="/signup">
          <SignUpPage/>
        </Route>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <Route exact path="/cart">
          <Cart/>
        </Route>
      </Switch>
      <Footer/>
    </CartProvider>
  );
}

export default App;
