import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderStep from "../components/OrderStep";

const PlaceOrderPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const items = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = (items >= 200 ? 0 : 20).toFixed(2);
  const taxPrice = Number((0.15 * items).toFixed(2));
  const totalPrice = Number(items) + Number(shippingPrice) + Number(taxPrice);

  const placeOrderHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <OrderStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Shipping</h1>
              <p>
                <strong>Address :</strong> {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>Payment Method</h1>
              <strong>Method : </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

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
                    <Col md={6}>{item.name}</Col>
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
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>Order Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>{`$${items.toFixed(2)}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{`$${shippingPrice}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{`$${taxPrice}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{`$${totalPrice.toFixed(2)}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="submit"
                  className="btn-block"
                  disabled={cartItems === 0}
                  onclick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
