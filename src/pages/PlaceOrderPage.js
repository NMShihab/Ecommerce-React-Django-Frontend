import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderStep from "../components/OrderStep";

const PlaceOrderPage = (props) => {
  const cart = useSelector((state) => state.cart);

  const { cartItems, shippingAddress, paymentMethod } = cart;
  return (
    <div>
      <OrderStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Shipping</h1>
              Address : {shippingAddress.address}
            </ListGroup.Item>
            <h1>Payment Method</h1>
            Method : {paymentMethod}
            <ListGroup.Item>
              <h1>Order Items</h1>
            </ListGroup.Item>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} fluid rounded alt={item.name} />
                    </Col>
                    <Col md={6}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={5}>
                      <p>{`${item.qty} x $${item.price} = ${(
                        item.price * item.qty
                      ).toFixed(2)}`}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Total</h1>
              <h3>
                Items : {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </h3>
              <h3>
                Price :{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.qty, 0)
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="primary"
                size="lg"
                block
                disabled={cartItems.length === 0}
                // onClick={checkoutHandler}
              >
                CheckOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
