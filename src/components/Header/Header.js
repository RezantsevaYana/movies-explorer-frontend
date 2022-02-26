import React, { Children } from "react";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import SigninButton from "../SigninButton/SigninButton";


function Header(props) {
    return (
        <header className="header">
            <Link to="/"><div className="header__logo" /></Link>
            {props.children}
        </header>


    );
}

export default Header;

// <MobileHeader></MobileHeader>