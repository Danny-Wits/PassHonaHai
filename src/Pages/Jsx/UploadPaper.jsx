import {
  Button,
  Center,
  FileInput,
  Group,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { GoBook, GoGitBranch } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import {
  MdOutlineDescription,
  MdOutlineFileUpload,
  MdOutlineSchool,
  MdOutlineTitle,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";
import { Fields, Standards, validFileTypesString } from "../../Scripts/Const";

function UploadPaper() {
  const { user_info } = useAuth();
  const navigate = useNavigate();

  const { mutate: uploadPaper, isLoading: isUploading } = useMutation({
    mutationFn: (data) => API.uploadPaper(data.user_id, data.data),
    onSuccess: (data) => {
      if (data.error) {
        enqueueSnackbar(data.error, {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }
      navigate(-1);
      enqueueSnackbar("Paper Uploaded Successfully", {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    },
  });
  const uploadPaperForm = useForm({
    initialValues: {
      title: "",
      description: "",
      field: user_info?.field ?? "Science",
      branch: user_info?.branch ?? "Computer Science",
      year: user_info?.year ?? null,
      standard: user_info?.standard ?? 10,
      file: null,
    },
    validateInputOnBlur: true,
    validate: {
      title: (value) =>
        value.length < 3 || value.length > 16
          ? "Title must be 3-16 characters"
          : null,
      description: (value) =>
        value.length < 10 || value.length > 1000
          ? "Description must be 10-1000 characters"
          : null,
      field: (value) => (!value ? "Field cannot be empty" : null),
      branch: (value) => (!value ? "Branch cannot be empty" : null),
      year: (value) => {
        if (!value) {
          return "Year cannot be empty";
        }
        return null;
      },
      standard: (value) => {
        if (!value) {
          return "Standard cannot be empty";
        }
        return null;
      },
      file: (value) => {
        if (value?.size > 10 * 1024 * 1024 || value?.size <= 0) {
          return "File size cannot exceed 10MB";
        }
        if (
          value?.type !== "image/jpeg" &&
          value?.type !== "image/png" &&
          value?.type !== "image/jpg" &&
          value?.type !== "application/pdf" &&
          value?.type !== "application/msword" &&
          value?.type !==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          return "File type must be pdf, doc or docx or image";
        }
        return null;
      },
    },
  });
  const [branches, setBranches] = useState(
    Fields[uploadPaperForm.values.field]
  );

  const handleUpload = (values, e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in values) {
      if (key === "year") {
        continue;
      }
      formData.append(key, values[key]);
    }
    formData.append(
      "year",
      values["year"]?.getFullYear() ?? Date.now().getFullYear()
    );
    uploadPaper({ user_id: user_info.user_id, data: formData });
  };
  const handleFieldChange = (value) => {
    uploadPaperForm.setFieldValue("field", value);
    uploadPaperForm.setFieldValue("branch", null);
    setBranches(Fields[value]);
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack>
      <Group justify="center" gap={"sm"}>
        <Stack align="center" gap={0}>
          <Text fz={{ base: "h5", md: "h2" }} ta={"center"}>
            Upload Previous Year Papers
          </Text>
          <Text fz={{ base: 10, md: "h5" }} c={"dimmed"} ta={"center"}>
            Upload your previous year papers to ace your exams
          </Text>
        </Stack>

        <IoNewspaperOutline size={isMobile ? 44 : 64} color="#c029df" />
      </Group>

      <form onSubmit={uploadPaperForm.onSubmit(handleUpload)}>
        <TextInput
          label="Title"
          description="Add a title to this paper"
          leftSection={<MdOutlineTitle size={24} />}
          {...uploadPaperForm.getInputProps("title")}
        />
        <Space h={"md"}></Space>
        <TextInput
          label="Description"
          description="Add a description to this paper"
          leftSection={<MdOutlineDescription size={24} />}
          {...uploadPaperForm.getInputProps("description")}
        />
        <Space h={"md"}></Space>
        <YearPickerInput
          label="Year"
          description="Select the year of this paper"
          placeholder="Pick Year of the paper"
          valueFormat="YYYY"
          {...uploadPaperForm.getInputProps("year")}
        />
        <Space h={"md"}></Space>
        <FileInput
          accept={validFileTypesString}
          label="Upload files"
          description="Select files to upload"
          placeholder="Click to select files"
          leftSection={<MdOutlineFileUpload size={24} />}
          clearable
          {...uploadPaperForm.getInputProps("file")}
        />

        <Space h={"md"}></Space>
        <Select
          label="Standard"
          description="Select your standard"
          placeholder="Select Standard"
          data={Standards}
          leftSection={<MdOutlineSchool size={24} />}
          {...uploadPaperForm.getInputProps("standard")}
        />
        <Space h={"md"}></Space>
        <Select
          label="Field"
          placeholder="Select Field"
          description="Select the field of your paper"
          leftSection={<GoBook size={24} />}
          data={Object.keys(Fields)}
          {...uploadPaperForm.getInputProps("field")}
          onChange={handleFieldChange}
        />
        <Space h={"md"}></Space>

        <Select
          label="Branch"
          placeholder="Select Branch"
          description="Select the specific branch of this paper"
          leftSection={<GoGitBranch size={24} />}
          data={branches}
          {...uploadPaperForm.getInputProps("branch")}
        />
        <Center>
          <Button
            type="submit"
            fullWidth
            variant="default"
            mt={"xl"}
            loading={isUploading}
          >
            Upload
          </Button>
        </Center>
      </form>
    </Stack>
  );
}

export default UploadPaper;
