import { ActionIcon, Center, Stack, Tabs, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { IoAdd } from "react-icons/io5";
import { MdCheck, MdPending } from "react-icons/md";
import API from "../../Scripts/API";
import { Times } from "../../Scripts/Const";
import QuestionCard from "./QuestionCard";

function QuestionQueue() {
  const {
    data: pendingRequestData,
    fetchNextPage: fetchPendingRequests,
    hasNextPage: hasPendingRequests,
    isLoading: isLoadingPendingRequests,
  } = useInfiniteQuery({
    queryKey: ["get_pending_requests"],
    queryFn: ({ pageParam = 1 }) => API.getRequests(pageParam, "pending"),
    getNextPageParam: (lastPage) => {
      if (lastPage.page_no === lastPage.total_pages) return false;
      return lastPage.page_no + 1;
    },
    staleTime: Times.Minute,
    cacheTime: Times.Minute * 10,
    keepPreviousData: true,
  });
  const {
    data: answeredRequestData,
    fetchNextPage: fetchAnsweredRequests,
    hasNextPage: hasAnsweredRequests,
    isLoading: isLoadingAnsweredRequests,
  } = useInfiniteQuery({
    queryKey: ["get_answered_requests"],
    queryFn: ({ pageParam = 1 }) => API.getRequests(pageParam, "answered"),
    getNextPageParam: (lastPage) => {
      if (lastPage.page_no === lastPage.total_pages) return false;
      return lastPage.page_no + 1;
    },
    staleTime: Times.Minute,
    cacheTime: Times.Minute * 10,
    keepPreviousData: true,
  });

  const pendingRequests =
    pendingRequestData?.pages?.flatMap((page) => page?.requests) ?? [];
  const answeredRequests =
    answeredRequestData?.pages?.flatMap((page) => page?.requests) ?? [];

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack>
      <Title mb="sm" order={isMobile ? 3 : 2} fw={800}>
        {"Solve other people's problems 💡"}
      </Title>
      <Tabs variant="default" defaultValue={"pending"}>
        <Tabs.List>
          <Tabs.Tab
            value="pending"
            color="red"
            leftSection={<MdPending color="red" size={12} />}
          >
            Pending
          </Tabs.Tab>
          <Tabs.Tab
            value="answered"
            color="green"
            leftSection={<MdCheck color="green" size={12} />}
          >
            Answered
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pending">
          {QuestionStack(
            pendingRequests,
            hasPendingRequests,
            isLoadingPendingRequests,
            fetchPendingRequests
          )}
        </Tabs.Panel>
        <Tabs.Panel value="answered">
          {QuestionStack(
            answeredRequests,
            hasAnsweredRequests,
            isLoadingAnsweredRequests,
            fetchAnsweredRequests
          )}
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}

export default QuestionQueue;
function QuestionStack(list, hasNextPage, isLoading, fetchNextPage) {
  return (
    <Stack w={"100%"} p={"xs"}>
      {list?.map((request, index) => (
        <QuestionCard request={request} key={index} />
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
              Load more
            </Text>
          </Stack>
        )}
      </Center>
    </Stack>
  );
}
