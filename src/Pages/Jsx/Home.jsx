import React from "react";
import { leaderboardCategories, Times } from "../../Scripts/Const";
import { Center, Divider, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import API from "../../Scripts/API";
import { UsersTable } from "../../Components/Jsx/UsersTable";

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
        <Center>
          <Title>People with the most Materials</Title>
        </Center>
        <Divider></Divider>
        {materialLeaderboard ? (
          <UsersTable users={materialLB} label={"Juniors"}></UsersTable>
        ) : (
          <>
            <Skeleton w={"100%"} h={30} radius={"md"}></Skeleton>
            <Skeleton w={"100%"} h={30} radius={"md"}></Skeleton>
            <Skeleton w={"100%"} h={30} radius={"md"}></Skeleton>
          </>
        )}
        <Divider></Divider>
        <Center>
          <Title>People with the most Juniors</Title>
        </Center>
        <Divider></Divider>
        {juniorLeaderboard ? (
          <UsersTable users={juniorLB} label={"Juniors"}></UsersTable>
        ) : (
          <>
            <Skeleton w={"100%"} h={30} radius={"md"}></Skeleton>
            <Skeleton w={"100%"} h={30} radius={"md"}></Skeleton>
            <Skeleton w={"100%"} h={30} radius={"md"}></Skeleton>
          </>
        )}
        <Divider></Divider>
      </Stack>
    </Stack>
  );
}

export default Home;
