import {
  Button,
  Center,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/mascot1.png";
import UserExtra from "../../Components/Jsx/UserExtra.jsx";
import UserProfile from "../../Components/Jsx/UserProfile.jsx";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";
import { Fields, Genders, Standards } from "../../Scripts/Const.js";

export const numberFromStandard = (Standard) => {
  if (!Standard) return "";
  switch (Standard) {
    case "1st":
      return "1";
    case "2nd":
      return "2";
    case "3rd":
      return "3";
    case "Higher Studies":
      return "HS";
    default:
      return Standard.replace("th", "");
  }
};
function Dashboard() {
  const { user_info, refetch_user_info, logout } = useAuth();
  const navigate = useNavigate();
  const [page_no, setPageNo] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const profilePic = React.useRef();
  const editForm = useForm({
    initialValues: {
      name: user_info?.name ?? "",
      bio: user_info?.bio ?? "",
      standard: user_info?.standard ?? "10th",
      field: user_info?.field ?? "Science",
      branch: user_info?.branch ?? "Computer Science",
      gender: user_info?.gender ?? "unknown",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value) =>
        value.length < 3 || value.length > 16
          ? "Name must be 3-16 characters"
          : null,
      bio: (value) =>
        value.length < 10 || value.length > 1000
          ? "Bio must be 10-1000 characters"
          : null,
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
    },
  });
  React.useEffect(() => {
    if (user_info) {
      editForm.setValues({
        name: user_info?.name ?? "",
        bio: user_info?.bio ?? "",
        standard: user_info?.standard ?? "10th",
        field: user_info?.field ?? "Science",
        branch: user_info?.branch ?? "Computer Science",
        gender: user_info?.gender ?? "unknown",
      });
    }
  }, [user_info]);

  const { mutate: uploadProfilePic, isLoading: uploadingProfilePic } =
    useMutation({
      mutationFn: (data) => API.uploadProfilePic(data.user_id, data.data),
      onSuccess: (data) => {
        refetch_user_info();
        if (data.error) {
          profilePic.current.src =
            user_info?.profile_picture_url ?? defaultImage;
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
          return;
        }
        enqueueSnackbar("Profile Pic Uploaded", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 2000,
        });
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
      retry: false,
    });
  const handlePicSubmit = async (input) => {
    const user_id = user_info?.user_id ?? 0;
    if (!input?.files[0]) {
      enqueueSnackbar("Please select a file", { variant: "error" });
      return;
    }
    const file = input.files[0];
    profilePic.current.src = URL.createObjectURL(file);
    uploadProfilePic({ user_id: user_id, data: file });
  };

  const { mutate: updateUserInfo, isLoading: updatingUserInfo } = useMutation({
    mutationFn: (data) => API.updateUserInfo(data.user_id, data.data),
    onSuccess: (data) => {
      refetch_user_info();
      if (data.error) {
        enqueueSnackbar(data.error, {
          variant: "error",
          autoHideDuration: 3000,
        });
        return;
      }
      setShowModal(false);
      enqueueSnackbar("User Info Updated", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
    retry: false,
  });

  const handleEditSubmit = (values, e) => {
    e.preventDefault();
    const user_id = user_info?.user_id ?? 0;
    updateUserInfo({ user_id: user_id, data: values });
  };
  const handleProfileClick = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "Image/jpg, Image/jpeg, Image/png";
    input.click();
    input.onchange = (e) => {
      e.preventDefault();
      handlePicSubmit(e.target);
    };
  };
  return (
    <Stack w={"100%"} mih={"90vh"}>
      <Modal
        opened={showModal}
        title={"Edit Info"}
        onClose={() => setShowModal(false)}
        zIndex={1000}
      >
        <form onSubmit={editForm.onSubmit(handleEditSubmit)}>
          <TextInput
            name={"name"}
            label={"Name"}
            {...editForm.getInputProps("name")}
          ></TextInput>
          <TextInput
            name={"bio"}
            label={"Bio"}
            {...editForm.getInputProps("bio")}
          ></TextInput>
          <Select
            label={"Standard"}
            name={"standard"}
            data={Standards}
            styles={{ dropdown: { zIndex: 1001 } }}
            {...editForm.getInputProps("standard")}
          ></Select>
          <Select
            name={"field"}
            label={"Field"}
            data={Object.keys(Fields)}
            styles={{ dropdown: { zIndex: 1001 } }}
            {...editForm.getInputProps("field")}
          ></Select>
          <Select
            name={"branch"}
            label={"Branch"}
            data={Fields[editForm.values.field]}
            styles={{ dropdown: { zIndex: 1001 } }}
            {...editForm.getInputProps("branch")}
          ></Select>
          <Select
            name={"gender"}
            label={"Gender"}
            data={Genders}
            styles={{ dropdown: { zIndex: 1001 } }}
            {...editForm.getInputProps("gender")}
          ></Select>
          <Center p={"sm"}>
            <Button type={"submit"}>Save</Button>
          </Center>
          <LoadingOverlay visible={updatingUserInfo}></LoadingOverlay>
        </form>
      </Modal>
      <UserProfile
        page_user={user_info}
        onProfileClick={handleProfileClick}
        profilePicRef={profilePic}
        actionButton={
          <Button
            variant={"light"}
            onClick={() => setShowModal(true)}
            size="xs"
            leftSection={<CiEdit />}
          >
            Edit Profile
          </Button>
        }
      ></UserProfile>
      <UserExtra user_id={user_info?.user_id}></UserExtra>
      <Group>
        <Button
          variant={"outline"}
          onClick={() => logout()}
          leftSection={<LuLogOut />}
          color={"red"}
          fullWidth
        >
          Logout
        </Button>
      </Group>
    </Stack>
  );
}

export default Dashboard;
