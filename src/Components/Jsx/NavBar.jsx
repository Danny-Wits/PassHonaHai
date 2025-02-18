import { NavLink, Stack } from "@mantine/core";
import React from "react";
import { GoPeople } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSearch } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const.js";

const iconSize = 24;
const links = [
  {
    label: "Home",
    description: "Visit the Home Page",
    link: PageRoutes.Home,
    icon: <RiHome3Line size={iconSize} />,
  },
  {
    label: "Explore",
    description: "Explore the Study Material Library",
    link: PageRoutes.Explore,
    icon: <MdOutlineSearch size={iconSize} />,
  },
  {
    label: "People",
    description: "Look at Public Profiles",
    link: PageRoutes.PublicProfiles,
    icon: <GoPeople size={iconSize} />,
  },
  {
    label: "Dashboard",
    description: "View and Edit Your Profile",
    link: PageRoutes.Dashboard,
    icon: <LuLayoutDashboard size={iconSize} />,
  },{}
];
function NavBar({ setOpened }) {
  const navigate = useNavigate();
  return (
    <Stack>
      {links.map((link, index) => (
        <NavLink
          key={index}
          onClick={() => {
            navigate(link.link);
            setOpened(false);
          }}
          label={link.label}
          description={link.description}
          active={window.location.pathname === link.link}
          variant={"light"}
          leftSection={link.icon}
          p={"md"}
        />
      ))}
    </Stack>
  );
}

export default NavBar;
