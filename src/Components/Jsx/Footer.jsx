import {
  ActionIcon,
  Box,
  Group,
  Popover,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { FaCog, FaHome, FaSearch } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { IoPersonAdd } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { MdOutlineQuestionAnswer } from "react-icons/md";
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
    label: "Community",
    children: [
      {
        label: "Users",
        link: PageRoutes.PublicProfiles,
        icon: <GoPeople />,
      },
      {
        label: "Requests",
        link: PageRoutes.Requests,
        icon: <MdOutlineQuestionAnswer />,
      },
    ],
    icon: <IoPersonAdd />,
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
      {footerOptions.map((option, index) =>
        !option?.children ? (
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
        ) : (
          <Popover
            key={index}
            width={100}
            trapFocus
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <ActionIcon
                key={index}
                variant="transparent"
                w={"20%"}
                h={"100%"}
                c={
                  option.children
                    .flatMap((child) => child.link)
                    .includes(window?.location.pathname)
                    ? "#c029df"
                    : "dimmed"
                }
              >
                <Stack align={"center"} p={0} gap={0}>
                  {option.icon}
                  <Text fz={10}>{option.label}</Text>
                </Stack>
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown w={"95%"}>
              <Group justify="space-around">
                {option.children.map((child, index) => (
                  <ActionIcon
                    c={
                      child.link === window?.location.pathname
                        ? "#c029df"
                        : "dimmed"
                    }
                    key={index}
                    onClick={() => {
                      setOpened(false);
                      navigate(child.link);
                    }}
                    variant="transparent"
                    component="div"
                    w={"20%"}
                    h={"100%"}
                  >
                    <Stack align={"center"} p={0} gap={0}>
                      {child.icon}
                      <Text fz={10}>{child.label}</Text>
                    </Stack>
                  </ActionIcon>
                ))}
              </Group>
            </Popover.Dropdown>
          </Popover>
        )
      )}
    </Group>
  );
}

export default Footer;
