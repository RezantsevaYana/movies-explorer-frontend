import React from "react";


function MoviesCardList(props) {
    return (
        <section className="movies-list">
            {props.children}
        </section>
    );
}

export default MoviesCardList;