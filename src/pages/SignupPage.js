import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { signupAction } from "../actions/userAction";

const SignupPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignup = useSelector((state) => state.userSignup);

  const { error, loading, userInfo } = userSignup;

  const islogin = localStorage.getItem("userInfo");

  useEffect(() => {
    if (userInfo || islogin) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect, islogin]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const signupHandler = (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    if (password !== confirmPassword) {
      setMessage("Password did not match. Please try again");
    } else {
      dispatch(signupAction(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>Register Here</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={signupHandler} className="my-4">
        <Form.Group controlid="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={name}
            onChange={nameHandler}
            type="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            value={email}
            onChange={emailHandler}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            value={password}
            onChange={passwordHandler}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>

        <Button className="my-3" variant="primary" type="submit">
          Signup
        </Button>
      </Form>

      <Row>
        <Col>
          You account Login here?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SignupPage;
