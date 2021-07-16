import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddressAction } from "../actions/cartAction";

const ShippingPage = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log(shippingAddress);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddressAction({ address, city, postalCode, country }));
    props.history.push("/payment");
  };

  return (
    <FormContainer>
      <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlid="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter Address"
          />
        </Form.Group>

        <Form.Group controlid="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter City"
          />
        </Form.Group>
        <Form.Group controlid="postalCode" className="my-2">
          <Form.Label>Postalcode</Form.Label>
          <Form.Control
            required
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
            type="text"
            placeholder="Enter postalcode"
          />
        </Form.Group>
        <Form.Group controlid="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            placeholder="Enter Country"
          />
        </Form.Group>

        <Button className="my-3" variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
