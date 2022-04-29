import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import moviesApi from "../../utils/MoviesApi.js";

function SearchForm(props) {
    const valueData = localStorage.getItem('value')
    const routes = useLocation();
    const [isEmpty, setIsEmpty] = useState(true);

    // стейт-переменная запроса
    const [value, setValue] = React.useState(valueData && routes.pathname === '/movies' ? valueData : '');

    // сохраняем положение тумблера в локальное хранилище
    const checkBoxStatus = JSON.parse(localStorage.getItem('checkBoxStatus'));


    // Обработчик изменения инпута обновляет стейт
    function handleChange(e) {
        setValue(e.target.value);
        if (routes.pathname === '/movies') {
            localStorage.setItem('value', e.target.value);
        }
    }


    function handleSubmit(evt) {
        props.handleSubmitSearchForm(value);
        evt.preventDefault();
        //   console.log('поиск');
        if (value) {
            props.setMoviesCount(12);
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }

    function onChangeCheckBox() {
        if (routes.pathname === '/movies' && props.checked === false) {
            localStorage.setItem('checkBoxStatus', true);
            props.setChecked(true);
        } else if (routes.pathname === '/movies' && props.checked === true) {
            localStorage.setItem('checkBoxStatus', false);
            props.setChecked(false);
        } else if (routes.pathname === '/saved-movies' && props.checked === false) {
            props.setChecked(true);
        } else if (routes.pathname === '/saved-movies' && props.checked === true) {
            props.setChecked(false);
        }
    }



    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit} noValidate>
                <div className="search__logo" />
                <div className="search__container">
                    <input className="search__input"
                        placeholder='Фильм'
                        type='search'
                        required
                        name="search"
                        value={value || ""}
                        onChange={handleChange}
                    />
                    <button className="search__start" type="submit">
                    </button>
                </div>
                <label className="filter">
                    <input className="filter__checkbox" type="checkbox" onChange={onChangeCheckBox} checked={props.checked}></input>
                    <span className="filter__checkbox-slider"></span>
                    <span className="filter__text">Короткометражки</span>
                </label>
            </form>
            <span className="error-message">{isEmpty ? "" : "Нужно ввести ключевое слово"}</span>
        </section>
    );
}

export default SearchForm;