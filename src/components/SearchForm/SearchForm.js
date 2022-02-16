import React from "react";

function SearchForm(props) {
    return (
        <form className="search__form">
            <div className="search__logo" />
            <div className="search__container">
                <input className="search__input" placeholder='Фильм' type='search'/>
                <button className="search__start">
                        <div className="search__start-img"/>
                </button>
            </div>
            <label className="filter">
                <input className="filter__checkbox" type="checkbox"></input>
                <span className="filter__checkbox-slider"></span>
                <span className="filter__text">Короткометражки</span>
            </label>
        </form>
    );
}

export default SearchForm;