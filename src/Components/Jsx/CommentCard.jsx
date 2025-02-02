import React from 'react';
import "../Styles/CommentCard.css";
import {PageRoutes} from "../../Scripts/Const.js";
import {useNavigate} from "react-router-dom";
import defaultImage from "../../assets/mascot1.png";

// eslint-disable-next-line react/prop-types
function CommentCard({comment}) {
    // eslint-disable-next-line react/prop-types
    let {user_id, name, profile_picture_url: image, comment_text} = comment;
    if (!image || image === "") image = defaultImage;
    const navigate = useNavigate();
    return (
        <div className="comment-card">
            <img className="user-avatar" src={image} alt="User"/>
            <div className={"text"}>
                <p className="user-name" onClick={() => navigate(PageRoutes.PublicProfile + user_id)}>{name}</p>
                <p className={"comment-text"}>{comment_text.toString().trim()}</p>
            </div>
        </div>
    );
}

export default CommentCard;