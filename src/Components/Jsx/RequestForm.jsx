import { ActionIcon, Group, Stack, TextInput, Title } from "@mantine/core";
import { useField } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { FaQuestion } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";

function RequestForm() {
  const { user_info } = useAuth();
  const field = useField({
    mode: "controlled",
    initialValue: "",
    validate: (value) =>
      value.trim().length < 5 || value.trim().length > 1000
        ? "Request must be at least 5 and at most 1000 characters"
        : false,
  });
  const queryClient = useQueryClient();
  const { mutate: sendQuestion, isLoading } = useMutation({
    mutationKey: ["upload_request"],
    mutationFn: (data) => {
      API.uploadRequest(data.user_id, data.data);
    },
    onSuccess: (data) => {
      if (data?.error) {
        enqueueSnackbar("Error:" + data.error, {
          variant: "error",
          autoHideDuration: 1000,
        });
        return;
      }
      field.reset();
      enqueueSnackbar("Question added to the queue", {
        variant: "success",
        autoHideDuration: 1000,
      });
      setTimeout(() => {
        queryClient.refetchQueries(["get_requests"]);
      }, 500);
    },
    onError: (error) => {
      enqueueSnackbar("Error:" + error, {
        variant: "error",
        autoHideDuration: 1000,
      });
    },
  });

  const handleQuestionUpload = async () => {
    if (isLoading) return;
    const isValid = !(await field.validate());
    if (!isValid) return;
    sendQuestion({
      user_id: user_info?.user_id,
      data: { question: field.getValue().trim() },
    });
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack gap={0} w={"100%"}>
      <Title mb="sm" order={isMobile ? 3 : 2} fw={800}>
        Request Assistance <FaQuestion color="var(--primary-color)" />
      </Title>
      <Group gap={0} grow w={{ base: "100%", md: "50%" }}>
        <TextInput
          miw={250}
          description={"Unable to find what you are looking for? Ask here."}
          variant="default"
          {...field.getInputProps("question")}
          placeholder="Ask for notes, advice, or papers here"
          rightSection={
            <ActionIcon
              variant="transparent"
              onClick={handleQuestionUpload}
              loading={isLoading}
            >
              <IoSend />
            </ActionIcon>
          }
        ></TextInput>
      </Group>
    </Stack>
  );
}

export default RequestForm;
