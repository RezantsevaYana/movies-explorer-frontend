import React, { useState, useEffect } from 'react'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router';



function SavedMovies({
    handleDeleteMovies,
    handleSaveMovies,
    moviesList,
    setMoviesList,
    moviesCount,
    setMoviesCount,
    addMovies,
    setAddMovies,
    isLoading,
    setIsLoading,
    favoriteList,
    setFavoriteList,
    favoriteListForRender,
    setFavoriteListForRender,
    shortList,
    setShortList,
 }) {


    const routes = useLocation()
    const valueData = localStorage.getItem('value')
    const [value, setValue] = React.useState(valueData && routes.pathname === '/movies' ? valueData : '')

    // стейт-переменная состояния тумблера
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = React.useState('');



    // фильтрация через строку поиска
    useEffect(() => {
    //    favoriteList.length ? setMessage('') : setMessage('Ничего не найдено') 
        const filterMovies = favoriteList.filter((movie) =>
            movie.nameRU.toLowerCase().indexOf(value.toLowerCase()) > -1)
        if (filterMovies.length) {
            setFavoriteListForRender(filterMovies);
            localStorage.setItem('foundSaveMovies', JSON.stringify(favoriteList));
        } else {
            setFavoriteListForRender([])
            setMessage('Ничего не найдено');
        }
    }, [value])

    console.log(checked)
    //console.log(checkBoxStatus)

    function handleSubmitSearchForm(value) {
        setValue(value);
    }

    // фильтрация массива через установку тумблера (продолжительность фильма)
    useEffect(() => {
        if (checked && favoriteList.length) {
            const newShortList = JSON.parse(localStorage.getItem('foundSaveMovies')).filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortList(newShortList) : setShortList([])
                localStorage.setItem('foundSaveMovies', JSON.stringify(newShortList));
        } else {
            setShortList([])
            setMessage('Ничего не найдено');
        }
    }, [checked])


    function handleCheckboxChange(isCheckboxOn) {
        setChecked(isCheckboxOn)
    }


    return (
        <section className="movies movies_saved">
            <SearchForm setMoviesCount={setMoviesCount}
                value={value}
                setValue={setValue}
                handleSubmitSearchForm={handleSubmitSearchForm}
                handleCheckboxChange={handleCheckboxChange}
                checked={checked}
                setChecked={setChecked}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            >
            </SearchForm>
            <MoviesCardList
                favoriteListForRender={checked ? shortList : favoriteListForRender}
                favoriteList={favoriteList}
                handleDeleteMovies={handleDeleteMovies}
                moviesList={moviesList}
                setMoviesList={setMoviesList}
                setMoviesCount={setMoviesCount}
                moviesCount={moviesCount}
                addMovies={addMovies}
                setAddMovies={setAddMovies}
                message={message}
                setMessage={setMessage}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            <Footer></Footer>
        </section>
    );
}

export default SavedMovies;
