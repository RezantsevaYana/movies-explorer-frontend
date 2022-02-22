import React from "react";

function Techs(props) {
    return (
        <article className="techs" id="techs">
            <div className="title__container-techs">
                <p className="title">
                    Технологии
                </p>
            </div>
            <h2 className="techs__title">
                7 технологий
            </h2>
            <p className="techs__subtitle">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <ul className="table__techs">
                <li className="techs__cell"><p className="techs__item">HTML</p></li>
                <li className="techs__cell"><p className="techs__item">CSS</p></li>
                <li className="techs__cell"><p className="techs__item">JS</p></li>
                <li className="techs__cell"><p className="techs__item">React</p></li>
                <li className="techs__cell"><p className="techs__item">Git</p></li>
                <li className="techs__cell"><p className="techs__item">Express.js</p></li>
                <li className="techs__cell"><p className="techs__item">mongoDB</p></li>
            </ul>
        </article>
    );
}

export default Techs;