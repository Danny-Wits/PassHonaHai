import React from "react";
import "../Styles/Card.css";
import defaultImage from "../../assets/mascot1.png";

// eslint-disable-next-line react/prop-types
function Card({image, title, subtitle, link, category}) {
    // eslint-disable-next-line react/prop-types
    const extention = image.substr(-3)
    if (image === "" || extention === "pdf" || extention === "docx" || extention === "docx") {
        image = defaultImage;
    }
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
