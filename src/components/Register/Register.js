import React from "react";
import { Link } from "react-router-dom";
import { useFormValidation } from "../../utils/formValidation.js";

function Register({ onRegister, registerError, setRegisterError }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

    // обработчики изменения инпутов
    function handleInputChange(evt) {
        handleChange(evt);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({ email: values.email, name: values.name, password: values.password });
        resetForm();
    }


    return (
        <section className="login">
            <div className="sign__header">
                <Link to="/"><div className="header__logo header__logo_sign"></div></Link>
                <h2 className="sign__title">Добро пожаловать!</h2>
            </div>
            <form className="sign__form" onSubmit={handleSubmit}>
                <div className="sign__item">
                    <label className="sign__label">Имя</label>
                    <input className="sign__input" type="name" name="name" required minLength="2" maxLength="30"
                        value={values.name || ""}
                        onChange={handleInputChange}></input>
                    <span className="error sign__input-error">{errors.name}</span>
                </div>
                <div className="sign__item">
                    <label className="sign__label">E-mail</label>
                    <input className="sign__input" type="email" name="email" required minLength="2" maxLength="30"
                        value={values.email || ""}
                        onChange={handleInputChange}></input>
                    <span className="error sign__input-error">{errors.email}</span>
                </div>
                <div className="sign__item">
                    <label className="sign__label">Пароль</label>
                    <input className="sign__input" type="password" name="password" required minLength="2" maxLength="30"
                        value={values.password || ""}
                        onChange={handleInputChange}></input>
                    <span className="error sign__input-error">{errors.password}</span>
                </div>
                <div className="sign__buttons sign__buttons_register">
                    <span className="error-message">{registerError}</span>
                    <button className={isValid ? "sign__button" : "sign__button sign__button_invalid"} type="submit" disabled={!isValid}>
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