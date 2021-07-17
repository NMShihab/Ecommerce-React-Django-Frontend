import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethodAction } from "../actions/cartAction";
import OrderStep from "../components/OrderStep";

const PaymentPage = (props) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const paymentHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethodAction(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <FormContainer>
      <OrderStep step1 step2 step3 />
      <Form.Group className="my-3">
        <Form.Label as="legend">Payment Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="paypal"
            name="paymentMethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form onSubmit={paymentHandler}>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
