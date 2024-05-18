import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import EnrollNow from "./pages/EnrollNow";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserDashboard from "./pages/UserDashboard";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AddWeek from "./pages/AddWeek";
import DeleteWeek from "./pages/DeleteWeek";
import Subs from "./pages/Subs";
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ShowAllUsers from "./pages/ShowAllUsers";
import EmailVerified from "./pages/EmailVerified";
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute";

const App = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enroll" element={<EnrollNow />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/*" element={<NotFound />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/addWeek"
            element={
              <AdminProtectedRoute>
                <AddWeek />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/deleteWeek"
            element={
              <AdminProtectedRoute>
                <DeleteWeek />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/dashboard/subscription"
            element={
              <ProtectedRoute>
                <Subs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/updateProfile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/Profile"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ShowAllUsers"
            element={
              <AdminProtectedRoute>
                <ShowAllUsers />
              </AdminProtectedRoute>
            }
          />
          <Route path="/resetPassword/:id" element={<ResetPassword />} />
          <Route path="/verified/:id" element={<EmailVerified />} />
        </Routes>
      </UserProvider>
    </>
  );
};

export default App;
