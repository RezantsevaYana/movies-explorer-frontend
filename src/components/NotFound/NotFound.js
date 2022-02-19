import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
    return (
        <section className="not-found">
            <div className="not-found__text">
                <h1 className="not-found__number">404</h1>
                <p className="not-found__title">Страница не найдена</p>
            </div>
            <Link to=''><button className="not-found__button">Назад</button></Link>
        </section>
    );
}

export default NotFound;