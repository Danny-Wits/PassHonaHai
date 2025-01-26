import React from "react";
import {useParams} from "react-router-dom";
import NavBar from "../../Components/Jsx/NavBar";
import {enqueueSnackbar} from "notistack";
import API from "../../Scripts/API";
import {useMutation, useQuery, useQueryClient,} from "@tanstack/react-query";
import {useAuth} from "../../Context";
import {Times} from "../../Scripts/Const";

function Dashboard() {
    const {name} = useParams();
    const picElement = React.useRef(null);
    const {user_info} = useAuth();
    const user_id = user_info?.user_id ?? 0;
    const {data} = useQuery({
        queryKey: ["user_pic", user_id],
        queryFn: () => API.getProfilePic(user_id),
        staleTime: Times.Minute * 10,
    });
    const queryClient = useQueryClient();

    const {mutate: uploadProfilePic, isFetching} = useMutation({
        mutationFn: (data) => API.uploadProfilePic(data.user_id, data.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["user_pic"]);
            if (data.error) return enqueueSnackbar(data.error, {variant: "error"});
            enqueueSnackbar("Profile Pic Uploaded", {variant: "success"});
        },
        onError: (error) => {
            enqueueSnackbar(error.message, {variant: "error"});
        },
        retry: false,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = user_info.user_id ?? 0;
        if (picElement.current.files[0]) {
            const file = picElement.current.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                data.profile_picture = reader.result;
                uploadProfilePic({
                    user_id: user_id,
                    data: {
                        blob: reader.result.split(",")[1],
                        type: "." + file.name.split(".")[1],
                    },
                });
            };
            reader.readAsDataURL(file);
        } else {
            enqueueSnackbar("Please select a file", {variant: "error"});
        }
    };
    return (
        <div>
            <NavBar/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pic">Upload Profile Pic</label>
                <input
                    ref={picElement}
                    type="file"
                    id="pic"
                    name="pic"
                    accept=".pdf,.jpg,.jpeg,.png"
                />
                <button type="submit" disabled={isFetching}>
                    {isFetching ? "Uploading..." : "Upload"}
                </button>
            </form>

            <img src={data?.profile_picture} alt="" width={200} height={200}/>
        </div>
    );
}

export default Dashboard;
