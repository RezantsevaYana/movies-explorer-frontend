import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { useLocation } from 'react-router';

function Movies({ onHeaderOpen,
    handleSaveMovies,
    handleDeleteMovies,
    moviesList,
    setMoviesList,
    favoriteList,
    moviesCount,
    setMoviesCount,
    addMovies,
    setAddMovies,
    isLoading,
    setIsLoading, }) {
    const routes = useLocation();

    //  const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState('')

    const valueData = localStorage.getItem('value');
    const [value, setValue] = React.useState(valueData && routes.pathname === '/movies' ? valueData : '');

    // стейт-переменная состояния тумблера
    const checkBoxStatus = JSON.parse(localStorage.getItem('checkBoxStatus'));
    const [checked, setChecked] = useState(false);
    const [shortList, setShortList] = useState([]);

    // фильтрация массива через поиск по ключевому слову
    useEffect(() => {
        const filterMovies = JSON.parse(localStorage.getItem('movies')).filter((movie) =>
            movie.nameRU.toLowerCase().indexOf(value.toLowerCase()) > -1)
        if (filterMovies.length) {
            setMoviesList(filterMovies)
            localStorage.setItem('foundMovies', JSON.stringify(filterMovies))
        } else {
            setMoviesList([]);
            setMessage('Ничего не найдено');
        }
    }, [value])

    function handleSubmitSearchForm(value) {
        setValue(value);
    }


    // фильтрация массива через установку тумблера (продолжительность фильма)
    useEffect(() => {
        if (checked) {
            const newShortList = moviesList.filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortList(newShortList) : setMoviesList([])
        } else {
            setShortList([]);
            setMessage('Ничего не найдено');
        }
    }, [checked])


    return (
        <section className="movies">
            <SearchForm setMoviesCount={setMoviesCount}
                setMoviesList={setMoviesList}
                handleSubmitSearchForm={handleSubmitSearchForm}
                checkBoxStatus={checkBoxStatus}
                checked={checked}
                setChecked={setChecked}
            >
            </SearchForm>
            <MoviesCardList
                setMoviesCount={setMoviesCount}
                moviesCount={moviesCount}
                moviesList={checked ? shortList : moviesList}
                handleSaveMovies={handleSaveMovies}
                handleDeleteMovies={handleDeleteMovies}
                favoriteList={favoriteList}
                addMovies={addMovies}
                setAddMovies={setAddMovies}
                message={message}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <Footer></Footer>
        </section>


    );
}

export default Movies;
