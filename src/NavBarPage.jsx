import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  rem,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useHeadroom, useMediaQuery } from "@mantine/hooks";
import logo from "./assets/phhLogo.png";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Jsx/Footer.jsx";
import NavBar from "./Components/Jsx/NavBar.jsx";
import UserButton from "./Components/Jsx/UserButton.jsx";
import { useAuth } from "./Context.jsx";

export function NavBarPage({ children }) {
  const pinned = useHeadroom({ fixedAt: 120 });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };
  const { user_info, logout } = useAuth();
  const navigate = useNavigate();
  const setOpened = (value) => {
    if (opened ^ value) {
      toggle();
    }
  };
  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      footer={{
        height: 60,
        collapsed: !isMobile,
      }}
      padding="md"
    >
      <AppShell.Header style={{ zIndex: 999 }}>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          ></Burger>
          <Avatar
            src={logo}
            radius="xl"
            size="md"
            bg={colorScheme === "light" ? "white" : "#C9C9C9"}
            name={"P H H"}
          ></Avatar>
          <Text size={"xl"} fw={900}>
            Pass Hona Hai
          </Text>
          <ActionIcon onClick={toggleColorScheme} variant={"transparent"}>
            {colorScheme === "dark" ? (
              <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
            )}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm" style={{ zIndex: 402 }}>
        <NavBar setOpened={setOpened}></NavBar>
        <Stack justify="flex-end" h={"100%"} mb={"sm"}>
          <UserButton
            name={user_info?.name}
            bio={user_info?.bio}
            profile_picture_url={user_info?.profile_picture_url}
            logout={logout}
            setOpened={setOpened}
          ></UserButton>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        {children}
      </AppShell.Main>
      <AppShell.Footer zIndex={999}>
        <Footer setOpened={setOpened}></Footer>
      </AppShell.Footer>
    </AppShell>
  );
}
