import { Center, Grid, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import LeaderboardTable from "./LeaderboardTable";

function Leaderboards({ juniors, materials, stars }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack>
      <Center>
        <Title order={isMobile ? 2 : 1}>Leaderboards</Title>
      </Center>

      <Grid justify="flex-start" p={isMobile ? 0 : "xl"}>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <LeaderboardTable
            users={juniors}
            title={"People with the most Juniors"}
            label={"Juniors"}
            isMobile={isMobile}
          ></LeaderboardTable>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <LeaderboardTable
            users={materials}
            title={"Most Materials Uploaded"}
            label={"Materials"}
            isMobile={isMobile}
          ></LeaderboardTable>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <LeaderboardTable
            users={stars}
            title={"Most Materials Starred"}
            label={"Stars"}
            isMobile={isMobile}
            logo={<FaRegStar size={12} />}
          ></LeaderboardTable>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default Leaderboards;
