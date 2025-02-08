import React from "react";
import {
  Avatar,
  BackgroundImage,
  Badge,
  Box,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
  useComputedColorScheme,
} from "@mantine/core";
import fallBackImage from "../../assets/login-pic-right.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import StatsBox from "./StatsBox.jsx";
import { numberFromStandard } from "../../Pages/Jsx/Dashboard.jsx";

function UserProfile({
  page_user,
  relationship,
  onProfileClick,
  profilePicRef,
}) {
  const colorTheme = useComputedColorScheme();
  if (!relationship) relationship = "";
  return (
    <Stack>
      <Box h={"24vh"} w={"100%"} pos={"relative"} mb={30}>
        <BackgroundImage
          src={fallBackImage}
          w={"100%"}
          h={"100%"}
          pos={"relative"}
          style={{
            zIndex: 0,
            filter: colorTheme === "dark" ? "invert(1)" : "none",
          }}
        ></BackgroundImage>

        <Avatar
          ref={profilePicRef}
          pos={"absolute"}
          variant={"filled"}
          src={page_user?.profile_picture_url}
          name={page_user?.name}
          size={96}
          color={"initials"}
          left={10}
          mt={-50}
          style={{ cursor: onProfileClick ? "pointer" : "default" }}
          onClick={onProfileClick ? onProfileClick : () => {}}
        ></Avatar>
        <Divider size={"md"}></Divider>
      </Box>
      <Stack px={"sm"} gap={10}>
        <Title
          order={1}
          w={"80%"}
          mb={0}
          style={{
            overflowX: "auto",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {page_user?.name}
          {!!relationship && (
            <Badge
              variant={"dot"}
              color={relationship === "Senior" ? "red" : "green"}
            >
              {relationship}
            </Badge>
          )}
        </Title>

        <Divider></Divider>
        <Group gap={20}>
          <Avatar
            size={"md"}
            name={numberFromStandard(page_user?.standard)}
            color={"initials"}
          ></Avatar>{" "}
          <StatsBox value={page_user?.materials} label={"Materials"}></StatsBox>
          <StatsBox value={page_user?.seniors} label={"Seniors"}></StatsBox>
          <StatsBox value={page_user?.juniors} label={"Juniors"}></StatsBox>
        </Group>
        <Divider mb={10}></Divider>
        <Paper p={"md"} shadow={"md"} mb={10}>
          <Group mb={10}>
            <Text c={"dimmed"}>Personal Info</Text>
          </Group>
          <Group gap={5}>
            <MdOutlineAlternateEmail size={18} color={"dimmed"} />
            <Text c={"dimmed"} truncate={"end"} w={"80%"}>
              {page_user?.email}
            </Text>
          </Group>
          <Group gap={5}>
            <IoIosInformationCircleOutline
              size={18}
              color={"var(--mantine-color-bright)"}
            />
            <Textarea
              defaultValue={page_user?.bio}
              readOnly
              autosize
              minRows={1}
              maxRows={4}
              w={"80%"}
              variant={"unstyled"}
            ></Textarea>
          </Group>
        </Paper>
        <Paper p={"md"} shadow={"md"} mb={10}>
          <Group mb={20} gap={4}>
            <Text c={"dimmed"}>Academics</Text>
          </Group>

          <Group>
            <Badge variant={"dot"}>
              {page_user?.field === "" ? "Haven't Set" : page_user?.field}
            </Badge>
            <Badge variant={"dot"}>
              {page_user?.branch === "" ? "Haven't Set" : page_user?.branch}
            </Badge>
          </Group>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default UserProfile;
