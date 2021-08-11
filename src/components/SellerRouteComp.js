import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import store from "../store/store";

export default function SellerRoute({ component: Component, ...rest }) {
    const state = store.getState();
    const { userInfo } = state.userInfo;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
