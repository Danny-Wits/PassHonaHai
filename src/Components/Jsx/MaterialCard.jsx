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

function MaterialCard({ material, isPaper }) {
  const navigate = useNavigate();

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

  const queryClient = useQueryClient();

  const goToDetails = () => {
    if (isPaper) {
      window.open(download_link, "_blank");
      return;
    }
    navigate(PageRoutes.StudyMaterial, {
      state: { material },
    });
  };
  const colorTheme = useComputedColorScheme();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={300} mih={300}>
      <Card.Section pos={"relative"}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={download_link}
            fallbackSrc={defaultImage}
            alt="Study Material"
          />
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
            zIndex: 200,
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
        maxRows={2}
        readOnly
        autosize
        defaultValue={description}
      ></Textarea>
      {isPaper && (
        <Group py={"xs"} gap={4}>
          <Badge variant="light" size="sm">
            {material?.year}
          </Badge>
          <Badge size="sm">{material?.standard}</Badge>
          <Badge variant="dot" size="sm">
            {material?.branch}
          </Badge>
        </Group>
      )}
      {tags && (
        <Group gap={4} p={4} m={0}>
          <LuTags size={16} />
          <PillGroup p={1}>
            {tags && tags.split(",").map((tag) => <Pill key={tag}>{tag}</Pill>)}
          </PillGroup>
        </Group>
      )}
      <Button
        color="blue"
        fullWidth
        mt="auto"
        radius="md"
        variant="default"
        onClick={goToDetails}
      >
        {isPaper ? "Download" : "View"}
      </Button>
    </Card>
  );
}

export default MaterialCard;
