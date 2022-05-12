import { useLocation } from 'react-router';
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";


function MoviesCardList({
  moviesList,
  setMoviesCount,
  moviesCount,
  favoriteList,
  handleSaveMovies,
  handleDeleteMovies,
  addMovies,
  setAddMovies,
  message,
  isLoading,
  setIsLoading,
  favoriteListForRender,
}) {

  const { pathname } = useLocation();



  function handleClick() {
    setMoviesCount(moviesCount + addMovies);
  }

  return (
    <>
      {isLoading ? (<Preloader />) :
        (
          <section className="movies-list">
            {pathname === '/movies' && moviesList &&
              moviesList.map((item, index) => {
                if (index + 1 <= moviesCount) {
                  return (
                    <MoviesCard
                      movie={item}
                      key={index}
                      handleSaveMovies={handleSaveMovies}
                      handleDeleteMovies={handleDeleteMovies}
                      favoriteList={favoriteList}
                    />
                  );
                } else {
                  return '';
                }
              })}
            {pathname === '/saved-movies' && favoriteListForRender &&
              favoriteListForRender.map((item, index) => {
                if (index + 1 <= moviesCount) {
                  return (
                    <MoviesCard
                      movie={item}
                      key={index}
                      handleDeleteMovies={handleDeleteMovies}
                      favoriteList={favoriteList}
                    />
                  );
                } else {
                  return '';
                }
              })}
          </section>
        )
      }
      {pathname === '/movies' && moviesList.length === 0 ? (
        <p className='error-message'>{message}</p>
      ) : pathname === '/saved-movies' && favoriteList.length === 0 ? (
        <p className='error-message'>{message}</p>
      ) : (
        ''
      )}
      {pathname === '/movies' && moviesCount < moviesList.length && 0 < moviesCount && (
        <section className="another-button__container">
          <button className="another-button" onClick={handleClick}>Ещё</button>
        </section>
      )}
    </>

  );
}

export default MoviesCardList;








