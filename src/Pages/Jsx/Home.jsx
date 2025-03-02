import {
  Button,
  Divider,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useMediaQuery } from "@mantine/hooks";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineTrendingUp, MdSchool } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Leaderboards from "../../Components/Jsx/Leaderboards";
import MaterialGallery from "../../Components/Jsx/MaterialGallery";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";
import { leaderboardCategories, PageRoutes, Times } from "../../Scripts/Const";
function Home() {
  const queryOptions = {
    staleTime: Times.Minute,
    keepPreviousData: true,
    cacheTime: Times.Minute * 5,
  };
  const { user_info } = useAuth();
  //Popular Materials
  const { data: popularMaterialsData } = useQuery(
    ["popularMaterials", user_info?.branch ?? "all"],
    () => API.getPopularMaterialsByBranch(user_info?.branch ?? "all"),
    {
      staleTime: Times.Minute,
      keepPreviousData: true,
      cacheTime: Times.Minute * 5,

      enabled: !!user_info?.user_id,
    }
  );

  const { data: popularMaterialsAllData } = useQuery(
    ["popularMaterials", "all"],
    () => API.getPopularMaterialsByBranch("all"),
    {
      staleTime: Times.Minute,
      keepPreviousData: true,
      cacheTime: Times.Minute * 5,
    }
  );
  const { data: popularMaterialsByFieldData } = useQuery(
    ["popularMaterialsByField", user_info?.field ?? "all"],
    () => API.getPopularMaterialsByField(user_info?.field ?? "all"),
    {
      staleTime: Times.Minute,
      keepPreviousData: true,
      cacheTime: Times.Minute * 5,
    }
  );
  const popularMaterials = popularMaterialsData?.materials ?? [];
  const popularMaterialsAll = popularMaterialsAllData?.materials ?? [];
  const popularMaterialsByField = popularMaterialsByFieldData?.materials ?? [];
  //Leaderboards
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
  const { data: starsLeaderboard } = useQuery(
    ["starsLeaderboard"],
    () => API.getLeaderboard(leaderboardCategories.Stars),
    queryOptions
  );
  const juniorLB = juniorLeaderboard?.leaders ?? [];
  const materialLB = materialLeaderboard?.leaders ?? [];
  const starsLB = starsLeaderboard?.leaders ?? [];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  return (
    <Stack>
      <Stack spacing="md">
        <Title mb="sm" px="sm" order={isMobile ? 3 : 2} fw={800}>
          Welcome 🎉🎉
        </Title>

        <Text px="sm" size={isMobile ? "sm" : "md"} c="dimmed">
          Your journey to success starts here! Connect, share, and ace your
          exams with
          <b> Pass Hona Hai</b>. Explore study material, engage with peers, and
          stay ahead in your academic journey!
        </Text>

        <Group px="sm" spacing="md">
          <Button
            onClick={() => navigate(PageRoutes.Explore)}
            variant="light"
            fullWidth={isMobile}
          >
            📚 Explore Study Material
          </Button>
          <Button
            onClick={() => navigate(PageRoutes.PublicProfiles)}
            variant="default"
            fullWidth={isMobile}
          >
            👥 Find People
          </Button>
          <Button
            onClick={() => navigate(PageRoutes.Requests)}
            variant="default"
            fullWidth={isMobile}
          >
            ❓ Request Help
          </Button>
        </Group>
      </Stack>
      <Space h="md"></Space>
      {popularMaterials.length > 0 ? (
        <MaterialGallery
          data={popularMaterials}
          title={"📚 Popular Materials from your branch"}
          icon={<MdOutlineTrendingUp size={20} />}
        />
      ) : (
        <MaterialGallery
          data={popularMaterialsAll}
          title={"🔥 Popular Materials for you"}
          icon={<MdOutlineTrendingUp size={20} />}
        />
      )}
      <Space h={30} />
      {popularMaterialsByField.length > 0 ? (
        <MaterialGallery
          data={popularMaterialsByField}
          title={"🎓 Content from your field"}
          icon={<FaUserGraduate size={20} />}
        />
      ) : (
        <MaterialGallery
          data={popularMaterialsAll}
          title={"📖 Popular Materials for you"}
          icon={<MdSchool size={20} />}
        />
      )}{" "}
      <Divider m={20} />
      <Leaderboards
        juniors={juniorLB}
        materials={materialLB}
        stars={starsLB}
      ></Leaderboards>
      <Divider></Divider>
    </Stack>
  );
}

export default Home;
