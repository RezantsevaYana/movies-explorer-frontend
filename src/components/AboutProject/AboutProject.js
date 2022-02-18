import React from "react";

function AboutProject(props) {
    return (
        <article className="project" id="project">
            <div className="title__container">
                <p className="title">
                    О проекте
                </p>
            </div>
            <ul className="project__table">
                <li className="project__table-item">
                    <h2 className="project__table-title">
                        Дипломный проект включал 5 этапов
                    </h2>
                    <p className="project__table-text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </li>
                <li className="project__table-item">
                    <h2 className="project__table-title">
                        На выполнение диплома ушло 5 недель
                    </h2>
                    <p className="project__table-text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>
            <ul className="project__table project__table_time">
                <li className="project__table-item project__table-item_time project__table-item_time_dark">
                    <h2 className="project__table-title project__table-title_time  project__table-title_time_dark">
                        1 неделя
                    </h2>
                    <p className="project__table-text project__table-text_time">
                        Back-end
                    </p>
                </li>
                <li className="project__table-item project__table-item_time project__table-item_time_grey">
                    <h2 className="project__table-title project__table-title_time project__table-title_time_grey">
                        4 недели
                    </h2>
                    <p className="project__table-text project__table-text_time">
                        Front-end
                    </p>
                </li>
            </ul>
            

        </article>

    );
}

export default AboutProject;