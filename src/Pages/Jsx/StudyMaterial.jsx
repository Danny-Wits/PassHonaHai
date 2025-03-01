import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Badge,
  Button,
  Divider,
  Flex,
  Group,
  Image,
  Modal,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useComputedColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit, FaFlag, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { FaDownload, FaRegCommentDots } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { LuTags } from "react-icons/lu";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
  const id = material_info?.material_id;

  const { user_info } = useAuth();
  const [liked, setLiked] = useState(false);
  const [yourComment, setYourComment] = useState("");
  const [time, settime] = useState(0);
  const navigate = useNavigate();
  const isCreater = material_info.user_id === user_info?.user_id;
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
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
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
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
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
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
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
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      },
    }
  );
  const { mutate: deleteMaterial, isLoading: isDeleting } = useMutation(
    (data) => API.deleteStudyMaterial(data.user_id, data.data),
    {
      onSuccess: (data) => {
        if (data.error) {
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
        } else {
          navigate(PageRoutes.Explore);
          queryClient.refetchQueries(["get_material"]).then(() => {});
          enqueueSnackbar("Material Deleted", {
            variant: "success",
            autoHideDuration: 3000,
          });
        }
      },
      onError: (error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
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
  const [opened, { open, close }] = useDisclosure(false);
  const handleMaterialDelete = async (info) => {
    if (info === "prompt") {
      open();
    } else if (info === true) {
      await deleteMaterial({
        user_id: user_info?.user_id,
        data: { material_id: id },
      });
      close();
    } else {
      close();
    }
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
  const gotoEdit = () =>
    navigate(PageRoutes.EditMaterial, { state: { material_info } });
  if (!id) {
    return <Navigate to={PageRoutes.Explore}></Navigate>;
  }
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDark = useComputedColorScheme() === "dark";
  return (
    <Stack>
      <Modal opened={opened} onClose={close} title="Delete Material" centered>
        <Stack>
          <Text c="dimmed" fz={"sm"}>
            Are you sure you want to delete this material?
          </Text>
          <Group>
            <Button
              variant="light"
              color="red"
              onClick={() => handleMaterialDelete(true)}
            >
              Yes
            </Button>
            <Button
              variant="light"
              color="green"
              onClick={() => {
                handleMaterialDelete(false);
              }}
            >
              No
            </Button>
          </Group>
        </Stack>
      </Modal>
      <AspectRatio ratio={16 / 9} h={"30vh"}>
        <Image
          src={material_info?.download_link}
          alt={material_info?.title}
          fallbackSrc={defaultImage}
          h={"100%"}
        ></Image>
      </AspectRatio>
      <Divider></Divider>
      <Flex gap={"md"} direction={{ base: "column", md: "row" }}>
        <Group>
          <Text size={"xl"} maw={"75%"} fw={900} style={{ overflowX: "auto" }}>
            {material_info?.title}
          </Text>
          <ActionIcon
            onClick={toggleLike}
            loading={isUnliking || isLiking || isFetchingLikes}
            variant={liked ? "filled" : "default"}
          >
            {liked ? <FaStar /> : <FaRegStar />}
          </ActionIcon>
        </Group>

        <Group
          ml={{ base: 0, md: "auto" }}
          bg={isDark ? "#333333" : "#f5f5f5"}
          pr={"sm"}
          py={2}
          gap={4}
          align={"center"}
          style={{ cursor: "pointer", borderRadius: "20px" }}
          onClick={() =>
            navigate(PageRoutes.PublicProfile, {
              state: { user_info: { user_id: material_info?.user_id } },
            })
          }
          maw={120}
        >
          <Avatar
            src={material_info?.profile_picture_url}
            alt={material_info?.name}
            name={material_info?.name}
            size={"sm"}
          />
          <Group w={"70%"} gap={0}>
            <Text size="10" lh={1.5} w={"100%"} truncate="end">
              {material_info?.name}
            </Text>
            <Text size="10" lh={1} w={"100%"} c="dimmed">
              {timeText(time)}
            </Text>
          </Group>
        </Group>
      </Flex>
      <Group gap={"md"} justify="flex-start">
        <Button
          onClick={() => window.open(material_info?.download_link, "_blank")}
          variant="light"
          rightSection={isMobile ? null : <FaDownload />}
        >
          {isMobile ? <FaDownload /> : "Download "}
        </Button>
        {isCreater && (
          <>
            <Button
              onClick={() => gotoEdit()}
              variant="light"
              color="blue"
              rightSection={isMobile ? null : <FaEdit />}
            >
              {isMobile ? <FaEdit /> : "Edit "}
            </Button>
            <Button
              onClick={() => handleMaterialDelete("prompt")}
              variant="light"
              color="red"
              loading={isDeleting}
              rightSection={isMobile ? null : <FaTrash />}
            >
              {isMobile ? <FaTrash /> : "Delete "}
            </Button>
          </>
        )}

        <Button
          onClick={() =>
            enqueueSnackbar("Report Feature coming soon", {
              variant: "success",
              autoHideDuration: 2000,
            })
          }
          variant="light"
          color="orange"
          rightSection={isMobile ? null : <FaFlag />}
        >
          {isMobile ? <FaFlag /> : "Report "}
        </Button>
      </Group>
      <Divider></Divider>

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
          </Group>
        </Stack>
      </Paper>

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
