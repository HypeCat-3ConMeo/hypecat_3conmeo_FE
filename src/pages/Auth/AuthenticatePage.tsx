import React from "react";
import Login from "../../containers/authenticate/Login";
import { Helmet } from "react-helmet";

const AuthenticatePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>HypeCat | Đăng Nhập</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Login />
    </>
  );
};

export default AuthenticatePage;
