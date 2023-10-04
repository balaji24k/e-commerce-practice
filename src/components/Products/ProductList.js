import ShowProducts from "./ShowProducts";
import { useContext } from "react";
import ProductsContext from "../../store/ProductContext";

const ProductList = (props) => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      {/* <h1 style={{textAlign:"center", fontFamily:"fantasy", marginTop:"70px"}} >Mobiles</h1> */}
      <ShowProducts
        products={products}
        // productList={productCtx.products} 
        showCartHandler={props.showCartHandler}
      />
    </div>
  )
}

export default ProductList;