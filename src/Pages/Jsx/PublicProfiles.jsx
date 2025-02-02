import NavBar from "../../Components/Jsx/NavBar";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import API from "../../Scripts/API.js";
import {Times} from "../../Scripts/Const.js";
import UserCard from "../../Components/Jsx/UserCard.jsx";

function PublicProfiles() {

    const [filter, setFilter] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [page_no, setPageNo] = React.useState(1);
    const {data, isFetching} = useQuery({
        queryKey: ["get_users", page_no],
        queryFn: () => API.getAllUsers(page_no),
        keepPreviousData: true,
        cacheTime: Times.Minute,
        staleTime: Times.Minute,
    });
    const {data: searchData, refetch: refetchSearch, isFetching: isSearching} = useQuery({
        queryKey: ["search_users", search],
        queryFn: () => API.searchUsers(search),
        keepPreviousData: true,
        cacheTime: Times.Minute,
        staleTime: Times.Minute,
        enabled: false,
    })
    //preloading few pages.
    useQuery({
        queryKey: ["get_users", page_no + 1],
        queryFn: () => API.getAllUsers(page_no + 1),
        keepPreviousData: true,
        cacheTime: Times.Minute * 10,
        staleTime: Times.Minute * 2,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const pagesArray = Array(data?.total_pages)
        .fill()
        .map((_, i) => i + 1);


    const handleSearch = (e) => {
        e.preventDefault();

    };
    return (
        <div className="page">
            <NavBar/>
            <form className={"flex login-form"} onClick={handleSearch}>
                <label htmlFor="search">Search</label>
                <input id="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit" onClick={refetchSearch} disabled={isSearching}>Search</button>
            </form>
            <div className="flex">
                {(searchData?.users ?? [])
                    .map((user) => {
                        return (
                            <UserCard
                                key={user.user_id}
                                id={user.user_id}
                                image={user.profile_picture_url}
                                name={user.name}
                                bio={user.bio}
                            />
                        );
                    })}
            </div>
            <form onSubmit={handleSubmit} className="flex login-form">
                <label htmlFor="filter">Filter</label>
                <input
                    type="text"
                    id="filter"
                    name="filter"
                    onChange={(e) => setFilter(e.target.value.toLowerCase())}
                    placeholder="Filter by title or description"
                    value={filter}
                />
            </form>
            {
                isFetching && <div className="link-like" style={{
                    color: "var(--primary-color)",
                    fontSize: "1.5rem",
                    textAlign: "center",
                }}>Loading...</div>
            }
            <div className="flex">
                {pagesArray.map((page) => {
                    return (
                        <button
                            key={page}
                            onClick={() => setPageNo(page)}
                            className={page === page_no ? "secondary-button" : ""}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
            <div className="flex">
                <button onClick={() => setPageNo(page_no - 1)} disabled={page_no === 1}>
                    Previous
                </button>
                <button
                    onClick={() => setPageNo(page_no + 1)}
                    disabled={page_no === (data?.total_pages ?? 1)}
                >
                    Next
                </button>
            </div>

            <div className="flex card-container">
                {(data?.users ?? [])
                    .filter(
                        (user) =>
                            user.name.toLowerCase().includes(filter) ||
                            user.bio.toLowerCase().includes(filter)
                    )
                    .map((user) => {
                        return (
                            <UserCard
                                key={user.user_id}
                                id={user.user_id}
                                image={user.profile_picture_url}
                                name={user.name}
                                bio={user.bio}
                            />
                        );
                        a
                    })}
            </div>
        </div>
    );
}

export default PublicProfiles;
