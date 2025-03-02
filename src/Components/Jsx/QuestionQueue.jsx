import { ActionIcon, Center, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { IoAdd } from "react-icons/io5";
import API from "../../Scripts/API";
import { Times } from "../../Scripts/Const";
import QuestionCard from "./QuestionCard";

function QuestionQueue() {
  const {
    data: requestData,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["get_requests"],
    queryFn: ({ pageParam = 1 }) => API.getRequests(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page_no === lastPage.total_pages) return false;
      return lastPage.page_no + 1;
    },
    staleTime: Times.Minute,
    cacheTime: Times.Minute * 10,
    keepPreviousData: true,
  });

  const requests = requestData?.pages?.flatMap((page) => page?.requests) ?? [];
  const answeredRequests = requests.filter(
    (request) => request.status === "answered"
  );
  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack>
      <Title mb="sm" order={isMobile ? 3 : 2} fw={800}>
        {"Solve other people's problems 💡"}
      </Title>

      <Stack w={"100%"} p={"xs"}>
        {requests?.map((request) => (
          <QuestionCard request={request} />
        ))}
        <Center w={{ base: "100%", sm: "50%" }}>
          {hasNextPage && (
            <Stack align={"center"} gap={2}>
              <ActionIcon
                variant="light"
                loading={isLoading}
                onClick={fetchNextPage}
              >
                <IoAdd />
              </ActionIcon>

              <Text c="dimmed" size="xs">
                Add more
              </Text>
            </Stack>
          )}
        </Center>
      </Stack>
    </Stack>
  );
}

export default QuestionQueue;
