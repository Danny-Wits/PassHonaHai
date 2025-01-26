import {useParams} from "react-router-dom";
import NavBar from "../../Components/Jsx/NavBar";

function PublicProfile() {
    const {name} = useParams();
    return (
        <div className="page">
            <NavBar/>
            PublicProfile : {name}
        </div>
    );
}

export default PublicProfile;
