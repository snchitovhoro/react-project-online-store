
import { Redirect, Route } from 'react-router-dom';
import store from "../store/store";
import React from 'react';

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
