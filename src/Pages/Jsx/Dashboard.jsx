import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/Jsx/NavBar";

function Dashboard() {
  const { name } = useParams();
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default Dashboard;
