import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./ContactUsPage.module.css";

const ContactUsPage = () => {
  const name = useRef();
  const phoneNumber = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

		if (name.current.value.trim().length===0) {
			alert("Enter valid Name");
		} else if (phoneNumber.current.value.toString().length !==10) {
			alert("Enter valid Phone Number")
		} else {
      name.current.value = "";
      phoneNumber.current.value = "";
      alert("Request submitted, You will get a call from us within 10 minutes.");
		}
  };

  return (
    <div className={classes.box}>
      <h3 className={classes.header} >Contact-Us</h3>
			<h6 className={classes.header} >Fill the details if you are facing any issue, you will get a call within 10 minutes.</h6>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="mt-2">Name:</Form.Label>
              <Form.Control
                type="text"
                ref={name}
                placeholder="Name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Phone Number:</Form.Label>
              <Form.Control
                type="number"
                ref={phoneNumber}
                placeholder="Mobile"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button
                variant="success"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
    </div>
  );
};

export default ContactUsPage;
