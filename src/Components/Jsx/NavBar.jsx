import React from "react";
import { NavLink, Stack } from "@mantine/core";
import { PageRoutes } from "../../Scripts/Const.js";
import { useNavigate } from "react-router-dom";
import { RiHome3Line } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";

const iconSize = 24;
const links = [
  {
    label: "Home",
    description: "Visit the Home Page",
    link: PageRoutes.Landing,
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
  },
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
