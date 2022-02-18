import React from "react";
import { Link } from "react-router-dom";
import photo from "../../images/aboutme_photo.jpeg"

function AboutMe(props) {
    return (
        <article className="aboutMe" id="aboutme">
            <div className="title__container title__container_aboutMe">
                <p className="title">
                    Студент
                </p>
            </div>
            <article className="aboutMe__container">
                <div className="aboutMe__info">
                    <h2 className="aboutMe__name">
                        Яна
                    </h2>
                    <p className="aboutMe__profesion">
                        Фронтенд-разработчик, 25 лет
                    </p>
                    <p className="aboutMe__text">
                        Я живу в Санкт-Петербурге, закончила Политехнический университет Петра Великого кафедру атомной и тепловой энергетики.
                        На данный момент работаю по специальности, но  после окончания курса от Яндекс.Практикум есть амбиции сменить специальность на профессию Фронтенд-разработчика. 
                    </p>
                    <div className="aboutMe__social">
                        <a className="aboutMe__link" href="https://t.me/yaninoyy" target="_blank" rel="noreferrer">Telegram</a>
                        <a className="aboutMe__link" href="https://github.com/RezantsevaYana" target="_blank" rel="noreferrer">Github</a>
                    </div>
                    </div>
                    <img className="aboutMe__photo" src={photo} alt="фотография в портфолио"/>
            </article>

        </article>
    );
}

export default AboutMe;

