import React, { useEffect } from "react";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCartAction, removeCartItemAction } from "../actions/cartAction";

const CartPage = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  // console.log("qty: ", qty);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCartAction(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeItemhandler = (id) => {
    dispatch(removeCartItemAction(id));
  };
  const checkoutHandler = () => {
    props.history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <h1>Cart Items</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded alt={item.name} />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <p>{(item.price * item.qty).toFixed(2)}</p>
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCartAction(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeItemhandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Total</h2>
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
          </ListGroup>
        </Card>
        <ListGroup.Item>
          <Button
            type="primary"
            size="lg"
            block
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            CheckOut
          </Button>
        </ListGroup.Item>
      </Col>
    </Row>
  );
};

export default CartPage;
