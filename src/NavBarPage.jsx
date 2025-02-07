import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Button,
  Container,
  Group,
  rem,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import logo from "./assets/phhLogo.png";
import { useDisclosure, useHeadroom } from "@mantine/hooks";

import NavBar from "./Components/Jsx/NavBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSignIn,
  faSun,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./Context.jsx";
import UserButton from "./Components/Jsx/UserButton.jsx";
import { PageRoutes } from "./Scripts/Const.js";
import { useNavigate } from "react-router-dom";

export function NavBarPage({ children }) {
  const pinned = useHeadroom({ fixedAt: 120 });
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };
  const { user_info, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
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

      <AppShell.Navbar p="sm">
        <NavBar setOpened={toggle}></NavBar>
        <Stack justify="flex-end" h={"100%"} mb={"sm"}>
          {user_info ? (
            <UserButton
              name={user_info.name}
              bio={user_info.bio}
              profile_picture_url={user_info.profile_picture_url}
              logout={logout}
            ></UserButton>
          ) : (
            <Container mb={"md"}>
              <Group>
                <Button
                  leftSection={
                    <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
                  }
                  onClick={() => navigate(PageRoutes.Login)}
                >
                  Login
                </Button>
                <Button
                  leftSection={
                    <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
                  }
                  onClick={() => navigate(PageRoutes.Register)}
                  variant="default"
                >
                  Register
                </Button>
              </Group>
            </Container>
          )}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
