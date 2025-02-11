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
    <Stack gap={0}>
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
          <Title>
            Ace Exams with Notes, Advice, and a Community{" "}
            <span style={{ color: "var(--primary-color)" }}>That Cares!</span>
          </Title>
          <Text c={"bright"} fs={"italic"}>
            Explore a world of resources ———
          </Text>
          <Text c="bright" size="md">
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
// <div className="page">
//   <div className="main">
//     <div className="left">
//       <p className="heading">
//         Ace Exams with Notes, Advice, and a Community{" "}
//         <span className="primary">That Cares!</span>
//       </p>
//       <p className="sub-heading">
//         <span className="primary"></span>{" "}
//         <br />
//         From old papers to expert advice and real connections. Join a
//         thriving student community built to help you succeed.
//       </p>
//       <div className="buttons">
//         <button className="primary-button">Get Started</button>
//         <button className="secondary-button">View Study Materials</button>
//       </div>
//     </div>
//     <div className="right image-right"></div>
//   </div>

//   <h1 className="section-header">What We Offer</h1>
//   <h3 className="section-subheader">
//     Take a look at the services that we offer.
//   </h3>
//   <div className="card-container">
//     <Card
//       image={oldPaper}
//       title="Old Papers"
//       subtitle={
//         "Prepare smarter with access to previous year's question papers."
//       }
//     />
//     <Card
//       image={studyNotes}
//       title="Study Notes"
//       subtitle={
//         "Find and share concise, high-quality notes for every subject and topic."
//       }
//     />
//     <Card
//       image={senior}
//       title="Senior Advice"
//       subtitle={
//         "Get tips, tricks, and guidance straight from experienced seniors."
//       }
//     />
//     <Card
//       image={colab}
//       title="Collaborate & Share"
//       subtitle={
//         "Join discussions, clarify doubts, and share knowledge with peers."
//       }
//     />
//   </div>

//   <h1 className="section-header">Share Knowledge, Unlock Success!</h1>
//   <h3 className="section-subheader">
//     Empowering students to help each other by sharing notes and resources.
//   </h3>
//   <div className="steps-container">
//     <div className="step">
//       <h1 className="numbering">
//         1<FontAwesomeIcon icon={faUpload} />
//       </h1>
//       <h3 className="text">
//         <p className="primary">Upload Your Notes</p>
//         Contribute to the community by uploading your class notes, study
//         guides, or solved papers.
//       </h3>
//     </div>
//     <div className="step">
//       <h3 className="text">
//         <p className="primary">Explore the Library</p>
//         Access an ever-growing library of notes and resources shared by
//         students like you.
//       </h3>
//       <h1 className="numbering">
//         <FontAwesomeIcon icon={faBookOpen} />2
//       </h1>
//     </div>
//     <div className="step">
//       <h1 className="numbering">
//         3<FontAwesomeIcon icon={faDownload} />
//       </h1>
//       <h3 className="text">
//         <p className="primary">Download What You Need</p>
//         Find and download notes for your exams, assignments, or projects
//         with ease
//       </h3>
//     </div>

//     <div className="step">
//       <h3 className="text">
//         <p className="primary ">Grow Together</p>
//         Help others succeed and benefit from a collaborative community of
//         learners.
//       </h3>
//       <h1 className="numbering">
//         <FontAwesomeIcon icon={faHandshake} />4
//       </h1>
//     </div>
//   </div>
//   <footer>
//     <h1>&copy; PassHonaHai</h1>
//   </footer>
// </div>
