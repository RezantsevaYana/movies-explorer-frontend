import React from "react";
import { Navigate } from "react-router-dom";

export const UserBlockedRoute = ({ component: Component, ...props }) => {
    return (
        !props.isLoggedIn ? <Component {...props} /> : <Navigate to="/movies" />
    )
}


export default UserBlockedRoute; 