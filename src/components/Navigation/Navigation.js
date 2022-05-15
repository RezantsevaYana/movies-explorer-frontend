import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';


function Navigation(props) {
    const routes = useLocation();

    return (
        <>
            <div className="navigation">
                <div className="header__link">
                    <Link to='/movies' className={routes.pathname === "/movies" ? "header__movies header__movies_active" : "header__movies"}>Фильмы</Link>
                    <Link to='/saved-movies' className={routes.pathname === "/saved-movies" ? "header__saved-movies header__movies_active" : "header__saved-movies"}>Сохраненные фильмы</Link>
                </div>
                <Link to="/profile" className="account__link">
                    <div className="account__logo" />
                    Aккаунт
                </Link>
            </div>
            <button className="mobile-header__button" onClick={props.onHeaderOpen}>
            </button>
        </>
    );
}

export default Navigation;