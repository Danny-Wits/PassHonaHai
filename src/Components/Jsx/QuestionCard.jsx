import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { FaCheckCircle, FaReply } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
import { timeDifferenceInMinutes, timeText } from "./CommentCard";

function QuestionCard({ request, replyIcon = <FaReply />, replyColor = "" }) {
  const navigate = useNavigate();
  return (
    <Group gap={6}>
      {request?.status === "pending" ? (
        <MdPending color="red" />
      ) : (
        <FaCheckCircle color="lightgreen" />
      )}
      <Paper shadow="sm" p={"sm"} withBorder w={{ base: "90%", sm: "50%" }}>
        <Stack pos={"relative"}>
          <Group>
            <ScrollArea w={"100%"} offsetScrollbars scrollbarSize={5}>
              <Text size="sm" fw={500} c={"dimmed"}>
                {request.question}
              </Text>
            </ScrollArea>
          </Group>
          <Group>
            <Badge
              leftSection={
                <Avatar
                  src={request?.profile_picture_url}
                  name={request?.name}
                  size={"xs"}
                  color="initials"
                ></Avatar>
              }
              variant="default"
              color="initials"
              radius="md"
              onClick={() => {
                navigate(PageRoutes.PublicProfile, {
                  state: { user_info: { user_id: request?.user_id } },
                });
              }}
              style={{ cursor: "pointer" }}
              size="xs"
            >
              {request?.name}
            </Badge>
            <Badge
              color={request?.status === "pending" ? "red" : "green"}
              variant="dot"
              size="xs"
            >
              {timeText(
                timeDifferenceInMinutes(
                  Date.now(),
                  new Date(request?.created_at + " UTC")
                )
              )}
            </Badge>
            <ActionIcon
              onClick={() => {
                navigate(PageRoutes.Reply + request?.request_id);
              }}
              ml={"auto"}
              color={replyColor}
            >
              {replyIcon}
            </ActionIcon>
          </Group>
        </Stack>
      </Paper>
    </Group>
  );
}

export default QuestionCard;
