import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  FaDownload,
  FaRegCommentDots,
  FaRegStar,
  FaStar,
} from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { LuTags } from "react-icons/lu";
import { MdOutlineReportOff } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import defaultImage from "../../assets/mascot1.png";
import CommentCard, {
  timeDifferenceInMinutes,
  timeText,
} from "../../Components/Jsx/CommentCard.jsx";
import { useAuth } from "../../Context.jsx";
import API from "../../Scripts/API.js";
import { FieldsColor, PageRoutes, Times } from "../../Scripts/Const.js";

function StudyMaterial() {
  const location = useLocation();
  const material_info = location.state.material;
  const id = material_info.material_id;
  const { user_info } = useAuth();
  const [liked, setLiked] = useState(false);
  const [yourComment, setYourComment] = useState("");
  const [time, settime] = useState(0);
  const navigate = useNavigate();
  const queryOptions = {
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Times.Minute * 10,
    staleTime: Times.Minute * 10,
    keepPreviousData: true,
  };

  const { data: likesData, isFetching: isFetchingLikes } = useQuery(
    ["get_material_likes", id],
    () => API.getStudyMaterialLikes(id),
    queryOptions
  );
  const { data: commentData } = useQuery(
    ["get_material_comments", id],
    () => API.getStudyMaterialComments(id),
    queryOptions
  );

  const likes = likesData?.likes ?? [];
  const comments = commentData?.comments ?? [];

  const queryClient = useQueryClient();

  useEffect(() => {
    if (likes.some((like) => like.user_id === user_info?.user_id)) {
      setLiked(true);
    }
  }, [likes, user_info?.user_id]);

  const { mutate: LikeMaterial, isLoading: isLiking } = useMutation(
    (data) => API.likeMaterial(data.user_id, data.data),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(["get_material_likes", id]).then(() => {});
        if (data.error) {
          enqueueSnackbar(data.error, { variant: "error" });
          return;
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );
  const { mutate: UnlikeMaterial, isLoading: isUnliking } = useMutation(
    (data) => API.unlikeMaterial(data.user_id, data.data),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(["get_material_likes", id]).then(() => {});
        if (data.error) {
          enqueueSnackbar(data.error, { variant: "error" });
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );
  const toggleLike = () => {
    if (liked) {
      UnlikeMaterial({
        user_id: user_info?.user_id,
        data: { material_id: id },
      });
    } else {
      LikeMaterial({ user_id: user_info?.user_id, data: { material_id: id } });
    }
    setLiked((prevLiked) => !prevLiked);
  };

  const { mutate: addComment, isLoading: isCommenting } = useMutation(
    (data) => API.commentMaterial(data.user_id, data.data),
    {
      onSuccess: (data) => {
        queryClient
          .refetchQueries(["get_material_comments", id])
          .then(() => {});
        if (data.error) {
          enqueueSnackbar(data.error, { variant: "error" });
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );
  const { mutate: deleteComment, isLoading: isDeletingComment } = useMutation(
    (data) => API.deleteComment(data.user_id, data.data),
    {
      onSuccess: (data) => {
        queryClient
          .refetchQueries(["get_material_comments", id])
          .then(() => {});
        if (data.error) {
          enqueueSnackbar(data.error, { variant: "error" });
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );

  const handleCommentSubmit = (values, e) => {
    e.preventDefault();
    addComment({
      user_id: user_info?.user_id,
      data: { material_id: id, comment: values.comment },
    });
  };
  const handleCommentDelete = () => {
    deleteComment({ user_id: user_info?.user_id, data: { material_id: id } });
  };

  const commentForm = useForm({
    initialValues: {
      comment: "",
    },
    validateInputOnBlur: true,
    validate: {
      comment: (value) =>
        value.length < 2 || value.length > 500
          ? "Comment must be 2-500 characters"
          : null,
    },
  });
  const upload_date = material_info?.upload_date;
  useEffect(() => {
    settime(
      timeDifferenceInMinutes(Date.now(), new Date(upload_date + " UTC"))
    );
  }, [upload_date]);
  return (
    <Stack>
      <AspectRatio ratio={16 / 9} h={"30vh"}>
        <Image
          src={material_info?.download_link}
          alt={material_info?.title}
          fallbackSrc={defaultImage}
          h={"100%"}
        ></Image>
      </AspectRatio>
      <Divider></Divider>
      <Group>
        <Title size={"xl"} maw={"60%"} truncate={"end"}>
          {material_info?.title}
        </Title>
        <ActionIcon
          onClick={toggleLike}
          loading={isUnliking || isLiking || isFetchingLikes}
          variant={liked ? "filled" : "default"}
        >
          {liked ? <FaStar /> : <FaRegStar />}
        </ActionIcon>
        <Group
          ml={"auto"}
          p={"xs"}
          gap={4}
          align={"center"}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(PageRoutes.PublicProfile, {
              state: { user_id: material_info?.user_id },
            })
          }
        >
          <Avatar
            src={material_info?.profile_picture_url}
            alt={material_info?.name}
            name={material_info?.name}
            size={"sm"}
          />
          <div>
            <Text size="xs" truncate="end">
              {material_info?.name}
            </Text>
            <Text size={"xs"} c="dimmed">
              {timeText(time)}
            </Text>
          </div>
        </Group>
      </Group>

      <Group gap={"md"} p={"xs"}>
        {material_info?.tags &&
          material_info?.tags.split(",").map((tag, index) => (
            <Badge
              key={index}
              size="sm"
              variant="default"
              leftSection={<LuTags />}
            >
              {tag}
            </Badge>
          ))}
      </Group>

      <Stack gap={1}>
        <Text fw={900} c={"bright"}>
          Description
        </Text>
        <Textarea
          px={"md"}
          maxRows={4}
          autosize
          minRows={1}
          value={material_info?.description}
          readOnly
          variant="unstyled"
          w={"100%"}
        />
      </Stack>

      <Paper shadow="sm" p={"sm"} withBorder>
        <Stack>
          <Group mb={5}>
            <Text size="md"> Academics</Text>
            <Avatar
              size={"md"}
              name={material_info?.standard}
              color="initials"
              radius={"xl"}
            ></Avatar>
          </Group>
          <Group>
            <Badge color={FieldsColor[material_info?.field]}>
              {material_info?.field}
            </Badge>
            <Badge variant="dot" color={FieldsColor[material_info?.field]}>
              {material_info?.branch}
            </Badge>
          </Group>
        </Stack>
      </Paper>
      <Group gap={"lg"} justify="center">
        <Button
          onClick={() => window.open(material_info?.download_link, "_blank")}
          variant="filled"
          rightSection={<FaDownload />}
        >
          Download
        </Button>
        <Button
          onClick={() =>
            enqueueSnackbar("Report Feature coming soon", {
              variant: "success",
              autoHideDuration: 2000,
            })
          }
          variant="default"
          color="red"
          rightSection={<MdOutlineReportOff />}
        >
          Report
        </Button>
      </Group>
      <Title order={4} mt={20}>
        Comments
      </Title>
      <Stack
        style={{
          borderLeft: "2px solid #d0d0d0",
          borderRadius: "10px 0 0 10px",
        }}
      >
        <form onSubmit={commentForm.onSubmit(handleCommentSubmit)}>
          <TextInput
            value={yourComment}
            onChange={(e) => setYourComment(e.target.value)}
            leftSection={<FaRegCommentDots />}
            rightSection={
              <>
                <ActionIcon
                  type={"submit"}
                  loading={isCommenting || isDeletingComment}
                  mr={10}
                >
                  <IoSend />
                </ActionIcon>
                <ActionIcon
                  loading={isCommenting || isDeletingComment}
                  mr={40}
                  variant="default"
                  type="button"
                  onClick={handleCommentDelete}
                >
                  <AiOutlineDelete />
                </ActionIcon>
              </>
            }
            {...commentForm.getInputProps("comment")}
          />
        </form>

        <Stack p={"md"}>
          {comments.map((comment, index) => {
            return <CommentCard key={index} comment={comment}></CommentCard>;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default StudyMaterial;
