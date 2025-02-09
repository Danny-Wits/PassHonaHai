import {
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Overlay,
  Pill,
  PillGroup,
  Skeleton,
  Text,
  Textarea,
  useComputedColorScheme,
} from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { LuTags } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/mascot1.png";
import API from "../../Scripts/API.js";
import { FieldsColor, PageRoutes } from "../../Scripts/Const.js";
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
    tags,
    user_id,
  } = material;
  const { data, isLoading: isLoadingUser } = useQuery(
    ["get_user", user_id],
    () => API.getUserInfo(user_id),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
  const user_info = data?.user_info ?? false;
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
    navigate(PageRoutes.StudyMaterial, {
      state: { material },
    });
  };
  const colorTheme = useComputedColorScheme();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={350} mih={340}>
      <Card.Section pos={"relative"}>
        <AspectRatio ratio={16 / 9}>
          <Image src={download_link} alt="Study Material" />
          <Overlay
            backgroundOpacity={colorTheme === "dark" ? 0.5 : 0.0}
            style={{ zIndex: 12 }}
          ></Overlay>
        </AspectRatio>
        <Badge
          pos="absolute"
          top={10}
          right={10}
          color={FieldsColor[field]}
          style={{
            zIndex: 401,
          }}
        >
          {field}
        </Badge>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600} size="sm" maw={100} truncate={"end"} c="bright">
          {title}
        </Text>
        {isLoadingUser ? (
          <Group w={100} justify="center" gap={3}>
            <Skeleton circle h={25} w={"25%"}></Skeleton>
            <Skeleton h={15} radius="xl" w={"65%"}></Skeleton>
          </Group>
        ) : (
          <Badge
            leftSection={
              <Avatar
                src={user_info?.profile_picture_url}
                name={user_info?.name}
                size={"xs"}
              ></Avatar>
            }
            variant="default"
            color="initials"
            radius="md"
            onClick={() =>
              navigate(PageRoutes.PublicProfile, { state: { user_info } })
            }
            maw={150}
            style={{ cursor: "pointer" }}
          >
            {user_info?.name}
          </Badge>
        )}
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
      <Group gap={0}>
        <LuTags size={16} />
        <PillGroup p={"sm"}>
          {tags && tags.split(",").map((tag) => <Pill key={tag}>{tag}</Pill>)}
        </PillGroup>
      </Group>

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
