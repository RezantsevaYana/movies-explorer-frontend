import React from "react";
import{ Link } from "react-router-dom";

function Login(props) {
    return (
       <section className="login">
           <div className="sign__header">
              <Link to="/"><div className="header__logo header__logo_sign"></div></Link>
               <h2 className="sign__title">{props.title}</h2>
           </div>
           <form className="sign__form">
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
               <div className="sign__buttons">
                    <button className="sign__button" type="submit">
                        Войти
                    </button>
                    <p className="sign__subtitle">
                        Ещё не зарегистрированы?{" "}
                        <Link to="/signup" className="sign__link">
                            Регистрация
                        </Link>
                    </p>
                </div>
           </form>
       </section>

    );
}

export default Login;