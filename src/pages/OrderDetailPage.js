import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailOrderActions } from "../actions/orderAction";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderDetailPage = (props) => {
  const order_id = Number(props.match.params.id);
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, error, loading } = orderDetail;

  if (!loading && !error) {
    order.itemPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  console.log(typeof props.match.params.id);

  useEffect(() => {
    if (!order || order._id !== order_id) {
      dispatch(detailOrderActions(order_id));
    }
  }, [order, order_id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order : {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Shipping</h1>
              <p>
                {" "}
                <strong>Name :</strong> {order.user.name}
              </p>
              <p>
                <strong>Email :</strong>{" "}
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>{" "}
              </p>
              <p>
                <strong>Address :</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered at: {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="warning">Not Delivered</Message>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>Payment Method</h1>
              <strong>Method : </strong>
              {order.paymentMethod}
              {order.isPaid ? (
                <Message variant="success">Paid</Message>
              ) : (
                <Message variant="warning">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h1>Order Items</h1>
            </ListGroup.Item>
            <ListGroup variant="flush">
              {order.orderItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} fluid rounded alt={item.name} />
                    </Col>
                    <Col md={6}>{item.name}</Col>
                    <Col md={5}>
                      <p>{`${item.quantity} x $${item.price} = ${(
                        item.price * item.quantity
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
                  <Col>{`$${order.itemPrice}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{`$${order.shippingPrice}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{`$${order.taxPrice}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{`$${order.totalPrice}`}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailPage;
