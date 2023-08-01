import classes from "./ProductList.module.css"
import ShowProducts from "./ShowProducts";

const ProductList = (props) => {

  const products = [
      {
        title: "Album 1",
    
        price: 100,
    
        imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      },
      
    
      {
        title: "Album 2",
    
        price: 500,
    
        imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      },
    
      {
        title: "Album 3",
    
        price: 200,
    
        imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      },
    
      {
        title: "Album 4",
    
        price: 300,
    
        imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
      },
  ];

  return (
    <div>
      <h1 className={classes.heading}>The Generics</h1>
      <h1 style={{textAlign:"center", fontFamily:"fantasy", marginTop:"40px"}} >Music</h1>
      <ShowProducts productList={products} />
    </div>
  )
}

export default ProductList;