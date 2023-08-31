import classes from "./About.module.css";
const About = () => {
    return (
      <div className={classes.box} > 
        <h1 className={classes.header} >About</h1>
        <h5 className="d-flex p-4 mt-1">
          At Balaji Electronics, we're all about bringing you the future. Although this is a demo website, Balaji Electronics is designed to provide you with a seamless and immersive online shopping experience, focusing on a wide range of electronic products.
          <br/><br/>
          Developed using the latest technologies in web development, Balaji Electronics showcases the power and flexibility of React, coupled with the ease of styling provided by React-Bootstrap. Each page is crafted with careful consideration to design and user experience, ensuring smooth navigation across the site.
          <br/><br/>
          As a simulation of an e-commerce platform, Balaji Electronics demonstrates key features that you'd expect from an online store. This includes product listing, detailed product views, a shopping cart feature, and a user-friendly checkout process.
          <br/><br/>
          Please note that this website is a demonstration for Education purpose. All product images and information are used for demonstration purposes only.
        </h5>
      </div>
    );
  };
  export default About;