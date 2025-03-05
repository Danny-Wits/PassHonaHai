import { Avatar, Group, Paper, Space, Text, Textarea } from "@mantine/core";
import { useQueries } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import API from "../../Scripts/API";
import { PageRoutes, Times } from "../../Scripts/Const";
import { timeDifferenceInMinutes, timeText } from "./CommentCard";
import MaterialScrollList from "./MaterialScrollList";

function AnswerCard({ answer }) {
  const navigate = useNavigate();
  const materialIds = JSON.parse(answer?.material_ids ?? null) ?? [];

  const queries = useQueries({
    queries: materialIds.map((id) => ({
      queryKey: ["material", id],
      queryFn: () => API.getStudyMaterialByID(id),
      enabled: !!id,
      staleTime: Times.Minute,
      cacheTime: Times.Minute * 10,
    })),
  });
  const isLoading = queries.some((query) => query.isLoading);
  const data = queries.map((query) => query.data).filter((data) => !!data);
  const materials = data
    .flatMap((data) => data.material)
    .filter((material) => !!material);
  return (
    <Paper shadow="sm" p={{ base: "xs", sm: "md" }} withBorder>
      <Group>
        <Avatar
          src={answer?.profile_picture_url}
          alt={answer?.name}
          name={answer?.name}
          radius="xl"
          size={"md"}
          onClick={() => {
            navigate(PageRoutes.PublicProfile, {
              state: { user_info: answer },
            });
          }}
        />
        <div>
          <Text size="sm" truncate="end">
            {answer?.name}
          </Text>
          <Text size="xs" c="dimmed">
            {timeText(
              timeDifferenceInMinutes(
                new Date(),
                new Date(answer?.created_at + " UTC")
              )
            )}
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
        autosize
        truncate="end"
        color="red"
        value={answer?.answer}
      ></Textarea>
      <Space py={5}></Space>
      {materials.length > 0 && (
        <Text fw={600} c="dimmed">
          Linked Study Materials 📚
        </Text>
      )}

      {materials.length > 0 && !isLoading && (
        <MaterialScrollList materials={materials}></MaterialScrollList>
      )}
    </Paper>
  );
}

export default AnswerCard;
