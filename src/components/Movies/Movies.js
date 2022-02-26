import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import AnotherButton from "../AnotherButton/AnotherButton";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import MoviesCard from "../MoviesCard/MoviesCard";
import film1 from "../../images/film1.jpg";
import film2 from "../../images/film2.jpg"
import film3 from "../../images/film3.jpg";
import film4 from "../../images/film4.jpg";
import film5 from "../../images/film5.jpg";
import film6 from "../../images/film6.jpg";
import film7 from "../../images/film7.jpg";
import film8 from "../../images/film8.jpg";
import film9 from "../../images/film9.jpg";
import film10 from "../../images/film10.jpg";
import film11 from "../../images/film11.jpg";
import film12 from "../../images/film12.jpg";

function Movies({onHeaderOpen}) {
    return (
        <section className="movies">
            <Header>
                <Navigation onHeaderOpen={onHeaderOpen}></Navigation>
            </Header>
            <SearchForm></SearchForm>
            <MoviesCardList>
                <MoviesCard film={film1}>
                    <button className="movies-card__button movies-card__button_save movies-card__button_save_active" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film2}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film3}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film4}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film5}>
                    <button className="movies-card__button movies-card__button_save movies-card__button_save_active" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film6}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film7}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film8}>
                    <button className="movies-card__button movies-card__button_save movies-card__button_save_active" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film9}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film10}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film11}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
                <MoviesCard film={film12}>
                    <button className="movies-card__button movies-card__button_save" type="button">
                    </button>
                </MoviesCard>
            </MoviesCardList>
            <AnotherButton></AnotherButton>
            <Footer></Footer>
        </section>


    );
}

export default Movies;