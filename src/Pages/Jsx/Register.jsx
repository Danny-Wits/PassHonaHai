import {
  faAt,
  faEye,
  faEyeSlash,
  faKey,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BackgroundImage,
  Button,
  Center,
  CloseButton,
  Flex,
  Overlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useComputedColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImageLeft from "../../assets/login-pic-left.png";
import loginImageRight from "../../assets/login-pic-right.png";
import { useAuth } from "../../Context";
import API from "../../Scripts/API";
import { PageRoutes } from "../../Scripts/Const";

function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { set_user_info } = useAuth();
  const [visible, setvisible] = useState(false);
  const colorSheme = useComputedColorScheme();
  const { mutate: registrationPost, isLoading } = useMutation({
    mutationKey: ["registrationPost"],
    mutationFn: (formData) =>
      API.registerUser(formData.name, formData.email, formData.password),
    onSuccess: async (data) => {
      if (data["error"]) {
        notifications.show({
          title: "ERROR",
          message: data.error,
          color: "red",
          withCloseButton: true,
          autoHideDuration: 5000,
        });
        return;
      }
      const user_info = data["user_info"];
      localStorage.setItem("__user__", JSON.stringify(user_info));
      queryClient.setQueryData(["user_info"], user_info);
      set_user_info(user_info);
      notifications.show({
        title: "Registration Successful",
        message: "Welcome " + name,
        withCloseButton: true,
        autoHideDuration: 3000,
      });
      notifications.show({
        title: "Add and Edit your profile ",
        message: "",
        autoHideDuration: 1000,
        withCloseButton: true,
      });
      navigate(PageRoutes.Dashboard);
    },
    onError: (error, data) => {
      notifications.show({
        title: "Registration Failed",
        message: error.message,
        variant: "error",
        autoClose: 1000,
        withCloseButton: true,
      });
      console.log(error);
      console.log(data);
    },
  });

  const handleSubmit = async (values, e) => {
    e.preventDefault();
    registrationPost(values);
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirm_password: "",
    },
    validateInputOnChange: true,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.length < 3 || value.length > 16
          ? "Name must be 3-16 characters"
          : null,
      password: (value) =>
        value.length < 4 || value.length > 16
          ? "Password must be 4-16 characters"
          : null,
      confirm_password: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
  const toggle = () => {
    setvisible((pre) => !pre);
  };
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      mih={"100vh"}
      justify={{ base: "center", md: "flex-start" }}
      style={{ position: "relative" }}
    >
      <Flex
        h={{ base: "50vh", md: "100vh" }}
        w={{ base: "100%", md: "50%" }}
        style={{ position: "relative" }}
      >
        <BackgroundImage src={loginImageLeft} h={"100%"}></BackgroundImage>
        <Overlay backgroundOpacity={0.4} style={{ zIndex: 1 }}></Overlay>
      </Flex>

      {/*LOGIN FORM*/}
      <Center
        top={"0px"}
        left={{ base: "5%", md: "50%" }}
        w={{ base: "90%", md: "50%" }}
        miw={"300px"}
        h={"100%"}
        style={{ zIndex: 10, position: "absolute" }}
      >
        <Flex
          direction={"column"}
          w={{ base: "90%", md: "400px" }}
          bg={"var(--mantine-color-body)"}
          p={"xl"}
          radius={"md"}
          style={{
            border: "1px solid var(--text-color)",
            boxShadow: "var(--thicker-shadow)",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <div className="mascot-1"></div>{" "}
          <CloseButton
            pos={"absolute"}
            top={"10px"}
            right={"10px"}
            size="lg"
            onClick={() => navigate(PageRoutes.Landing)}
          />
          <Text ta={"center"} size={"xl"} fw={900}>
            Welcome to{" "}
            <span style={{ color: "var(--primary-color)" }}>Pass Hona Hai</span>
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Name"
                withAsterisk
                leftSection={<FontAwesomeIcon icon={faUser} />}
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Email"
                placeholder="Email"
                withAsterisk
                leftSection={<FontAwesomeIcon icon={faAt} />}
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                withAsterisk
                leftSection={<FontAwesomeIcon icon={faKey} />}
                visible={visible}
                onVisibilityChange={toggle}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )
                }
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm Password"
                withAsterisk
                visible={visible}
                onVisibilityChange={toggle}
                leftSection={<FontAwesomeIcon icon={faLock} />}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )
                }
                key={form.key("confirm_password")}
                {...form.getInputProps("confirm_password")}
              />
              <Center>
                <Button type={"submit"} loading={isLoading}>
                  Register
                </Button>
              </Center>
              <Center>
                <Text c={"dimmed"} size={"sm"}>
                  Already have an account?{" "}
                  <span
                    className={"link-like"}
                    onClick={() => navigate(PageRoutes.Login)}
                  >
                    Login
                  </span>
                </Text>
              </Center>
            </Stack>
          </form>
        </Flex>
      </Center>

      <Flex
        align="center"
        justify="center"
        h={{ base: "50vh", md: "100vh" }}
        w={{ base: "100%", md: "50%" }}
        style={{ position: "relative" }}
      >
        <BackgroundImage
          src={loginImageRight}
          h={"100%"}
          style={{ filter: colorSheme === "dark" ? "invert(1)" : "none" }}
        ></BackgroundImage>
      </Flex>
    </Flex>
  );
}

export default Register;
