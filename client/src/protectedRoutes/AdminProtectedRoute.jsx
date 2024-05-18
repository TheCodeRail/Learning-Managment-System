import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  async function getUser() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getUser`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  if (token)
    if (!user.isAdmin) {
      message.error("You are not authorized to access this route");
      return <Navigate to="/dashboard" />;
    } else {
      return children;
    }
  else {
    message.error("Please Login!");
    return <Navigate to="/signIn" />;
  }
};

export default AdminProtectedRoute;
