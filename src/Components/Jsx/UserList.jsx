import {
  Avatar,
  List,
  Paper,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";

function UserList({ users, title, maxHeight = Infinity }) {
  const navigate = useNavigate();
  return (
    <Spoiler maxHeight={maxHeight} showLabel="Show More " hideLabel="Show Less">
      <Paper shadow="sm" p={"md"}>
        <Stack>
          <Title order={3} c={"dimmed"}>
            {title}
          </Title>
          <List spacing={"lg"}>
            {users.map((user_info, index) => (
              <List.Item
                key={index}
                icon={
                  <Avatar
                    src={user_info?.profile_picture_url}
                    name={user_info?.name}
                    color="initials"
                  />
                }
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(135, 135, 135, 0.5)",
                }}
                onClick={() => {
                  navigate(PageRoutes.PublicProfile, {
                    state: { user_info },
                  });
                }}
              >
                <Stack gap={1} w={"100%"}>
                  <Text truncate={"end"}>{user_info?.name}</Text>
                  <Text c={"dimmed"} fz={"xs"} truncate={"end"}>
                    {user_info?.bio}
                  </Text>
                </Stack>
              </List.Item>
            ))}
          </List>
        </Stack>
      </Paper>
    </Spoiler>
  );
}

export default UserList;
