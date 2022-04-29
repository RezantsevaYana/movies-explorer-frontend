import React, { useState } from "react";
import { Navlink, useLocation } from "react-router-dom";

function MoviesCard({ movie, handleSaveMovies, handleDeleteMovies, favoriteList }) {
    const [isSavedMovies, setIsSavedMovies] = useState(false);
    const routes = useLocation();


    function isSave() {
        return favoriteList.some((item) => item.movieId === movie.id);
    }


    const cardSaveButtonClassName = `movies-card__button movies-card__button_save ${isSave() ? "movies-card__button_save_active" : " "
        }`;

    function onSaveMovies() {
        setIsSavedMovies(isSavedMovies === false ? true : false);
        handleSaveMovies(movie);
    }

    function onDeleteMovies() {
        setIsSavedMovies(isSavedMovies === false ? true : false);
        handleDeleteMovies(movie);
    }


    function calculateTime() {
        return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    };

    const image = movie.image.url === undefined ? movie.image : `https://api.nomoreparties.co${movie.image.url}`


    return (
        <figure className="movies-card">
            <figcaption className="movies-card__caption">
                <div className="movies-card__text">
                    <p className="movies-card__title">{movie.nameRU}</p>
                    <p className="movies-card__length">{calculateTime()}</p>
                </div>
                {
                    routes.pathname === '/movies' ? (
                        <button className={cardSaveButtonClassName} type="button" onClick={isSave() ? onDeleteMovies : onSaveMovies} >
                        </button>
                    ) :
                        (
                            <button className="movies-card__button movies-card__button_delete" type="button" onClick={onDeleteMovies}>
                            </button>
                        )
                }
            </figcaption>
            <a className="movies-card__link" href={movie.trailerLink} target="_blank">
                <img className="movies-card__img" src={image} alt={movie.nameRu} />
            </a>
        </figure>
    );
}

export default MoviesCard;