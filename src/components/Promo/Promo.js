import React from "react";
import NavTab from "../NavTab/NavTab";


function Promo(props) {
    return (
        <div className="promo__container">
            <h2 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
            </h2>
            <NavTab></NavTab>
        </div>
    );
}

export default Promo;