import {
  AspectRatio,
  Avatar,
  Badge,
  Card,
  Group,
  Image,
  Overlay,
  Pill,
  PillGroup,
  ScrollArea,
  Skeleton,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { LuTags } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/mascot1.png";
import API from "../../Scripts/API.js";
import { FieldsColor, PageRoutes } from "../../Scripts/Const.js";

function getFileExtension(filename) {
  if (typeof filename !== "string") {
    return "";
  }

  const parts = filename.split(".");
  if (parts.length <= 1) {
    return "";
  }
  return parts.pop();
}
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

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w="100%"
      maw={280}
      mih={260}
    >
      <Card.Section pos={"relative"} onClick={goToDetails}>
        <AspectRatio ratio={isMobile ? 2.2 : 2.0}>
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
      <Group justify="space-between" mt="md" mb="xs" grow>
        <Text
          fw={800}
          size="sm"
          truncate={"end"}
          c="bright"
          onClick={goToDetails}
          style={{ cursor: "pointer" }}
        >
          {title}
        </Text>
        {isLoadingUser ? (
          <Group w={90} justify="center" gap={3}>
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
                color="initials"
              ></Avatar>
            }
            variant="default"
            color="initials"
            radius="md"
            onClick={() => {
              navigate(PageRoutes.PublicProfile, { state: { user_info } });
            }}
            style={{ cursor: "pointer" }}
            size="xs"
          >
            {user_info?.name}
          </Badge>
        )}
      </Group>

      <ScrollArea
        offsetScrollbars
        w={"100%"}
        h={isMobile ? 50 : 30}
        scrollbarSize={4}
        fz={"xs"}
        p={5}
      >
        <Text c="dimmed" size="sm">
          {description}
        </Text>
      </ScrollArea>

      {isPaper && (
        <Group py={"xs"} gap={4}>
          <Badge variant="light" size="xs">
            {material?.year}
          </Badge>
          <Badge size="xs">{material?.standard}</Badge>
          <Badge variant="dot" size="xs">
            {material?.branch}
          </Badge>
        </Group>
      )}
      {tags && (
        <Group gap={4} p={4}>
          <LuTags size={16} />
          <PillGroup p={1}>
            {tags &&
              tags.split(",").map((tag) => (
                <Pill key={tag} size="xs">
                  {tag}
                </Pill>
              ))}
          </PillGroup>
        </Group>
      )}
    </Card>
  );
}

export default MaterialCard;
