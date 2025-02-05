import React from "react";
import "../Styles/Card.css";
import defaultImage from "../../assets/mascot1.png";
import { useQueryClient } from "@tanstack/react-query";
import { PageRoutes } from "../../Scripts/Const.js";
import { useNavigate } from "react-router-dom";
import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
  Textarea,
} from "@mantine/core";

// eslint-disable-next-line react/prop-types
function MaterialCard({ material }) {
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types
  let {
    material_id: id,
    field,
    branch,
    standard,
    download_link,
    title,
    description,
  } = material;
  if (!field) field = "Unknown";
  if (!branch) branch = "Unknown";
  if (!standard) standard = 10;

  // eslint-disable-next-line react/prop-types
  const extention = download_link.substring(
    download_link.length - 3,
    download_link.length
  );
  const notVisible = ["pdf", "docx", "ppt"];
  if (notVisible.includes(extention)) {
    download_link = defaultImage;
  }
  const queryClient = useQueryClient();

  // const {mutate: deleteMaterial, isLoading: isDeleting} = useMutation(
  //     () => API.deleteStudyMaterial(id),
  //     {
  //         onSuccess: (data) => {
  //             if (data.error) {
  //                 enqueueSnackbar(data.error, {variant: "error"});
  //                 return
  //             }
  //             queryClient.refetchQueries(["get_material_of_user"]).then(() => {
  //             });
  //             queryClient.refetchQueries(["get_material"]).then(() => {
  //             });
  //         },
  //         onError: (error) => {
  //             enqueueSnackbar(error.message, {variant: "error"})
  //         }
  //     }
  // )
  const goToDetails = () => {
    navigate(PageRoutes.StudyMaterial + id, {
      state: material,
    });
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={350} mih={340}>
      <Card.Section>
        <AspectRatio ratio={16 / 9}>
          <Image src={download_link} alt="Study Material" />
        </AspectRatio>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600} size="sm" maw={150} truncate={"end"} c="bright">
          {title}
        </Text>
        <Badge>{field}</Badge>
      </Group>

      <Textarea
        size="sm"
        c="dimmed"
        variant="unstyled"
        minRows={3}
        maxRows={3}
        readOnly
      >
        {description}
      </Textarea>

      <Button
        color="blue"
        fullWidth
        mt="auto"
        radius="md"
        variant="default"
        onClick={goToDetails}
      >
        View
      </Button>
    </Card>

    // <div className="card">
    //   <div className={"category"}>{branch}</div>
    //   <img
    //     className="avatar"
    //     src={download_link}
    //     alt="Avatar"
    //     onClick={goToDetails}
    //   />
    //   <div className="text">
    //     <p className="title" onClick={goToDetails}>
    //       {title}
    //     </p>
    //     <p className="subtitle">{description}</p>
    //     <p className="subtitle">
    //       {standard} - {field}{" "}
    //     </p>
    //     {download_link && (
    //       <p
    //         className="link link-like"
    //         onClick={() => window.open(download_link)}
    //       >
    //         Download
    //       </p>
    //     )}
    //   </div>
    //   <button onClick={() => deleteMaterial()}>View</button>
    // </div>
  );
}

export default MaterialCard;
