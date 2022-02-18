import React from "react";
import { Link } from "react-router-dom";


function SigninButton(props) {
    return (
            <div className="header__info">
                <Link to='/signup' className="header__login">Регистрация</Link>
                <Link to='/signin'><button className="header__button">Войти</button></Link>
            </div>
    );
}

export default SigninButton;