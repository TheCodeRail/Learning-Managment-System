import React from "react";
import { message } from "antd";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("token")) {
    message.error("You need to login first");
    return <Navigate to="/signIn" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
