import { Space, Stack } from "@mantine/core";
import React from "react";
import QuestionQueue from "../../Components/Jsx/QuestionQueue";
import RequestForm from "../../Components/Jsx/RequestForm";

function Requests() {
  return (
    <Stack>
      <RequestForm></RequestForm>
      <Space h={20}></Space>
      <QuestionQueue></QuestionQueue>
    </Stack>
  );
}

export default Requests;
