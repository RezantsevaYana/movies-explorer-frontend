import React, { Children } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <Link to="/"><div className="header__logo" /></Link>
            {props.children}
        </header>


    );
}

export default Header;
