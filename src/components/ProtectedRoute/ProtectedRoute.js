import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    console.log('prodect route в App отработал')
    console.log(`loggeidin в prodect route ${props.isLoggedIn}`)
    console.log({ component: Component, ...props })

    return (
       props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" />
    )
}

export default ProtectedRoute; 