import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Grid,
  Loader,
  Pagination,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { UserCard } from "../../Components/Jsx/UserCard.jsx";
import { UsersTable } from "../../Components/Jsx/UsersTable.jsx";
import API from "../../Scripts/API.js";
import { Times } from "../../Scripts/Const.js";

function PublicProfiles() {
  const [search, setSearch] = React.useState("");
  const [page_no, setPageNo] = React.useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading: isLoadingData } = useQuery({
    queryKey: ["get_users", page_no],
    queryFn: () => API.getAllUsers(page_no),
    keepPreviousData: true,
    cacheTime: Times.Minute,
    staleTime: Times.Minute,
  });
  const {
    data: searchData,
    refetch: refetchSearch,
    isFetching: isSearching,
  } = useQuery({
    queryKey: ["search_users", search],
    queryFn: () => API.searchUsers(search),
    keepPreviousData: true,
    cacheTime: Times.Minute,
    staleTime: Times.Minute,
    enabled: false,
  });
  //preloading few pages.
  useQuery({
    queryKey: ["get_users", page_no + 1],
    queryFn: () => API.getAllUsers(page_no + 1),
    keepPreviousData: true,
    cacheTime: Times.Minute * 10,
    staleTime: Times.Minute * 2,
  });
  if (isLoadingData) {
    return (
      <Center h={"90vh"}>
        <Loader color="#a91cc6" size="xl" type={"dots"} />
      </Center>
    );
  }
  return (
    <Stack>
      <Center>
        <Text fz={{ base: "h2", md: "h1" }} ta={"center"} fw={900}>
          Public Profiles
        </Text>
      </Center>
      <Center>
        <form
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
          onSubmit={(e) => {
            e.preventDefault();
            refetchSearch();
          }}
        >
          <TextInput
            placeholder="Search by name or bio"
            type="text"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            value={search}
            size={"sm"}
            radius="xl"
            w={"90%"}
            rightSection={
              <ActionIcon
                variant={"transparent"}
                onClick={refetchSearch}
                mr={"10px"}
                loading={isSearching}
              >
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </ActionIcon>
            }
          ></TextInput>
        </form>
      </Center>
      <Center>
        {!!searchData?.users && !!searchData?.users.length > 0 && (
          <UsersTable users={searchData?.users} />
        )}
      </Center>

      {!!searchData?.users && !!searchData?.users.length > 0 && (
        <Button
          size={"md"}
          variant="default"
          fullWidth
          onClick={() => {
            queryClient.setQueryData(["search_users", search], null);
            setSearch("");
          }}
        >
          Clear
        </Button>
      )}
      {!!searchData?.users && !!searchData?.users.length > 0 && (
        <Divider size={"md"} variant="dashed"></Divider>
      )}

      <Divider mt="md" label={"New Users"} labelPosition="left"></Divider>
      <Center>
        <Pagination
          total={data?.total_pages}
          onChange={setPageNo}
          value={page_no}
          siblings={1}
          size={"xs"}
        />
      </Center>

      <Grid>
        {(data?.users ?? []).map((user) => {
          return (
            <Grid.Col
              span={{ base: 12, sm: 6, md: 4, lg: 3 }}
              key={user.user_id}
            >
              <UserCard user_info={user} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default PublicProfiles;
