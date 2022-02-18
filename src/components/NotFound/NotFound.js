import React from "react";

function NotFound(props) {
    return (
        <section className="not-found">
            <div className="not-found__text">
                <h1 className="not-found__number">404</h1>
                <p className="not-found__title">Страница не найдена</p>
            </div>
            <button className="not-found__button">Назад</button>
        </section>
    );
}

export default NotFound;