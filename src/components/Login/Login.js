import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../utils/formValidation.js";

function Login({ onLogin, loginError, isLoading }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  //  const [disabled, setDisabled] = useState(false)

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({ email: values.email, password: values.password })
        resetForm();
    }

    function handleInputChange(evt) {
        handleChange(evt);
    }


    return (
        <section className="login">
            <div className="sign__header">
                <Link to="/"><div className="header__logo header__logo_sign"></div></Link>
                <h2 className="sign__title">Рады видеть!</h2>
            </div>
            <form className="sign__form" onSubmit={handleSubmit}>
                <div className="sign__item">
                    <label className="sign__label">E-mail</label>
                    <input className="sign__input"
                        type="email"
                        name="email"
                        required
                        minLength="2"
                        maxLength="30"
                        value={values.email || ""}
                        onChange={handleInputChange}
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                        disabled={isLoading}
                        >
                        </input>
                    <span className="error sign__input-error">{errors.email}</span>
                </div>
                <div className="sign__item">
                    <label className="sign__label">Пароль</label>
                    <input className="sign__input" type="password" name="password" required minLength="2" maxLength="30"
                        value={values.password || ""}
                        onChange={handleInputChange}
                        disabled={isLoading}></input>
                    <span className="error sign__input-error">{errors.password}</span>
                </div>
                <div className="sign__buttons">
                    <span className="error-message">{loginError}</span>
                    <button className={isValid ? "sign__button" : "sign__button sign__button_invalid"} type="submit" disabled={!isValid}>
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