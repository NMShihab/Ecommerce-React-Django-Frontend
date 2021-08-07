import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  profileDetailAction,
  profileUpdateAction,
} from "../actions/userAction";

const AdminUserEditPage = (props) => {
  const profileDetails = useSelector((state) => state.profileDetails);
  const { profile } = profileDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const profileId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo.isAdmin) {
      props.history.push("/login");
    } else {
      dispatch(profileDetailAction(profileId));
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [dispatch, profileId, profile.name, profile.email, setName, setEmail]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password did not match. Please try again");
    } else {
      dispatch(
        profileUpdateAction(profileId, {
          id: profileId,
          name: name,
          email: email,
          password: password,
        })
      );
      props.history.push("/admin/users");
    }
  };
  return (
    <FormContainer>
      <Row>
        <Col>
          <h1>Update Profile</h1>

          {/* {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />} */}

          <Form onSubmit={updateHandler} className="my-4">
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
                value={password}
                onChange={passwordHandler}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>

            <Button className="my-3" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AdminUserEditPage;
