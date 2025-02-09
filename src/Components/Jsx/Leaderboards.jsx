import { Center, Grid, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import LeaderboardTable from "./LeaderboardTable";

function Leaderboards({ juniors, materials }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack>
      <Center>
        <Title order={isMobile ? 2 : 1}>Leaderboards</Title>
      </Center>

      <Grid justify="space-around">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <LeaderboardTable
            users={juniors}
            title={"People with the most Juniors"}
            label={"Juniors"}
            isMobile={isMobile}
          ></LeaderboardTable>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <LeaderboardTable
            users={materials}
            title={"Most Materials Uploaded"}
            label={"Materials"}
            isMobile={isMobile}
          ></LeaderboardTable>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default Leaderboards;
