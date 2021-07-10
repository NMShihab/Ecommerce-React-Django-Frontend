import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { logInAction } from "../actions/userAction";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={loginHandler} className="my-4">
        <Form.Group controlId="formBasicEmail" className="my-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={emailHandler}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={passwordHandler}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button className="my-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
