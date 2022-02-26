import React from "react";

function Portfolio(props) {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">
                Портфолио
            </h3>
            <ul className="portfolio__container">
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://rezantsevayana.github.io/how-to-learn/" target="_blank">Статичный сайт <span className="portfolio__arrow">&#8599;</span></a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://rezantsevayana.github.io/russian-travel/index.html" target="_blank">Адаптивный сайт<span className="portfolio__arrow">&#8599;</span></a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="http://rezantseva.nomoredomains.rocks/" target="_blank">Одностраничное приложение<span className="portfolio__arrow">&#8599;</span></a>
                </li>
            </ul>

           

        </section>
    );
}

export default Portfolio;