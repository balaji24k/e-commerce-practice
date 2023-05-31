import { Button, Col, Container, Row } from "react-bootstrap";
import classes from "./ProductList.module.css"

const ProductList = () => {

    const products = [
        {
          title: "Album 1",
      
          price: 100,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
        },
        
      
        {
          title: "Album 2",
      
          price: 50,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
        },
      
        {
          title: "Album 3",
      
          price: 70,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
        },
      
        {
          title: "Album 4",
      
          price: 100,
      
          imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
        },
    ];


    return (
        <div>
            <h1 className={classes.heading}>The Generics</h1>
            <h1 style={{textAlign:"center", fontFamily:"fantasy", marginTop:"40px"}} >Music</h1>
            <Container style={{width:"800px"}} className={classes.productBox}>
                <Row>
                {products.map( product => (
                    <Col className="col-6">
                            <div className={classes.item}>
                                <h4>{product.title}</h4>
                                <img width="250px" src={product.imageUrl} alt="Not Loaded"/>
                                <div className={classes.childItem}>
                                    <h5>${product.price}</h5>
                                    <Button variant="success">Add to cart </Button>
                                </div>
                            </div>
                    </Col>
                    ))}
                </Row>
                <Button  className={classes.cartBtn} variant="dark">See To Cart</Button>
            </Container>
        </div>
    )
}

export default ProductList;