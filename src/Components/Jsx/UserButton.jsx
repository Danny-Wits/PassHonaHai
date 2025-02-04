import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import classes from "../Styles/UserButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCog,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { PageRoutes } from "../../Scripts/Const.js";
import { useNavigate } from "react-router-dom";

function UserButton({ name, bio, profile_picture_url, logout }) {
  const navigate = useNavigate();
  const userButtonCard = () => {
    return (
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar src={profile_picture_url} radius="xl" />

          <div style={{ flex: 1, width: "60%" }}>
            <Text variant={"text"} size="sm" fw={500} truncate={"end"}>
              {name}
            </Text>

            <Text c="dimmed" size="xs" truncate={"end"}>
              {bio}
            </Text>
          </div>
          <FontAwesomeIcon icon={faCaretRight} />
        </Group>
      </UnstyledButton>
    );
  };
  return (
    <Menu>
      <Menu.Target>{userButtonCard()}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Links</Menu.Label>
        <Menu.Item
          leftSection={<FontAwesomeIcon icon={faCog} />}
          onClick={() => navigate(PageRoutes.Dashboard)}
        >
          Dashboard
        </Menu.Item>

        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          leftSection={<FontAwesomeIcon icon={faSignOut} />}
          onClick={() => logout()}
          color={"red"}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default UserButton;
