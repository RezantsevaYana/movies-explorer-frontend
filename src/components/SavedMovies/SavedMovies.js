import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import MoviesCard from "../MoviesCard/MoviesCard";
import film1 from "../../images/film1.jpg";
import film2 from "../../images/film2.jpg"
import film3 from "../../images/film3.jpg";
import film4 from "../../images/film4.jpg";

function SavedMovies({onHeaderOpen}) {
    return (
        <section className="movies movies_saved">
            <Header>
                <Navigation onHeaderOpen={onHeaderOpen}/>
            </Header>
            <SearchForm></SearchForm>
            <MoviesCardList>
                <MoviesCard film={film1}></MoviesCard>
                <MoviesCard film={film2}></MoviesCard>
                <MoviesCard film={film3}></MoviesCard>
                <MoviesCard film={film4}></MoviesCard>
            </MoviesCardList>
        </section>


    );
}

export default SavedMovies;