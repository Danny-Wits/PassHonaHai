import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  ScrollArea,
  Space,
  Spoiler,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MaterialGroup from "../../Components/Jsx/MaterialGroup.jsx";
import { MaterialTable } from "../../Components/Jsx/MaterialTable.jsx";
import API from "../../Scripts/API";
import { Times } from "../../Scripts/Const";

function Explore() {
  const [page_no, setPageNo] = React.useState(1);
  const [paperPageNo, setPaperPageNo] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
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
  const { data: papersData, isLoading: isLoadingPapers } = useQuery(
    ["get_papers", paperPageNo],
    () => API.getPapers(paperPageNo),
    {
      staleTime: Times.Minute * 5,
      cacheTime: Times.Minute * 5,
      keepPreviousData: true,
      enabled: !!paperPageNo,
    }
  );
  const {
    data: searchData,
    refetch: refetchSearch,
    isFetching: isSearching,
  } = useQuery({
    queryKey: ["search_material", search],
    queryFn: () => API.searchMaterials(search),
    cacheTime: Times.Minute * 5,
    staleTime: Times.Minute * 5,
    enabled: false && !!search,
  });
  const {
    data: paperSearchData,
    refetch: refetchPaperSearch,
    isFetching: isPaperSearching,
  } = useQuery({
    queryKey: ["search_papers", search],
    queryFn: () => API.searchPapers(search),
    cacheTime: Times.Minute * 5,
    staleTime: Times.Minute * 5,
    enabled: false && !!paperSearch,
  });

  if (isLoadingMaterials)
    return (
      <Center h={"90vh"}>
        <Loader color="#a91cc6" size="xl" type={"dots"} />
      </Center>
    );
  return (
    <Stack gap={5}>
      <Text fz={{ base: "h2", md: "h1" }} ta={"center"} fw={900}>
        Explore
      </Text>
      <Center>
        <form
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
          onSubmit={(e) => {
            e.preventDefault();
            refetchSearch();
            refetchPaperSearch();
          }}
        >
          <TextInput
            placeholder="Search by Title or Description"
            type="text"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            value={search}
            size={isMobile ? "sm" : "md"}
            radius="xl"
            w={isMobile ? "100%" : "50%"}
            rightSection={
              <ActionIcon
                variant={"transparent"}
                onClick={() => {}}
                mr={"20px"}
                loading={isSearching}
                type="submit"
              >
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </ActionIcon>
            }
          ></TextInput>
        </form>
      </Center>
      {searchData?.materials?.length > 0 && (
        <ScrollArea>
          <Flex
            direction={"column"}
            align={{ base: "flex-start", md: "center" }}
            p={"xs"}
          >
            <Text fw={900} c={"dimmed"}>
              Study Materials
            </Text>
            <Spoiler
              maxHeight={200}
              showLabel="Show More "
              hideLabel="Show Less"
              w={{ base: "100%", md: "50%" }}
            >
              <MaterialTable
                materials={searchData?.materials}
                withoutHead={true}
              />
            </Spoiler>
          </Flex>
        </ScrollArea>
      )}
      {paperSearchData?.papers?.length > 0 && (
        <ScrollArea>
          <Flex
            direction={"column"}
            align={{ base: "flex-start", md: "center" }}
            p={"xs"}
          >
            <Text fw={900} c={"dimmed"}>
              Papers
            </Text>
            <Spoiler
              maxHeight={200}
              showLabel="Show More "
              hideLabel="Show Less"
              w={{ base: "100%", md: "50%" }}
            >
              <MaterialTable
                materials={paperSearchData?.papers}
                arePapers={true}
                withoutHead={true}
              />
            </Spoiler>
          </Flex>
        </ScrollArea>
      )}
      <Group justify="center">
        {(searchData?.materials?.length > 0 ||
          paperSearchData?.papers?.length > 0) && (
          <Button
            variant="light"
            color={"red"}
            onClick={() => setSearch("")}
            size="sm"
            w={{ base: "100%", md: "50%" }}
          >
            Clear
          </Button>
        )}
      </Group>
      <Space h={"md"}></Space>
      <MaterialGroup
        title={"🚀Some popular Study Materials🚀"}
        isPaper={false}
        isLoadingMaterials={isLoadingMaterials}
        data={data}
        page_no={page_no}
        setPageNo={setPageNo}
      ></MaterialGroup>
      <Space h={"md"}></Space>
      <MaterialGroup
        isPaper={true}
        title={"📝Some popular Exam Papers📝"}
        isLoadingMaterials={isLoadingPapers}
        data={papersData}
        page_no={paperPageNo}
        setPageNo={setPaperPageNo}
      ></MaterialGroup>
    </Stack>
  );
}

export default Explore;
