import React from "react";
import { Link } from "react-router-dom";


function HeaderPopup(props) {
    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close" onClick={props.onClose}></button>
                <ul className="header__mobile-list">
                    <li className="header__mobile-item"><Link to='/' className="header__mobile" onClick={props.onClose}>Главная</Link></li>
                    <li className="header__mobile-item"><Link to='/movies' className="header__mobile" onClick={props.onClose}>Фильмы</Link></li>
                    <li className="header__mobile-item"><Link to='/saved-movies' className="header__mobile" onClick={props.onClose}>Сохраненные фильмы</Link></li>
                </ul>
                <Link to="/profile" className="account__link account__link_mobile" onClick={props.onClose}>
                    <div className="account__logo" />
                    Aккаунт
                </Link>
            </div>
        </div>
    );
}

export default HeaderPopup;