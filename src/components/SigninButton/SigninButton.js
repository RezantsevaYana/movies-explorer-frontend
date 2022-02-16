import React from "react";
import { Link } from "react-router-dom";


function SigninButton(props) {
    return (
            <div className="header__info">
                <Link to='/signup' className="header__login">{props.logIn}</Link>
                <Link to='/signin'><button className="header__button">{props.titleButton}</button></Link>
            </div>
    );
}

export default SigninButton;