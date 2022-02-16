import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import SigninButton from "../SigninButton/SigninButton";


function Header(props) {
    return (
        <header className="header">
            <Link to="/"><div className="header__logo" /></Link>
            <Navigation title={props.title} subtitle={props.subtitle} />
        </header>


    );
}

export default Header;

// <SigninButton logIn={props.logIn} titleButton={props.titleButton} />