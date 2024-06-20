import React, { useContext, useState, useEffect } from "react";
import UserNavbar from "@/webcomponents/UserNavbar";
import { UserContext } from "@/context/UserContext";
import UserWeekDashboard from "@/webcomponents/UserWeekDashboard";
import axios from "axios";
import Loading from "@/webcomponents/Loading";
import AdminDashboard from "@/webcomponents/AdminDashboard";
import AdminNavbar from "@/webcomponents/AdminNavbar";
import NotSubscribed from "@/webcomponents/NotSubscribed";
import MonthPay from "./MonthPay";

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
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
  // console.log(user);
  return (
    <>
      {user.isAdmin ? (
        <>
          <AdminNavbar />
          <AdminDashboard />
        </>
      ) : (
        <>
          {user?.isSubscribed ? (
            <>
              {user?.isMonthPaid ? (
                <>
                  <UserNavbar />
                  <UserWeekDashboard />
                </>
              ) : (
                <>
                  <UserNavbar />
                  <MonthPay />
                </>
              )}
            </>
          ) : (
            <>
              <UserNavbar />
              <NotSubscribed />
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserDashboard;
