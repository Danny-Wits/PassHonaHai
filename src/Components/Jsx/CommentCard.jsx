import React, { useEffect, useState } from "react";
import "../Styles/CommentCard.css";
import { PageRoutes } from "../../Scripts/Const.js";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/mascot1.png";
import {
  AspectRatio,
  Avatar,
  Badge,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
export const timeDifferenceInMinutes = (date1, date2) =>
  Math.floor((date1 - date2) / (1000 * 60));
export const timeText = (time) => {
  if (time < 60) return `${time} minutes ago`;
  if (time < 60 * 24) return `${Math.floor(time / 60)} hours ago`;
  if (time < 60 * 24 * 7) return `${Math.floor(time / (60 * 24))} days ago`;
  if (time < 60 * 24 * 7 * 52)
    return `${Math.floor(time / (60 * 24 * 7))} weeks ago`;
  return `${Math.floor(time / (60 * 24 * 7 * 52))} years ago`;
};
// eslint-disable-next-line react/prop-types
function CommentCard({ comment }) {
  // eslint-disable-next-line react/prop-types
  let {
    user_id,
    name,
    profile_picture_url: image,
    comment_text,
    commented_at,
  } = comment;
  if (!image || image === "") image = defaultImage;
  const [time, settime] = useState(0);
  useEffect(() => {
    settime(
      timeDifferenceInMinutes(Date.now(), new Date(commented_at + " UTC"))
    );
  }, [commented_at]);
  const navigate = useNavigate();
  return (
    <Paper shadow="sm" p={"md"} withBorder>
      <Group>
        <Avatar src={image} alt={name} name={name} radius="xl" size={"md"} />
        <div>
          <Text size="sm" truncate="end">
            {name}
          </Text>
          <Text size="xs" c="dimmed">
            {timeText(time)}
          </Text>
        </div>
      </Group>
      <Textarea
        readOnly
        variant="unstyled"
        pl={54}
        pt="xs"
        size="sm"
        minRows={1}
        maxRows={5}
        truncate="end"
        value={comment_text}
      ></Textarea>
    </Paper>
  );
}

export default CommentCard;
