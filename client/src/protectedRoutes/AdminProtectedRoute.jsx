import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loading from "@/webcomponents/Loading";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  async function getUser() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <Loading />; // Or a spinner component
  }

  if (!token) {
    message.error("Please Login!");
    return <Navigate to="/signIn" />;
  }

  if (!user?.isAdmin) {
    message.error("You are not authorized to access this route");
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminProtectedRoute;
