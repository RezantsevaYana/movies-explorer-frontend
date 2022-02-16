import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import AnotherButton from "../AnotherButton/AnotherButton";

function Movies(props) {
    return (
        <section className="movies">
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
            <AnotherButton></AnotherButton>
        </section>


    );
}

export default Movies;