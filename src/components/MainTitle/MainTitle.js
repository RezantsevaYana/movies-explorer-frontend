import React from "react";

function MainTitle(props) {
    return (
        <div className="title__container">
                <p className="title">
                    {props.title}
                </p>
            </div>
    );
}

export default MainTitle;