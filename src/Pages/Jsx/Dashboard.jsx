import {
  ActionIcon,
  Affix,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../Components/Jsx/UserProfile.jsx";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";
import {
  Fields,
  Genders,
  PageRoutes,
  Standards,
  Times,
} from "../../Scripts/Const.js";
import defaultImage from "../../assets/mascot1.png";

export const numberFromStandard = (Standard) => {
  if (!Standard) return "";
  switch (Standard) {
    case "1st":
      return "1";
    case "2nd":
      return "2";
    case "3rd":
      return "3";
    default:
      return Standard.replace("th", "");
  }
};
function Dashboard() {
  const { user_info, refetch_user_info } = useAuth();
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

  //Relation Fetch
  const { data: seniorsData, status: seniorStatus } = useQuery(
    ["get_seniors", user_info?.user_id],
    () => API.getSeniors(user_info?.user_id),
    {
      staleTime: Times.Minute * 10,
      enabled: !!user_info?.user_id,
    }
  );

  const { data: juniorsData, status: juniorStatus } = useQuery(
    ["get_juniors", user_info?.user_id],
    () => API.getJuniors(user_info?.user_id),
    {
      staleTime: Times.Minute * 10,
      enabled: !!user_info?.user_id,
    }
  );

  if (seniorStatus === "error")
    enqueueSnackbar("Error Fetching Seniors", { variant: "error" });
  if (juniorStatus === "error")
    enqueueSnackbar("Error Fetching Juniors", { variant: "error" });
  const seniors = seniorsData?.seniors ?? [];
  const juniors = juniorsData?.juniors ?? [];

  const { data: DataStudyMaterialsOfUser } = useQuery(
    ["get_material_of_user", page_no],
    () => API.getStudyMaterialsOfUser(user_info?.user_id, page_no),
    {
      staleTime: Times.Minute * 10,
      enabled: !!user_info?.user_id,
      keepPreviousData: true,
    }
  );
  const studyMaterialsOfUser = DataStudyMaterialsOfUser?.materials ?? [];
  const { mutate: uploadProfilePic, isLoading: uploadingProfilePic } =
    useMutation({
      mutationFn: (data) => API.uploadProfilePic(data.user_id, data.data),
      onSuccess: (data) => {
        refetch_user_info();
        if (data.error) {
          profilePic.current.src =
            user_info?.profile_picture_url ?? defaultImage;
          enqueueSnackbar(data.error, { variant: "error" });
          return;
        }
        enqueueSnackbar("Profile Pic Uploaded", { variant: "success" });
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
        enqueueSnackbar(data.error, { variant: "error" });
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
    input.click();
    input.onchange = (e) => {
      e.preventDefault();
      handlePicSubmit(e.target);
    };
  };
  return (
    <Stack w={"100%"} mih={"90vh"}>
      <Affix visibleFrom="sm" position={{ bottom: 30, right: 30 }}>
        <Tooltip label="Add Study Material">
          <ActionIcon
            size={"xl"}
            radius={"xl"}
            onClick={() => navigate(PageRoutes.UploadMaterial)}
          >
            <LuPlus />
          </ActionIcon>
        </Tooltip>
      </Affix>
      <Modal
        opened={showModal}
        title={"Edit Info"}
        onClose={() => setShowModal(false)}
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
            {...editForm.getInputProps("standard")}
          ></Select>
          <Select
            name={"field"}
            label={"Field"}
            data={Object.keys(Fields)}
            {...editForm.getInputProps("field")}
          ></Select>
          <Select
            name={"branch"}
            label={"Branch"}
            data={Fields[editForm.values.field]}
            {...editForm.getInputProps("branch")}
          ></Select>
          <Select
            name={"gender"}
            label={"Gender"}
            data={Genders}
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
      ></UserProfile>
      <Group>
        <Button
          variant={"default"}
          onClick={() => setShowModal(true)}
          fullWidth
        >
          Edit
        </Button>
      </Group>
    </Stack>
  );
}

export default Dashboard;
