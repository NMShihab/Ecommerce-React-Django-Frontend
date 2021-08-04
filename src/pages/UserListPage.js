import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userListAction } from "../actions/userAction";
import UserList from "../components/UserList";

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

  const deleteUserHandler = (e) => {
    console.log(e);
  };

  return (
    <div>
      <h1>User List</h1>
      <UserList users={users} deleteUserHandler={deleteUserHandler} />
    </div>
  );
};

export default UserListPage;
