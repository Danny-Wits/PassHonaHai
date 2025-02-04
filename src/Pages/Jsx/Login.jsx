import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../Scripts/API";
import { useAuth } from "../../Context";
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
import loginImageLeft from "../../assets/login-pic-left.png";
import loginImageRight from "../../assets/login-pic-right.png";
import { useForm } from "@mantine/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faExclamationTriangle,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { notifications } from "@mantine/notifications";

// users
// (user_id: INT AUTO_INCREMENT, name: VARCHAR(100), email: VARCHAR(255) UNIQUE, password_hash: VARCHAR(255), created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(user_id))

// user_profiles
// (user_id: INT, bio: TEXT, profile_picture_url: TEXT, academic_details: TEXT, social_links: JSON, PRIMARY KEY(user_id), FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE)

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { set_user_info } = useAuth();
  const colorSheme = useComputedColorScheme();
  const { mutate: authenticationFetch, isLoading } = useMutation({
    mutationKey: ["authenticateUser"],
    mutationFn: (formData) =>
      API.authenticateUser(formData.email, formData.password),
    onSuccess: async (data) => {
      if (data["error"]) {
        notifications.show({
          title: "Error",
          message: "Error: " + data["error"],
          icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
          withCloseButton: true,
          color: "red",
          withBorder: true,
        });
        return;
      }
      const user_info = data["user_info"];
      sessionStorage.setItem("__user__", JSON.stringify(user_info));
      queryClient.setQueryData(["user_info"], user_info);
      set_user_info(user_info);
      notifications.show({
        title: "Login Successful",
        message: "Welcome " + user_info.name,
        icon: <FontAwesomeIcon icon={faKey} />,
        withCloseButton: true,
        autoClose: 100000,
        withBorder: true,
      });
      navigate(PageRoutes.Landing);
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: "Error: " + error.message,
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
        withCloseButton: true,
        color: "red",
        withBorder: true,
      });
      console.log(error);
    },
  });

  const handleSubmit = async (values, e) => {
    e.preventDefault();
    authenticationFetch(values);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 4 || value.length > 16
          ? "Password must be 4-16 characters"
          : null,
    },
  });
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
          p={"xl"}
          bg={"var(--mantine-color-body)"}
          radius={"md"}
          style={{
            border: "1px solid var(--text-color)",
            boxShadow: "var(--thicker-shadow)",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <div className="mascot-1"></div>

          <CloseButton
            pos={"absolute"}
            top={"10px"}
            right={"10px"}
            size="lg"
            onClick={() => navigate(PageRoutes.Landing)}
          />

          <Text ta={"center"} size={"xl"} fw={900}>
            Login to{" "}
            <span style={{ color: "var(--primary-color)" }}>Pass Hona Hai</span>
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
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
              <Center>
                <Button type={"submit"} loading={isLoading}>
                  Login
                </Button>
              </Center>
              <Center>
                <Text c={"gray"} size={"sm"}>
                  {"Don't"} have an account?{" "}
                  <span
                    className={"link-like"}
                    onClick={() => navigate(PageRoutes.Register)}
                  >
                    Register
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
          style={{ filter: colorSheme === "dark" ? "invert(1)" : "" }}
        ></BackgroundImage>
      </Flex>

      {/*<div className="login-box">*/}
      {/*  <FontAwesomeIcon*/}
      {/*    icon={faXmark}*/}
      {/*    className="cross-button"*/}
      {/*    onClick={() => navigate(PageRoutes.Landing)}*/}
      {/*  />*/}
      {/*  */}
      {/*  <div className="title">*/}
      {/*    Login to{" "}*/}
      {/*    <span*/}
      {/*      className="link-like title"*/}
      {/*      onClick={() => enqueueSnackbar("Login first", { variant: "info" })}*/}
      {/*    >*/}
      {/*      Pass Hona Hai*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  <form className="login-form flex" onSubmit={handleSubmit}>*/}
      {/*    <label htmlFor="email">*/}
      {/*      Email &nbsp;*/}
      {/*      <FontAwesomeIcon*/}
      {/*        icon={faEnvelope}*/}
      {/*        style={{ color: "var(--primary-color)" }}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*    <input*/}
      {/*      type="email"*/}
      {/*      placeholder="Email"*/}
      {/*      value={formData.email}*/}
      {/*      name="email"*/}
      {/*      onChange={handleChange}*/}
      {/*      maxLength={255}*/}
      {/*      minLength={5}*/}
      {/*      required*/}
      {/*    />*/}
      {/*    <label htmlFor="password">*/}
      {/*      Password&nbsp;{" "}*/}
      {/*      <FontAwesomeIcon*/}
      {/*        icon={faLock}*/}
      {/*        style={{ color: "var(--primary-color)" }}*/}
      {/*      />{" "}*/}
      {/*      &nbsp;*/}
      {/*    </label>*/}
      {/*    <PasswordInput*/}
      {/*      showPassword={showPassword}*/}
      {/*      setShowPassword={setShowPassword}*/}
      {/*      handleChange={handleChange}*/}
      {/*      name={"password"}*/}
      {/*      formData={formData.password}*/}
      {/*    />*/}

      {/*    <Link className="link-like" to={PageRoutes.ForgotPassword}>*/}
      {/*      Forgot Password?*/}
      {/*    </Link>*/}
      {/*    <button type="submit" disabled={isLoading}>*/}
      {/*      {isLoading ? "Loading..." : "Login"}*/}
      {/*    </button>*/}
      {/*    <p className="caption">*/}
      {/*      Don{"'"}t have an account? &nbsp;*/}
      {/*      <Link className="link-like" to={PageRoutes.Register}>*/}
      {/*        Register*/}
      {/*      </Link>*/}
      {/*    </p>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </Flex>
  );
}

export default Login;
