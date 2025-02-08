import React from "react";
import NavBar from "../../Components/Jsx/NavBar";
import { useQuery } from "@tanstack/react-query";
import API from "../../Scripts/API";
import { Times } from "../../Scripts/Const";
import MaterialCard from "../../Components/Jsx/MaterialCard.jsx";
import {
  ActionIcon,
  Box,
  Center,
  Divider,
  Grid,
  GridCol,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MaterialTable } from "../../Components/Jsx/MaterialTable.jsx";

function Explore() {
  const [page_no, setPageNo] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const { data, isLoading: isLoadingMaterials } = useQuery({
    queryKey: ["get_material", page_no],
    queryFn: () => API.getStudyMaterials(page_no),
    keepPreviousData: true,
    cacheTime: Times.Minute * 5,
    staleTime: Times.Minute * 5,
  });
  useQuery({
    queryKey: ["get_material", page_no + 1],
    queryFn: () => API.getStudyMaterials(page_no + 1),
    keepPreviousData: true,
    cacheTime: Times.Minute * 10,
    staleTime: Times.Minute * 5,
  });
  const {
    data: searchData,
    refetch: refetchSearch,
    isFetching: isSearching,
  } = useQuery({
    queryKey: ["search_material", search],
    queryFn: () => API.searchMaterials(search),
    keepPreviousData: true,
    cacheTime: Times.Minute * 5,
    staleTime: Times.Minute * 5,
    enabled: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  if (isLoadingMaterials)
    return (
      <Center h={"90vh"}>
        <Loader color="#a91cc6" size="xl" type={"dots"} />
      </Center>
    );
  return (
    <Stack>
      <Center>
        <form
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
          onSubmit={(e) => {
            e.preventDefault();
            refetchSearch();
          }}
        >
          <TextInput
            placeholder="Search by Title or Description"
            type="text"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            value={search}
            size={"lg"}
            radius="xl"
            w={"90%"}
            rightSection={
              <>
                <Divider orientation="vertical" mr={"15px"} />
                <ActionIcon
                  variant={"transparent"}
                  onClick={() => {}}
                  mr={"30px"}
                  loading={isSearching}
                  type="submit"
                >
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </ActionIcon>
              </>
            }
          ></TextInput>
        </form>
      </Center>
      <Center>
        {searchData?.materials?.length > 0 && (
          <MaterialTable materials={searchData?.materials} />
        )}
      </Center>
      <Center>
        <Pagination
          total={data?.total_pages}
          page={page_no}
          onChange={setPageNo}
        />
      </Center>

      <Grid>
        {data?.materials?.map((material, index) => {
          return (
            <Grid.Col
              key={index}
              span={{ base: 12, sm: 6, md: 4, lg: 3 }}
              mih={400}
            >
              <MaterialCard material={material} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default Explore;
