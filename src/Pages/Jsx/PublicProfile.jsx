import React from "react";
import { useParams } from "react-router-dom";
function PublicProfile() {
  const { name } = useParams();
  return <div>PublicProfile : {name}</div>;
}

export default PublicProfile;
