import React from "react";
import { Link } from "react-router-dom";


function Navigation(props) {
    return (
        <>
        <div className="navigation">
            <div className="header__link">
                    <Link to='/movies' className="header__movies">Фильмы</Link>
                    <Link to='/saved-movies' className="header__saved-movies">Сохраненные фильмы</Link>
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