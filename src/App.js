import './App.css';
import Cart from './components/Cart';
import Footer from './components/Footer';
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { Switch, Route } from 'react-router-dom';
import CartProvider from './store/CartProvider';

function App() {
  return (
    <CartProvider>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <ProductList/>
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
