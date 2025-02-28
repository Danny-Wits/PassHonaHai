import {
  BackgroundImage,
  Button,
  Divider,
  Flex,
  Group,
  Space,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import landingImage from "../../assets/landing2.png";
import Features from "../../Components/Jsx/Features";
import Header from "../../Components/Jsx/Header";
import LandingFooter from "../../Components/Jsx/LandingFooter";
import { useAuth } from "../../Context";
import { PageRoutes } from "../../Scripts/Const";

function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated()) return <Navigate to={PageRoutes.Home}></Navigate>;
  const { setColorScheme } = useMantineColorScheme();
  setColorScheme("light");

  return (
    <Stack gap={0} px={"lg"}>
      <Header></Header>
      <Divider></Divider>
      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        justify="space-between"
        p={0}
      >
        <Stack
          h={{ base: "auto", sm: "90vh" }}
          w={{ base: "100%", sm: "40%" }}
          justify="center"
          p={"lg"}
          pos={"relative"}
        >
          <Title fz={{ base: "h3", sm: "h1" }}>
            Ace Exams with Notes, Advice, and a Community{" "}
            <span style={{ color: "var(--primary-color)" }}>That Cares!</span>
          </Title>
          <Text fz={{ base: "sm", sm: "lg" }} c={"bright"} fs={"italic"}>
            Explore a world of resources ———
          </Text>
          <Text fz={{ base: "sm", sm: "lg" }} c="bright" size="md">
            From old papers to expert advice and real connections. Join a
            thriving student community built to help you succeed.
          </Text>
          <Group>
            <Button
              variant="filled"
              onClick={() => {
                navigate(PageRoutes.Login);
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigate(PageRoutes.Register);
              }}
            >
              Register
            </Button>
          </Group>
        </Stack>
        <Stack h={{ base: "40vh", sm: "90vh" }} w={{ base: "100%", sm: "50%" }}>
          <BackgroundImage
            src={landingImage}
            h={"100%"}
            w={"100%"}
          ></BackgroundImage>
        </Stack>
      </Flex>
      <Space h={"xl"}></Space>
      <Features></Features>
      <LandingFooter></LandingFooter>
    </Stack>
  );
}

export default Landing;
