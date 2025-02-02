import React from "react";
import "../Styles/Card.css";


// eslint-disable-next-line react/prop-types
function Card({image, title, subtitle}) {

    return (
        <div className="card">
            <img className="avatar" src={image} alt="Avatar"/>
            <div className="text">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
            </div>
        </div>
    );
}

export default Card;
