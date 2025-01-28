import "../Styles/UserCard.css"
import {useNavigate} from "react-router-dom";
import {PageRoutes} from "../../Scripts/Const.js";
import defaultImage from "../../assets/mascot1.png";
// eslint-disable-next-line react/prop-types
const UserCard = ({image, name, id = 0}) => {
    const navigate = useNavigate();
    if (!image || image === "") image = defaultImage
    return (
        <div className="user-card">
            <img className="avatar" src={image} alt="User"/>
            <div className="user-card-name" onClick={() => {
                navigate(PageRoutes.PublicProfile + id)
            }}>{name}</div>
        </div>
    );
};
export default UserCard;