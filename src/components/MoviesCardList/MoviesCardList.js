import React from "react";
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


function MoviesCardList(props) {
    return (
        <section className="movies-list">
            <MoviesCard film={film1}></MoviesCard>
            <MoviesCard film={film2}></MoviesCard>
            <MoviesCard film={film3}></MoviesCard>
            <MoviesCard film={film4}></MoviesCard>
            <MoviesCard film={film5}></MoviesCard>
            <MoviesCard film={film6}></MoviesCard>
            <MoviesCard film={film7}></MoviesCard>
            <MoviesCard film={film8}></MoviesCard>
            <MoviesCard film={film9}></MoviesCard>
            <MoviesCard film={film10}></MoviesCard>
            <MoviesCard film={film11}></MoviesCard>
            <MoviesCard film={film12}></MoviesCard>
        </section>
    );
}

export default MoviesCardList;