import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { userListAction } from "../actions/userAction";

const UserListPage = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login");
    } else if (!userInfo.isAdmin) {
      props.history.push("/profile");
    } else {
      dispatch(userListAction());
    }
  }, [userInfo, dispatch, props.history]);

  console.log(users);

  const isAd = users.map((u) => u.isAdmin);
  console.log(isAd);

  return (
    <div>
      <Table striped responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }} />
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/users/${user._id}`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit" />
                  </Button>
                </LinkContainer>
              </td>
              <td>
                <Button variant="danger" className="btn-sm">
                  <i className="fas fa-trash" color="red" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserListPage;
