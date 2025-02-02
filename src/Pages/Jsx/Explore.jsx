import React from "react";
import NavBar from "../../Components/Jsx/NavBar";
import "../Styles/Login.css";
import {useQuery} from "@tanstack/react-query";
import API from "../../Scripts/API";
import {Times} from "../../Scripts/Const";
import MaterialCard from "../../Components/Jsx/MaterialCard.jsx";

function Explore() {
    const [filter, setFilter] = React.useState("");
    const [page_no, setPageNo] = React.useState(1);

    const {data} = useQuery({
        queryKey: ["get_material", page_no],
        queryFn: () => API.getStudyMaterials(page_no),
        keepPreviousData: true,
        cacheTime: Times.Minute * 5,
        staleTime: Times.Minute * 5,
    });
    useQuery({
        queryKey: ["get_material", page_no + 1],
        queryFn: () => API.getStudyMaterials(page_no + 1),
        keepPreviousData: true,
        cacheTime: Times.Minute * 10,
        staleTime: Times.Minute * 5,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const pagesArray = Array(data?.total_pages)
        .fill()
        .map((_, i) => i + 1);

    return (
        <div className="page">
            <NavBar/>

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
            <div className="card-container">
                {data?.materials
                    .filter(
                        (material) =>
                            material.title.toLowerCase().includes(filter) ||
                            material.description.toLowerCase().includes(filter)
                    )
                    .map((material) => {
                        return (
                            <MaterialCard
                                key={material.material_id}
                                material={material}
                            />
                        );
                    })}
            </div>

        </div>

    );
}

export default Explore;
