import {
  Avatar,
  Paper,
  SimpleGrid,
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
      <Paper shadow="sm" withBorder p={"md"}>
        <Stack>
          <Title order={3} c={"dimmed"}>
            {title}
          </Title>
          <SimpleGrid
            cols={{ base: 4, sm: 4, md: 5, lg: 7 }}
            spacing={"sm"}
            verticalSpacing={"sm"}
          >
            {users.map((user_info, index) => (
              <Stack
                key={index}
                w={"100%"}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(PageRoutes.PublicProfile, {
                    state: { user_info },
                  });
                }}
                gap={2}
                p={"xs"}
              >
                <Avatar
                  size={"sm"}
                  src={user_info?.profile_picture_url}
                  name={user_info?.name}
                  variant={"light"}
                  color={"initials"}
                />
                <Text fw={600} fz={10} truncate={"end"}>
                  {user_info?.name}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>
    </Spoiler>
  );
}

export default UserList;
