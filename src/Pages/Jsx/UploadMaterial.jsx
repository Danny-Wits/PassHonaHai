import {
  Button,
  Center,
  FileInput,
  Paper,
  Select,
  Space,
  Stack,
  TagsInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { GoBook, GoGitBranch } from "react-icons/go";
import {
  MdOutlineDescription,
  MdOutlineFileUpload,
  MdOutlineSchool,
  MdOutlineTag,
  MdOutlineTitle,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context.jsx";
import API from "../../Scripts/API.js";
import {
  Fields,
  PageRoutes,
  Standards,
  validFileTypesString,
} from "../../Scripts/Const.js";

const UploadMaterial = ({ updating = false }) => {
  const { user_info } = useAuth();
  const [branches, setBranches] = useState([]);
  const queryClient = useQueryClient();
  const previousMaterialInfo = useLocation().state?.material_info ?? null;
  const navigate = useNavigate();
  const { mutate: uploadStudyMaterial, isLoading: isUploading } = useMutation({
    mutationFn: (data) => {
      if (updating) {
        return API.updateStudyMaterial(user_info.user_id, data.data);
      } else {
        return API.uploadStudyMaterial(user_info.user_id, data.data);
      }
    },
    onSuccess: (data) => {
      if (data.error) {
        enqueueSnackbar(data.error, {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }
      queryClient.refetchQueries(["get_material"]).then(() => {});
      materialForm.setValues({
        title: "",
        description: "",
        standard: user_info?.standard ?? 10,
        field: user_info?.field ?? "Science",
        branch: user_info?.branch ?? "Computer Science",
        tags: [],
        file: null,
      });
      enqueueSnackbar("Material Uploaded Successfully", {
        variant: "success",
        preventDuplicate: true,
        autoHideDuration: 2000,
      });
      if (updating) {
        navigate(PageRoutes.StudyMaterial, {
          state: { material: data.material_info },
        });
      }
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const materialForm = useForm({
    initialValues: {
      title: "",
      description: "",
      standard: user_info?.standard ?? 10,
      field: user_info?.field ?? "Science",
      branch: user_info?.branch ?? "Computer Science",
      tags: [],
      file: null,
    },
    validateInputOnChange: true,
    validate: {
      title: (value) => {
        if (!value) {
          return "Title cannot be empty";
        }
        return value.length < 3 || value.length > 100
          ? "Name must be 3-100 characters"
          : null;
      },

      description: (value) => {
        if (!value) {
          return "Description cannot be empty";
        }
        return value.length < 10 || value.length > 1000
          ? "Description must be 10-1000 characters"
          : null;
      },

      tags: (value) => {
        value ??
          [].split(",").forEach((tag) => {
            if (tag.length < 3 || tag.length > 30) {
              return "Tags must be 3-30 characters";
            }
            return null;
          });
      },
      standard: (value) => {
        if (!value) {
          return "Standard cannot be empty";
        }
        return null;
      },

      field: (value) => {
        if (!value) {
          return "Field cannot be empty";
        }
        return null;
      },

      branch: (value) => {
        if (!value) {
          return "Branch cannot be empty";
        }
        return null;
      },

      file: (value) => {
        if (updating) return null;
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
  useEffect(() => {
    if (!user_info) {
      return;
    }
    if (updating && !previousMaterialInfo) {
      navigate(PageRoutes.Explore);
      return;
    }
    if (updating && previousMaterialInfo) {
      materialForm.setValues({
        title: previousMaterialInfo?.title,
        description: previousMaterialInfo?.description,
        standard: previousMaterialInfo?.standard,
        field: previousMaterialInfo?.field,
        branch: previousMaterialInfo?.branch,
        tags: previousMaterialInfo?.tags,
        file: previousMaterialInfo?.file,
      });
      setBranches(Fields[previousMaterialInfo?.field]);
    } else {
      materialForm.setValues({
        title: "",
        description: "",
        standard: user_info?.standard ?? 10,
        field: user_info?.field ?? "Science",
        branch: user_info?.branch ?? "Computer Science",
        tags: [],
        file: null,
      });
      setBranches(Fields[user_info?.field]);
    }
  }, [user_info]);

  const handleMaterialUpload = (values, e) => {
    e.preventDefault();
    console.log(values);

    const formDataObject = new FormData();
    for (const key in values) {
      formDataObject.append(key, values[key]);
    }
    if (updating) {
      uploadStudyMaterial({
        user_id: user_info.user_id,
        data: {
          material_id: previousMaterialInfo.material_id,
          ...values,
        },
      });
      return;
    }
    uploadStudyMaterial({
      user_id: user_info.user_id,
      data: formDataObject,
    });
  };

  const handleFieldChange = (value) => {
    materialForm.setFieldValue("field", value);
    materialForm.setFieldValue("branch", null);
    setBranches(Fields[value]);
  };

  return (
    <Stack>
      <Center>
        <Title align="center" visibleFrom="md" order={1}>
          {updating ? "Update" : "Upload"} Study Material
        </Title>
        <Title align="center" hiddenFrom="md" order={2}>
          {updating ? "Update" : "Upload"} Study Material
        </Title>
      </Center>
      <Paper shadow="md" radius="md" p={"md"} m="sm">
        <form onSubmit={materialForm.onSubmit(handleMaterialUpload)}>
          <TextInput
            label="Title"
            description="Add a title to your study material"
            leftSection={<MdOutlineTitle size={24} />}
            {...materialForm.getInputProps("title")}
          />
          <Space h={"md"}></Space>
          <TextInput
            label="Description"
            description="Add a description to your study material"
            leftSection={<MdOutlineDescription size={24} />}
            {...materialForm.getInputProps("description")}
          />
          <Space h={"md"}></Space>
          {!updating && (
            <>
              <TagsInput
                label="Tags"
                description="Press enter to add upto 3 tags"
                placeholder="Enter tag"
                leftSection={<MdOutlineTag size={24} />}
                clearable
                maxTags={3}
                data={materialForm?.values?.tags}
                {...materialForm.getInputProps("tags")}
              />
              <Space h={"md"}></Space>
              <FileInput
                accept={validFileTypesString}
                label="Upload files"
                description="Select files to upload"
                placeholder="Click to select files"
                leftSection={<MdOutlineFileUpload size={24} />}
                clearable={!updating}
                readOnly={updating}
                {...materialForm.getInputProps("file")}
              />
            </>
          )}

          <Space h={"md"}></Space>
          <Select
            label="Standard"
            description="Select your standard"
            placeholder="Select Standard"
            data={Standards}
            leftSection={<MdOutlineSchool size={24} />}
            {...materialForm.getInputProps("standard")}
          />
          <Space h={"md"}></Space>
          <Select
            label="Field"
            placeholder="Select Field"
            description="Select the field of your study material"
            leftSection={<GoBook size={24} />}
            data={Object.keys(Fields)}
            {...materialForm.getInputProps("field")}
            onChange={handleFieldChange}
          />
          <Space h={"md"}></Space>

          <Select
            label="Branch"
            placeholder="Select Branch"
            description="Select the specific branch of your study material"
            leftSection={<GoGitBranch size={24} />}
            data={branches}
            {...materialForm.getInputProps("branch")}
          />
          <Center>
            <Button
              type="submit"
              fullWidth
              variant="default"
              loading={isUploading}
              mt={"xl"}
            >
              {updating ? "Update" : "Upload"}
            </Button>
          </Center>
        </form>
      </Paper>
    </Stack>
  );
};

export default UploadMaterial;
