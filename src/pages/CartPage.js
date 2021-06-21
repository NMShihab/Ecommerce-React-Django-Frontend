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
import { addToCartAction } from "../actions/cartAction";

const CartPage = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  // console.log("qty: ", qty);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCartAction(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Cart</div>;
};

export default CartPage;
