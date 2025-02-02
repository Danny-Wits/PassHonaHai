import React from 'react';
import NavBar from "../../Components/Jsx/NavBar.jsx";
import {Navigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import API from "../../Scripts/API.js";
import {useAuth} from "../../Context.jsx";
import {PageRoutes, Times} from "../../Scripts/Const.js";
import {enqueueSnackbar} from "notistack";
import UserCard from "../../Components/Jsx/UserCard.jsx";

const Profile = () => {
    const id = parseInt(useParams().id) ?? 0;

    const {user_info} = useAuth();
    const queryClient = useQueryClient();
    const {data: senior_data, isFetching: isFetchingSenior} = useQuery(["get_seniors", user_info?.user_id],
        () => API.getSeniors(user_info?.user_id),
        {staleTime: Times.Minute, keepPreviousData: true, enabled: !!user_info?.user_id});
    const {data: juniors_data, isFetching: isFetchingJunior} = useQuery(["get_juniors", user_info?.user_id],
        () => API.getJuniors(user_info?.user_id),
        {staleTime: Times.Minute, keepPreviousData: true, enabled: !!user_info?.user_id});
    const {data, isFetching} = useQuery(["get_user", id],
        () => API.getUserInfo(id),
        {staleTime: Times.Minute, keepPreviousData: true, enabled: !!user_info?.user_id});
    const person_info = data?.user_info;
    const seniors = senior_data?.seniors ?? [];
    const juniors = juniors_data?.juniors ?? [];
    let relationship = false;
    seniors.some((s) => {
        if (s.user_id === id) {
            relationship = "Senior";
            return true;
        }
    });
    juniors.some((j) => {
        if (j.user_id === id) {
            relationship = "Junior";
            return true;
        }
    });
    const {
        mutateAsync: makeSenior,
        isLoading,
    } = useMutation((data) => API.makeSenior(data.user_id, data.data)
        , {
            onSuccess: (data) => {
                if (data.error) {
                    enqueueSnackbar(data.error, {variant: "error"});
                    return;
                }
                queryClient.refetchQueries(["get_seniors", user_info?.user_id]).then(() => {
                });
                queryClient.refetchQueries(["get_juniors", user_info?.user_id]).then(() => {
                });
            }, onError: (error) => {
                enqueueSnackbar(error.message, {variant: "error"});
            }

        });
    //User to Dashboard
    if (id === user_info?.user_id || id === 0) return <Navigate to={PageRoutes.Dashboard + user_info.name}/>;

    const makePersonSenior = async () => {
        await makeSenior({user_id: user_info.user_id, data: {senior_id: id}});
    }
    return (
        <div className={"page"}>
            <NavBar/>

            <UserCard
                image={person_info?.profile_picture_url}
                name={person_info?.name}
                id={person_info?.user_id}
            />
            {!relationship ?
                (<button onClick={makePersonSenior}
                         disabled={isLoading || isFetching || isFetchingSenior || isFetchingJunior}>Make
                    Senior</button>)
                :
                (
                    <h2> Relationship : {relationship}</h2>
                )
            }
            <pre>
                json: {JSON.stringify(seniors, null, 2)}
                json: {JSON.stringify(juniors, null, 2)}
            </pre>
        </div>
    );
}

export default Profile;