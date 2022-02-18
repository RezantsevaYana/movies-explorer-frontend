import React from "react";
import{ Link } from "react-router-dom";

function Register(props) {
    return (
       <section className="login">
           <div className="sign__header">
              <Link to="/"><div className="header__logo header__logo_sign"></div></Link>
               <h2 className="sign__title">{props.title}</h2>
           </div>
           <form className="sign__form">
                <div className="sign__item">
                   <label className="sign__label">Имя</label>
                   <input className="sign__input" type="name" required minlength="2" maxlength="30"></input>
                   <span className="error sign__input-error"></span>
               </div>
               <div className="sign__item">
                   <label className="sign__label">E-mail</label>
                   <input className="sign__input" type="email" required minlength="2" maxlength="30"></input>
                   <span className="error sign__input-error"></span>
               </div>
               <div className="sign__item">
                   <label className="sign__label">Пароль</label>
                   <input className="sign__input" type="password" required minlength="2" maxlength="30"></input>
                   <span className="error sign__input-error"></span>
               </div>
               <div className="sign__buttons sign__buttons_register">
                <button className="sign__button" type="submit">
                    Зарегистрироваться
                </button>
                <p className="sign__subtitle">
                    Уже зарегистрированы?{" "}
                    <Link to="/signin" className="sign__link">
                        Войти
                    </Link>
                </p>
                </div>
           </form>

       </section>

    );
}

export default Register;