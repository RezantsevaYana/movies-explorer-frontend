import React from "react";
import { Link } from "react-router-dom";

function Profile(props) {
    return (
        <section className="profile">
            <h2 className="profile__name">Привет, {props.name}!</h2>
            <form className="profile__form">
                <div className="profile__item">
                    <label className="profile__label">Имя</label>
                    <input className="profile__input" type="name" placeholder="Яна"></input>
                </div>
                <div className="profile__item">
                    <label className="profile__label">E-mail</label>
                    <input className="profile__input" type="email" placeholder="pochta@yandex.ru"></input>
                </div>
            </form>
            <div className="profile__links">
                <Link to="/" className="profile__link">Редактировать</Link>
                <Link to="/signin" className="profile__link">Выйти из аккаунта</Link>
            </div>

        </section>
    );
}

export default Profile;