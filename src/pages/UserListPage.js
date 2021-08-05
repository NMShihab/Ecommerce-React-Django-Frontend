import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userListAction, userDeleteAction } from "../actions/userAction";
import UserList from "../components/UserList";

const UserListPage = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;
  const deleteUser = useSelector((state) => state.deleteUser);
  const { success: successDelete } = deleteUser;

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login");
    } else if (!userInfo.isAdmin) {
      props.history.push("/profile");
    } else {
      dispatch(userListAction());
    }
  }, [userInfo, dispatch, props.history, successDelete]);

  const deleteUserHandler = (e) => {
    console.log(e);
    dispatch(userDeleteAction(e));
  };

  return (
    <div>
      <h1>User List</h1>
      <UserList users={users} deleteUserHandler={deleteUserHandler} />
    </div>
  );
};

export default UserListPage;
