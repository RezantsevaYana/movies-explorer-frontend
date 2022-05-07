import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from "../../utils/formValidation.js";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormValidation();

    const disabled = currentUser.email === values.email && currentUser.name === values.name;


    function hahdleSubmit(evt) {
        evt.preventDefault();
        resetForm();
        props.onUpdateUser({
            name: values.name,
            email: values.email,
        })
    }

    function handleInputChange(evt) {
        handleChange(evt);
    }

    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);



    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__name">Привет, {currentUser.name}!</h2>
                <form className="profile__form" onSubmit={hahdleSubmit}>
                    <label className="profile__label">Имя
                        <input className="profile__input"
                            type="name"
                            name="name"
                            required
                            minLength="2"
                            maxLength="30"
                            placeholder={currentUser.name}
                            value={values.name || ""}
                            onChange={handleInputChange}>
                        </input>
                    </label>
                    <div className="profile__line"></div>
                    <span className="error sign__input-error">{errors.name}</span>
                    <label className="profile__label">E-mail
                        <input className="profile__input"
                            type="email"
                            name="email"
                            required
                            minLength="2"
                            maxLength="30"
                            placeholder={currentUser.email}
                            value={values.email || ""}
                            pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                            onChange={handleInputChange}>
                        </input>
                    </label>
                    <span className="error sign__input-error">{errors.email}</span>
                    <div className="profile__links">
                        <button className={isValid ? "profile__link" : "profile__link profile__link_invalid"} type="submit" disabled={disabled}>Редактировать</button>
                        <button className="profile__button" onClick={props.signOut} type="button">Выйти из аккаунта</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Profile;