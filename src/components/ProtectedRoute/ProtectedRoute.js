import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../Login/Login";

const ProtectedRoute = ({ component: Component, ...props }) => {

   return (
      props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" />
   )
}

export default ProtectedRoute; 