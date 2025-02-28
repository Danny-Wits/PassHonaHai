import { Center, Grid, Spoiler, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import API from "../../Scripts/API";
import { Times } from "../../Scripts/Const";
import { MaterialTable } from "./MaterialTable";
import UserList from "./UserList";

function UserExtra({ user_id }) {
  const [page_no, setPageNo] = React.useState(1);
  const { data: seniorsData, status: seniorStatus } = useQuery(
    ["get_seniors", user_id],
    () => API.getSeniors(user_id),
    {
      staleTime: Times.Minute * 10,
      enabled: !!user_id,
    }
  );

  const { data: juniorsData, status: juniorStatus } = useQuery(
    ["get_juniors", user_id],
    () => API.getJuniors(user_id),
    {
      staleTime: Times.Minute * 10,
      enabled: !!user_id,
    }
  );

  if (seniorStatus === "error")
    enqueueSnackbar("Error Fetching Seniors", { variant: "error" });
  if (juniorStatus === "error")
    enqueueSnackbar("Error Fetching Juniors", { variant: "error" });

  const seniors = seniorsData?.seniors ?? [];
  const juniors = juniorsData?.juniors ?? [];

  const { data: DataStudyMaterialsOfUser } = useQuery(
    ["get_material_of_user", user_id, page_no],
    () => API.getStudyMaterialsOfUser(user_id, page_no),
    {
      staleTime: Times.Minute * 10,
      enabled: !!user_id,
      keepPreviousData: true,
    }
  );
  const studyMaterialsOfUser = DataStudyMaterialsOfUser?.materials ?? [];
  const isMobile = useMediaQuery("(max-width: 768px)");
  if (!user_id) {
    return <></>;
  }

  return (
    <Stack gap={50}>
      <Spoiler
        p={"xs"}
        hideLabel="Hide Materials"
        showLabel="Show More Materials"
        maxHeight={isMobile ? 330 : 240}
      >
        <Stack gap={2}>
          <Center p={"xs"}>
            <Title order={isMobile ? 3 : 2}>Material</Title>
          </Center>
          {studyMaterialsOfUser?.length === 0 ? (
            <Center p={0}>
              <Title order={isMobile ? 5 : 4} c={"dimmed"}>
                No Materials Uploaded
              </Title>
            </Center>
          ) : (
            <MaterialTable materials={studyMaterialsOfUser}></MaterialTable>
          )}
        </Stack>
      </Spoiler>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <UserList
            users={seniors}
            title={"Seniors"}
            maxHeight={300}
          ></UserList>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <UserList
            users={juniors}
            title={"Juniors"}
            maxHeight={300}
          ></UserList>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export default UserExtra;
