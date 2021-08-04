import React from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = (props) => {
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
          {props.users.map((user) => (
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
                <Link to={`users/profile/${user._id}`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit" />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => props.deleteUserHandler(user._id)}
                >
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

export default UserList;
