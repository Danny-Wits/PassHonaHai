import React from "react";
import NavBar from "../../Components/Jsx/NavBar";
import "../Styles/Login.css";
import {useQuery} from "@tanstack/react-query";
import API from "../../Scripts/API";
import Card from "../../Components/Jsx/Card";
import defaultImage from "../../assets/mascot1.png";
import {Times} from "../../Scripts/Const";

function Explore() {
    const [filter, setFilter] = React.useState("");
    const [page_no, setPageNo] = React.useState(1);

    const {data} = useQuery({
        queryKey: ["get_material", page_no],
        queryFn: () => API.getStudyMaterials(page_no),
        keepPreviousData: true,
        cacheTime: Times.Minute,
        staleTime: Times.Minute,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const pagesArray = Array(data?.total_pages)
        .fill()
        .map((_, i) => i + 1);
    //   material_id: 8
    //   user_id: 6;
    //   title: "Newest";
    //   description: "new new ";
    //   view_count: 1;
    //   file_url: "6_1736965669.png";
    //   file_type: "image/png";
    //   category: "new";
    //   tags: "new";
    //   upload_date: "2025-01-15 18:27:32";
    //   download_link: "http://localhost/projprogrammer/download.php?file=6_1736965669.png";
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
                    disabled={page_no === data?.total_pages ?? 1}
                >
                    Next
                </button>
            </div>
            <div className="flex card-container">
                {data?.materials
                    .filter(
                        (material) =>
                            material.title.toLowerCase().includes(filter) ||
                            material.description.toLowerCase().includes(filter)
                    )
                    .map((material) => {
                        return (
                            <Card
                                key={material.material_id}
                                image={material.image ?? defaultImage}
                                title={material.title}
                                subtitle={material.description}
                                link={material.download_link}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default Explore;
