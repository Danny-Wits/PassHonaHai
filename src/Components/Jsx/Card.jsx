import React from "react";
import "../Styles/Card.css";

// eslint-disable-next-line react/prop-types
function Card({image, title, subtitle, link, category}) {
    return (
        <div className="card">
            <div className={"category"}>{category}</div>
            <img className="avatar" src={image} alt="Avatar"/>
            <div className="text">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>

                {link && (
                    <p className="link link-like" onClick={() => window.open(link)}>
                        Download
                    </p>
                )}
            </div>
        </div>
    );
}

export default Card;
