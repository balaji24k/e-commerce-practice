import './App.css';
import Footer from './components/Footer';
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <ProductList/>
      <Footer/>
    </div>
  );
}

export default App;
