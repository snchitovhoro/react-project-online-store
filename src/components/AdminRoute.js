import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import store from "../store/store";

export default function AdminRoute({ component: Component, ...rest }) {
    const state = store.getState();
  const { userInfo } = state.userInfo;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
}
