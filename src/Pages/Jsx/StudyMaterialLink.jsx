import { Center, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../Scripts/API";
import { PageRoutes } from "../../Scripts/Const";

function StudyMaterialLink() {
  const navigate = useNavigate();
  const material_id = useParams()?.id ?? null;
  const { data: materialData, status } = useQuery({
    queryKey: ["get_material", material_id],
    queryFn: () => API.getStudyMaterialByID(material_id),
  });
  useEffect(() => {
    if (status === "success") {
      navigate(PageRoutes.StudyMaterial, {
        state: { material: materialData?.material },
      });
    }
  }, [materialData, status]);
  return (
    <Center h={"100vh"}>
      <Loader size="lg" variant="bars"></Loader>
    </Center>
  );
}
export default StudyMaterialLink;
