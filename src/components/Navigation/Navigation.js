import React from "react";
import { Link } from "react-router-dom";


function Navigation(props) {
    return (
        <>
            <div className="header__link">
                    <Link to='/movies' className="header__movies">{props.title}</Link>
                    <Link to='/saved-movies' className="header__saved-movies">{props.subtitle}</Link>
            </div>
            <Link to="/profile" className="account__link">
                <div className="account__logo" />
                Aккаунт
            </Link>
        </>
    );
}

export default Navigation;