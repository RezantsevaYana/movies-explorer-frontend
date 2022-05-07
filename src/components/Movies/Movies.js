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

    const [message, setMessage] = React.useState('')

    const valueData = localStorage.getItem('value');
    const [value, setValue] = React.useState(valueData && routes.pathname === '/movies' ? valueData : '');

    // стейт-переменная состояния тумблера
    const checkBoxStatus = JSON.parse(localStorage.getItem('checkBoxStatus'));

    const [checked, setChecked] = useState(false);
    const [shortList, setShortList] = useState([]);


    // фильтрация массива через поиск по ключевому слову
    useEffect(() => {
        const filterMovies = JSON.parse(sessionStorage.getItem('movies')).filter((movie) =>
            movie.nameRU.toLowerCase().indexOf(value.toLowerCase()) > -1)
        if (filterMovies.length) {
            setMoviesList(filterMovies);
            localStorage.setItem('foundMovies', JSON.stringify(filterMovies));
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
        if (checkBoxStatus) {
            const newShortList = JSON.parse(sessionStorage.getItem('movies')).filter(movie => movie.duration <= 40)
            setShortList(newShortList);
            localStorage.setItem('foundMovies', JSON.stringify(newShortList));
        } else {
            setShortList([]);
            setMessage('Ничего не найдено');
        }
    }, [checkBoxStatus])


    function handleCheckboxChange(isCheckboxOn) {
        setChecked(isCheckboxOn);
    }


    return (
        <section className="movies">
            <SearchForm setMoviesCount={setMoviesCount}
                setMoviesList={setMoviesList}
                handleSubmitSearchForm={handleSubmitSearchForm}
                handleCheckboxChange={handleCheckboxChange}
                checkBoxStatus={checkBoxStatus}
                checked={checked}
                setChecked={setChecked}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            >
            </SearchForm>
            <MoviesCardList
                setMoviesCount={setMoviesCount}
                moviesCount={moviesCount}
                moviesList={checkBoxStatus ? shortList : moviesList}
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
