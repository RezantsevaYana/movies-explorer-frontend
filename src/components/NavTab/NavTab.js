import React from "react";


function NavTab(props) {
    return (
            <div className="nav">
                <ul className="nav__container">
                    <li><a href="#project" className="nav__container-link">О проекте</a></li>
                    <li><a href="#techs" className="nav__container-link">Технологии</a></li>
                    <li><a href="#aboutme" className="nav__container-link">Студент</a></li>
                </ul>
            </div>     
    );
}

export default NavTab;