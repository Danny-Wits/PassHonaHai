import { Button, Group, Stack } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import UserExtra from "../../Components/Jsx/UserExtra.jsx";
import UserProfile from "../../Components/Jsx/UserProfile.jsx";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";
import { PageRoutes, Times } from "../../Scripts/Const.js";

const Profile = () => {
  const { user_info } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const stateUserInfo = location.state?.user_info;
  const [page_user, setPageUser] = React.useState(null);
  const navigate = useNavigate();
  const id = stateUserInfo?.user_id ?? null;
  const { data: senior_data, isFetching: isFetchingSenior } = useQuery(
    ["get_seniors", user_info?.user_id],
    () => API.getSeniors(user_info?.user_id),
    {
      staleTime: Times.Minute,
      keepPreviousData: true,
      enabled: !!user_info?.user_id,
    }
  );
  const { data: juniors_data, isFetching: isFetchingJunior } = useQuery(
    ["get_juniors", user_info?.user_id],
    () => API.getJuniors(user_info?.user_id),
    {
      staleTime: Times.Minute,
      keepPreviousData: true,
      enabled: !!user_info?.user_id,
    }
  );
  const {
    data: page_user_data,
    isFetching,
    refetch: refetchPageUser,
  } = useQuery(["get_user", id], () => API.getUserInfo(id), {
    staleTime: Times.Minute,
    keepPreviousData: true,
    enabled: !!id,
  });

  useEffect(() => {
    if (page_user_data?.user_info) {
      setPageUser(page_user_data?.user_info);
    } else if (stateUserInfo?.user_info) {
      setPageUser(stateUserInfo.user_info);
    } else if (stateUserInfo?.user_id) {
      refetchPageUser();
    } else {
      navigate(PageRoutes.PublicProfiles);
    }
  }, [stateUserInfo, page_user_data]);

  const seniors = senior_data?.seniors ?? [];
  const juniors = juniors_data?.juniors ?? [];
  let relationship = false;

  seniors.some((s) => {
    if (s.user_id === id) {
      relationship = "Senior";
      return true;
    }
  });
  juniors.some((j) => {
    if (j.user_id === id) {
      relationship = "Junior";
      return true;
    }
  });

  const { mutateAsync: makeSenior, isLoading } = useMutation(
    (data) => API.makeSenior(data.user_id, data.data),
    {
      onSuccess: (data) => {
        if (data.error) {
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
          return;
        }
        queryClient
          .refetchQueries(["get_seniors", user_info?.user_id])
          .then(() => {});
        queryClient
          .refetchQueries(["get_juniors", user_info?.user_id])
          .then(() => {});
        refetchPageUser().then(() => {});
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );
  const { mutateAsync: deleteRelationship, isLoading: isdeletingRelationship } =
    useMutation((data) => API.deleteRelationship(data.user_id, data.data), {
      onSuccess: (data) => {
        if (data.error) {
          enqueueSnackbar(data.error, {
            variant: "error",
            autoHideDuration: 3000,
          });
          return;
        }
        queryClient
          .refetchQueries(["get_seniors", user_info?.user_id])
          .then(() => {});
        queryClient
          .refetchQueries(["get_juniors", user_info?.user_id])
          .then(() => {});
        refetchPageUser().then(() => {});
      },
      onError: (error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    });
  //User to Dashboard
  if (id !== null && id === user_info?.user_id) {
    return <Navigate to={PageRoutes.Dashboard} />;
  }

  const makePersonSenior = async () => {
    await makeSenior({ user_id: user_info.user_id, data: { senior_id: id } });
  };
  const deleteSenior = async () => {
    await deleteRelationship({
      user_id: user_info.user_id,
      data: { relative_user_id: id },
    });
  };
  return (
    <Stack w={"100%"} mih={"90vh"}>
      <UserProfile
        page_user={page_user}
        relationship={relationship}
      ></UserProfile>
      <Group>
        {!relationship ? (
          <Button
            onClick={makePersonSenior}
            variant={"default"}
            loading={
              isLoading || isFetching || isFetchingSenior || isFetchingJunior
            }
            fullWidth
          >
            Make Senior
          </Button>
        ) : (
          <Button
            onClick={deleteSenior}
            variant={"default"}
            loading={
              isLoading ||
              isFetching ||
              isFetchingSenior ||
              isFetchingJunior ||
              isdeletingRelationship
            }
            fullWidth
          >
            Remove {relationship === "Senior" ? " Senior" : " Junior"}
          </Button>
        )}
      </Group>
      <UserExtra user_id={id}></UserExtra>
    </Stack>

  );
};

export default Profile;
