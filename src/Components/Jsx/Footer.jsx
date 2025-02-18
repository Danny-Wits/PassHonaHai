import { ActionIcon, Box, Group, Stack, Text, Tooltip } from "@mantine/core";
import React from "react";
import { FaCog, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
const footerOptions = [
  {
    label: "Home",
    link: PageRoutes.Home,
    icon: <FaHome />,
  },
  {
    label: "Explore",
    link: PageRoutes.Explore,
    icon: <FaSearch />,
  },
  {
    label: "Users",
    link: PageRoutes.PublicProfiles,
    icon: <FaUsers />,
  },
  {
    label: "Dashboard",
    link: PageRoutes.Dashboard,
    icon: <FaCog />,
  },
];
function Footer({ setOpened, setModelOpen }) {
  const navigate = useNavigate();
  return (
    <Group justify="space-around" h={"100%"} p={1} pos={"relative"}>
      <Box
        hiddenFrom="sm"
        style={{ left: "50%", transform: "translateX(-50%)", bottom: "4vh" }}
        pos={"absolute"}
      >
        <Tooltip label="Add Study Material">
          <ActionIcon
            size={"xl"}
            radius={"xl"}
            onClick={setModelOpen}
            component="div"
          >
            <LuPlus />
          </ActionIcon>
        </Tooltip>
      </Box>
      {footerOptions.map((option, index) => (
        <ActionIcon
          c={option.link === window.location.pathname ? "#c029df" : "dimmed"}
          onClick={() => {
            setOpened(false);
            navigate(option.link);
          }}
          key={index}
          variant="transparent"
          component="div"
          w={"20%"}
          h={"100%"}
        >
          <Stack align={"center"} p={0} gap={0}>
            {option.icon}
            <Text fz={10}>{option.label}</Text>
          </Stack>
        </ActionIcon>
      ))}
    </Group>
  );
}

export default Footer;
