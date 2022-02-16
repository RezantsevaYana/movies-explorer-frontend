import React from "react";

function Footer(props) {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__columns">
                <p className="footer__copyright">&copy;2021</p>
                <ul className="footer__columns-links">
                    <li>
                        <a className="footer__columns-link" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a className="footer__columns-link" href="https://github.com/RezantsevaYana" target="_blank">Github</a>
                    </li>
                    <li>
                        <a className="footer__columns-link" href="https://t.me/yaninoyy" target="_blank">Telegram</a>
                    </li>
                </ul>
            </div>
        </footer>

    );
}

export default Footer;