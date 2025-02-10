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
import Dropzone from "react-dropzone";
import { GoBook, GoGitBranch } from "react-icons/go";
import {
  MdOutlineDescription,
  MdOutlineFileUpload,
  MdOutlineSchool,
  MdOutlineTag,
  MdOutlineTitle,
} from "react-icons/md";
import NavBar from "../../Components/Jsx/NavBar.jsx";
import { useAuth } from "../../Context.jsx";
import API from "../../Scripts/API.js";
import {
  Fields,
  Standards,
  validFileTypesString,
} from "../../Scripts/Const.js";

const UploadMaterial = () => {
  const { user_info } = useAuth();
  const [branches, setBranches] = useState([]);
  const queryClient = useQueryClient();
  const { mutate: uploadStudyMaterial, isLoading: isUploading } = useMutation({
    mutationFn: (data) => {
      return API.uploadStudyMaterial(data.user_id, data.data);
    },
    onSuccess: (data) => {
      if (data.error) {
        enqueueSnackbar(data.error, {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }
      queryClient.refetchQueries(["get_material", 1]).then(() => {});
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
  }, [user_info]);

  const handleMaterialUpload = (values, e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    for (const key in values) {
      formDataObject.append(key, values[key]);
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
          Upload Study Material
        </Title>
        <Title align="center" hiddenFrom="md" order={2}>
          Upload Study Material
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
          <TagsInput
            label="Tags"
            description="Press enter to add upto 3 tags"
            placeholder="Enter tag"
            leftSection={<MdOutlineTag size={24} />}
            clearable
            maxTags={3}
            data={materialForm.values.tags}
            {...materialForm.getInputProps("tags")}
          />
          <Space h={"md"}></Space>
          <FileInput
            accept={validFileTypesString}
            label="Upload files"
            description="Select files to upload"
            placeholder="Click to select files"
            leftSection={<MdOutlineFileUpload size={24} />}
            clearable
            {...materialForm.getInputProps("file")}
          />
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
              Upload
            </Button>
          </Center>
        </form>
      </Paper>
    </Stack>
  );
};

export default UploadMaterial;

function prev(
  handleFormSubmit,
  formData,
  handleChange,
  setFormData,
  fileChanged,
  isUploading
) {
  return (
    <div className={"page"}>
      <NavBar />
      <div className={"section-header"}>UPLOAD STUDY MATERIAL</div>
      <form className={"login-form"} onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id={"title"}
          name={"title"}
          value={formData.name}
          onChange={handleChange}
          max={25}
          min={3}
          placeholder={"Enter Title 3 to 100 letters"}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id={"description"}
          name={"description"}
          value={formData.description}
          onChange={handleChange}
          min={10}
          max={1000}
          placeholder={"Enter Description of content : 10 to 1000 letters"}
        />
        <label htmlFor={"field"}>Field</label>
        <select
          id={"field"}
          name={"field"}
          value={formData.field}
          onChange={handleChange}
        >
          {Object.keys(Fields).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <label htmlFor={"standard"}>Standard</label>
        <select
          id={"standard"}
          name={"standard"}
          value={formData.standard}
          onChange={handleChange}
        >
          {Standards.map((standard) => (
            <option key={standard} value={standard}>
              {standard}
            </option>
          ))}
        </select>
        <label htmlFor={"branch"}>Branch</label>
        <select
          id={"branch"}
          name={"branch"}
          value={formData.branch}
          onChange={handleChange}
        >
          {(Fields[formData.field] ?? []).map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id={"tags"}
          name={"tags"}
          max={50}
          value={formData.tags}
          onChange={handleChange}
        />
        {formData.file ? (
          <div>
            <h1>{formData.file.name ?? "Unknown"} </h1>
            <embed src={URL.createObjectURL(formData.file)} />
            <button onClick={() => setFormData({ ...formData, file: null })}>
              Delete
            </button>
          </div>
        ) : (
          <Dropzone onDrop={fileChanged}>
            {({ getRootProps, getInputProps }) => (
              <section className={"file-dropzone"}>
                <div {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    accept={
                      "application/pdf, image/jpeg, image/png ,image/jpg , .docx , .ppt"
                    }
                  />
                  <p>
                    Drag drop some files here, or{" "}
                    <span className={"primary"}> click to</span> select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        )}

        <button type={"submit"} disabled={isUploading}>
          Upload
        </button>
      </form>
    </div>
  );
}
