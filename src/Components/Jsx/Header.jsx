import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import logoGif from "../../assets/logo.mp4";
import { PageRoutes } from "../../Scripts/Const";
import classes from "../Styles/Header.module.css";

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const navigate = useNavigate();

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group w={"auto"} h={"100%"} justify="center">
            <video
              src={logoGif}
              autoPlay
              muted
              disablePictureInPicture
              style={{ height: "100%" }}
            ></video>
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>

            <a href="#" className={classes.link}>
              About us
            </a>

            <a href="#" className={classes.link}>
              Contact us
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button
              variant="default"
              onClick={() => {
                navigate(PageRoutes.Login);
              }}
            >
              Log in
            </Button>
            <Button onClick={() => navigate(PageRoutes.Register)}>
              Sign up
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>

          <a href="#" className={classes.link}>
            About us
          </a>

          <a href="#" className={classes.link}>
            Contact us
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
