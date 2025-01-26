import React from "react";
import "../Styles/Card.css";

function Card({ image, title, subtitle, link }) {
  return (
    <div className="card">
      <img className="avatar" src={image} alt="Avatar" />
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
