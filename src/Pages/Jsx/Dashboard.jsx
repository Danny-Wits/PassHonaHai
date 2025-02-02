import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "../../Components/Jsx/NavBar";
import {enqueueSnackbar} from "notistack";
import API from "../../Scripts/API";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth} from "../../Context";
import {Fields, PageRoutes, Standards, Times} from "../../Scripts/Const.js";
import UserCard from "../../Components/Jsx/UserCard.jsx";
import defaultImage from "../../assets/mascot1.png";
import MaterialCard from "../../Components/Jsx/MaterialCard.jsx";

function Dashboard() {
    const {name} = useParams();
    const {user_info, refetch_user_info} = useAuth();
    const navigate = useNavigate();
    const picElement = React.useRef(null);
    const profilePic = React.useRef(null);
    const [page_no, setPageNo] = React.useState(1);
    const [userFormData, setUserFormData] = React.useState({});
    useEffect(() => {
        if (user_info) {
            if (name !== user_info?.name) navigate(PageRoutes.Dashboard + user_info?.name);
            setUserFormData({
                name: user_info?.name ?? "",
                bio: user_info?.bio ?? "",
                standard: user_info?.standard ?? 10,
                field: user_info?.field ?? "Science",
                branch: user_info?.branch ?? "Computer Science",
                gender: user_info?.gender ?? "unknown",
            });
        }
    }, [user_info, name, navigate]);
    //Relation Fetch
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

    const {data: DataStudyMaterialsOfUser} = useQuery(
        ["get_material_of_user", page_no],
        () => API.getStudyMaterialsOfUser(user_info?.user_id, page_no),
        {
            staleTime: Times.Minute * 10,
            enabled: !!user_info?.user_id,
            keepPreviousData: true,
        }
    );
    const studyMaterialsOfUser = DataStudyMaterialsOfUser?.materials ?? [];
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
    const handlePicSubmit = async (e) => {
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

    const {mutate: updateUserInfo, isLoading: updatingUserInfo} = useMutation({
        mutationFn: (data) => API.updateUserInfo(data.user_id, data.data),
        onSuccess: (data) => {
            refetch_user_info();
            if (data.error) {
                enqueueSnackbar(data.error, {variant: "error"});
                return;
            }
            enqueueSnackbar("User Info Updated", {variant: "success"});
        },
        onError: (error) => {
            enqueueSnackbar(error.message, {variant: "error"});
        },
        retry: false,
    });

    const changeHandler = (e) => {
        e.preventDefault();
        setUserFormData({...userFormData, [e.target.name]: e.target.value});
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const user_id = user_info?.user_id ?? 0;
        updateUserInfo({user_id: user_id, data: userFormData});
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
            <div className={"section-subheader"}>{user_info?.email}</div>
            <button onClick={() => navigate(PageRoutes.UploadMaterial)}>Upload Material</button>
            <form onSubmit={handlePicSubmit}>
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

            <form className={"login-form login-box"} onSubmit={handleEditSubmit}>
                <label htmlFor="name">Name</label>
                <input onChange={changeHandler} type="text" id="name" name="name" value={userFormData?.name ?? ""}
                />

                <label htmlFor="bio">Bio</label>
                <textarea onChange={changeHandler} name="bio" id="bio" cols="30" rows="10"
                          value={userFormData?.bio ?? ""}></textarea>
                <label htmlFor="standard">Standard</label>
                <select name="standard" id="standard" onChange={changeHandler} value={userFormData?.standard}>
                    {Standards.map(
                        (standard) => (
                            <option key={standard} value={standard}>{standard}</option>
                        )
                    )}
                </select>
                <label htmlFor="field">Field</label>
                <select onChange={changeHandler} name="field" id="field" value={userFormData?.field}>
                    {
                        Object.keys(Fields ?? []).map((field) => (
                            <option key={field} value={field}>{field}</option>
                        ))
                    }
                </select>

                <label htmlFor="branch">Branch</label>
                <select onChange={changeHandler} name="branch" id="branch" value={userFormData?.branch}>
                    {
                        Fields[userFormData?.field]?.map((field) => (
                            <option key={field} value={field}>{field}</option>
                        ))
                    }
                </select>
                <label htmlFor="gender">Gender</label>
                <select onChange={changeHandler} name="gender" id="gender" value={userFormData?.gender}>
                    <option value="unknown">{"Don't"} wanna share</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button type={"submit"}
                        disabled={updatingUserInfo}>{updatingUserInfo ? "Updating..." : "Update"}</button>
            </form>

            <div className={"section-header"}>Your Material</div>
            <div className={"card-container"}>
                {
                    studyMaterialsOfUser?.map((material) => (
                        <MaterialCard
                            material={material}
                            key={material?.material_id}
                        />
                    ))

                }
            </div>

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
