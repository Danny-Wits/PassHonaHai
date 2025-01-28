import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../../Components/Jsx/NavBar";
import {enqueueSnackbar} from "notistack";
import API from "../../Scripts/API";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth} from "../../Context";
import {PageRoutes, Times} from "../../Scripts/Const.js";
import UserCard from "../../Components/Jsx/UserCard.jsx";
import defaultImage from "../../assets/mascot1.png";

function Dashboard() {
    const {name} = useParams();
    const navigate = useNavigate();
    const picElement = React.useRef(null);
    const profilePic = React.useRef(null);
    const {user_info, refetch_user_info} = useAuth();

    const {
        data: seniorsData,
        status: seniorStatus
    } = useQuery(["get_seniors", user_info?.user_id], () => API.getSeniors(user_info?.user_id), {
        staleTime: Times.Minute * 10,
        enabled: !!user_info?.user_id
    });

    const {
        data: juniorsData,
        status: juniorStatus
    } = useQuery(["get_juniors", user_info?.user_id], () => API.getJuniors(user_info?.user_id), {
        staleTime: Times.Minute * 10,
        enabled: !!user_info?.user_id
    });
    if (seniorStatus === 'error') enqueueSnackbar("Error Fetching Seniors", {variant: "error"});
    if (juniorStatus === 'error') enqueueSnackbar("Error Fetching Juniors", {variant: "error"});
    const seniors = seniorsData?.seniors ?? [];
    const juniors = juniorsData?.juniors ?? [];


    const {mutate: uploadProfilePic, isLoading: uploadingProfilePic} = useMutation({
        mutationFn: (data) => API.uploadProfilePic(data.user_id, data.data),
        onSuccess: (data) => {
            refetch_user_info();
            if (data.error) {
                profilePic.current.src = user_info?.profile_picture_url ?? defaultImage;
                enqueueSnackbar(data.error, {variant: "error"});
                return;
            }
            enqueueSnackbar("Profile Pic Uploaded", {variant: "success"});
        },
        onError: (error) => {

            enqueueSnackbar(error.message, {variant: "error"});
        },
        retry: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = user_info?.user_id ?? 0;
        if (!picElement.current.files[0]) {
            enqueueSnackbar("Please select a file", {variant: "error"});
            return;
        }
        const file = picElement.current.files[0];
        profilePic.current.src = URL.createObjectURL(file);
        uploadProfilePic({user_id: user_id, data: file});
    };
    return (
        <div>
            <NavBar/>
            <img className={"avatar"} ref={profilePic}
                 src={!user_info?.profile_picture_url ? defaultImage : user_info?.profile_picture_url}
                 alt=""
                 width={200}
                 height={200}/>
            <div className={"section-header"}>{name}</div>
            <button onClick={() => navigate(PageRoutes.UploadMaterial)}>Upload Material</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pic">Upload Profile Pic</label>
                <input
                    ref={picElement}
                    type="file"
                    id="pic"
                    name="pic"
                    accept=".pdf,.jpg,.jpeg,.png"
                />
                <button type="submit" disabled={uploadingProfilePic}>
                    {uploadingProfilePic ? "Uploading..." : "Upload"}
                </button>
            </form>
            <div className={"section-header"}>Seniors</div>

            <div className={"user-card-container"}>

                {
                    seniors?.map((senior) => (
                        <UserCard key={senior?.user_id} image={senior?.profile_picture_url} name={senior?.name}
                                  id={senior?.user_id}/>
                    ))
                }    </div>

            <div className={"section-header"}>Juniors</div>
            {
                juniors?.map((junior) => (
                    <UserCard key={junior?.user_id} image={junior?.profile_picture_url} name={junior?.name}
                              id={junior?.user_id}/>
                ))
            }
        </div>
    );
}

export default Dashboard;
