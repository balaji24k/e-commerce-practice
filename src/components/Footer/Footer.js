import { Col, Navbar } from "react-bootstrap";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="primary" variant="dark">
      <Col className="col-7">
        <h3 className={classes.heading}>E-commerce App</h3>
      </Col>

      <Col className="col-5">
        <a href="https://www.youtube.com/">
          <img
            className={classes.images}
            src="https://prasadyash2411.github.io/ecom-website/img/6260efc8fc9a9002669d2f4ad9956cc0.jpg"
            alt="Not Loaded"
          />
        </a>

        <a href="https://open.spotify.com/">
          <img
            className={classes.images}
            src="https://prasadyash2411.github.io/ecom-website/img/Spotify%20Logo.png"
            alt="Not Loaded"
          />
        </a>

        <a href="https://www.facebook.com/">
          <img
            className={classes.images}
            src="https://prasadyash2411.github.io/ecom-website/img/Facebook%20Logo.png"
            alt="Not Loaded"
          />
        </a>
      </Col>
    </Navbar>
  );
};

export default Footer;
