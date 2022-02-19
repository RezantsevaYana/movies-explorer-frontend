import React from "react";
import { Navlink } from "react-router-dom"

function MoviesCard(props) {
    return (
        <figure className="movies-card">
            <figcaption className="movies-card__caption">
                <div className="movies-card__text">
                    <p className="movies-card__title">33 слова о дизайне</p>
                    <p className="movies-card__length">1ч 47м</p>
                </div>
                <button className="movies-card__save">
                    <div className={`movies-card__save-img ${ props.isSaved ? "movies-card__save_active" : "" }`}/>
                </button>
            </figcaption>
            <a className="movies-card__link">
                <img className="movies-card__img" src={props.film} alt="Превью фильма"/>
            </a>
        </figure>
    );
}

export default MoviesCard;