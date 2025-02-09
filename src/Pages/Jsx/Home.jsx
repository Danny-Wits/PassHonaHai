import { Divider, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Leaderboards from "../../Components/Jsx/Leaderboards";
import API from "../../Scripts/API";
import { leaderboardCategories, Times } from "../../Scripts/Const";

function Home() {
  const queryOptions = {
    staleTime: Times.Minute,
    keepPreviousData: true,
    cacheTime: Times.Minute,
  };
  const { data: juniorLeaderboard } = useQuery(
    ["juniorLeaderBoard"],
    () => API.getLeaderboard(leaderboardCategories.Junior),
    queryOptions
  );

  const { data: materialLeaderboard } = useQuery(
    ["materialLeaderBoard"],
    () => API.getLeaderboard(leaderboardCategories.Material),
    queryOptions
  );
  const juniorLB = juniorLeaderboard?.leaders ?? [];
  const materialLB = materialLeaderboard?.leaders ?? [];
  return (
    <Stack>
      <Stack>
        <Leaderboards juniors={juniorLB} materials={materialLB}></Leaderboards>
        <Divider></Divider>
      </Stack>
    </Stack>
  );
}

export default Home;
