import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="1082861532643-n53fladnje0kuulscv1hfc77teeuekb5.apps.googleusercontent.com">
        <App />
        <Toaster />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
