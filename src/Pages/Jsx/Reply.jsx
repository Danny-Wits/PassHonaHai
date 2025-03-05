import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { FaReply } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useParams } from "react-router-dom";
import AnswerCard from "../../Components/Jsx/AnswerCard";
import MaterialScrollList from "../../Components/Jsx/MaterialScrollList";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";
import { Times } from "../../Scripts/Const";

function Reply() {
  const [search, setSearch] = React.useState("");
  const [materials, setMaterials] = React.useState([]);
  const [answerText, setAnswerText] = React.useState("");
  const [selectedMaterial, setSelectedMaterial] = React.useState([]);
  const { user_info } = useAuth();
  const request_id = useParams()?.request_id;
  const { data: answerData, isLoading: isLoadingAnswers } = useQuery(
    ["answer", request_id],
    () => API.getAnswers(request_id),
    {
      enabled: !!request_id,
      staleTime: Times.Minute,
      cacheTime: Times.Minute * 5,
    }
  );
  const answers = answerData?.answers ?? [];
  const { data: materialData, isLoading: isLoadingMaterials } = useQuery(
    ["material", search],
    () => API.searchMaterials(search),
    {
      enabled: !!search && search?.length > 2,
      staleTime: Times.Minute,
      cacheTime: Times.Minute * 5,
    }
  );
  const materialLinks =
    materialData?.materials?.map((material) => ({
      label: material.title,
      value: JSON.stringify(material),
    })) ?? [];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const addMaterial = (material) => {
    if (material === -1) return;
    if (!material?.material_id) return;
    if (materials.flatMap((m) => m.material_id).includes(material.material_id))
      return;
    if (materials.length >= 3) return;
    setSelectedMaterial(null);
    setMaterials((prev) => [...prev, material]);
  };
  const queryClient = useQueryClient();
  const { mutateAsync: postAnswer, isLoading: isPosting } = useMutation(
    (data) => API.answer(data.user_id, data.data),
    {
      onSuccess: (data) => {
        if (data.error) {
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
          return;
        }
        setMaterials([]);
        setSearch("");
        setAnswerText("");
        setSelectedMaterial([]);
        queryClient.refetchQueries(["answer", request_id]);
        enqueueSnackbar("Answer Added Successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
      },
      onError: (error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      },
    }
  );
  const handleReply = () => {
    const data = {
      user_id: user_info?.user_id,
      data: {
        request_id: request_id,
        answer: answerText,
        material_ids: JSON.stringify(
          materials?.flatMap((m) => m.material_id) ?? []
        ),
      },
    };
    postAnswer(data);
  };
  return (
    <Stack pr={0}>
      <Paper shadow="sm" withBorder p={isMobile ? "sm" : "md"}>
        <Stack>
          <Title order={isMobile ? 3 : 2} fw={800}>
            Write a Reply ✍️
          </Title>
          <Textarea
            minRows={4}
            autosize
            maxLength={999}
            description="Write your reply here and provide suggestions "
            placeholder="Write your reply here..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          ></Textarea>
          <Select
            label="Link Study Material with Reply 🔗📚"
            description="Press ➕ to Add"
            placeholder="Search and Select Study Material."
            searchValue={search}
            onSearchChange={setSearch}
            searchable
            nothingFoundMessage="No Study Material Found"
            multiple
            value={selectedMaterial ? selectedMaterial?.value : ""}
            onChange={(v, option) => setSelectedMaterial(option)}
            data={materialLinks ?? []}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addMaterial(JSON.parse(selectedMaterial.value) ?? -1);
                setSearch("");
              }
            }}
            leftSection={
              <ActionIcon
                variant="light"
                onClick={() => {
                  addMaterial(
                    JSON.parse(selectedMaterial?.value ?? null) ?? -1
                  );
                  setSearch("");
                }}
              >
                <IoAdd />
              </ActionIcon>
            }
            disabled={materials.length >= 3}
            error={materials.length >= 3 ? "Maximum 3 Materials Allowed" : ""}
          ></Select>
          <Group justify="flex-end">
            <Button
              fullWidth={isMobile}
              variant="light"
              rightSection={<FaReply />}
              loading={isPosting}
              onClick={handleReply}
            >
              Reply
            </Button>
          </Group>
          <Text fw={600} c="dimmed">
            Selected Materials
          </Text>
          {materials.length == 0 && (
            <Text c="dimmed">No Materials Selected</Text>
          )}
          <MaterialScrollList
            materials={materials}
            setMaterials={setMaterials}
          ></MaterialScrollList>
        </Stack>
      </Paper>
      <Divider></Divider>
      <Title order={isMobile ? 3 : 2} fw={800}>
        Responses 💬
      </Title>
      {answers?.length == 0 && <Text c="dimmed">No Responses Found</Text>}
      {answers?.length > 0 &&
        answers.map((answer, index) => (
          <AnswerCard key={index} answer={answer}></AnswerCard>
        ))}
    </Stack>
  );
}

export default Reply;
