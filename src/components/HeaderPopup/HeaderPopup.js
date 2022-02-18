import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";


function HeaderPopup(props) {
    return (
        <div className="popup">
            <div className="popup__container">
                <button className="popup__close"></button>
                <ul className="header__mobile-list">
                    <li className="header__mobile-item"><Link to='/' className="header__mobile">Главная</Link></li>
                    <li className="header__mobile-item"><Link to='/movies' className="header__mobile">Фильмы</Link></li>
                    <li className="header__mobile-item"><Link to='/saved-movies' className="header__mobile">Сохраненные фильмы</Link></li>
                </ul>
                <Link to="/profile" className="account__link account__link_mobile">
                <div className="account__logo" />
                Aккаунт
                </Link>


            </div>
        </div>
    );
}

export default HeaderPopup;