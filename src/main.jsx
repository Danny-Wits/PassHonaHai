import "@mantine/carousel/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context";
import "./index.css";
import { NavBarPage } from "./NavBarPage.jsx";
import AboutUs from "./Pages/Jsx/AboutUs.jsx";
import ContactUs from "./Pages/Jsx/ContactUs.jsx";
import Dashboard from "./Pages/Jsx/Dashboard.jsx";
import Error from "./Pages/Jsx/Error.jsx";
import Explore from "./Pages/Jsx/Explore.jsx";
import Home from "./Pages/Jsx/Home.jsx";
import Landing from "./Pages/Jsx/Landing.jsx";
import Login from "./Pages/Jsx/Login.jsx";
import Profile from "./Pages/Jsx/Profile.jsx";
import PublicProfiles from "./Pages/Jsx/PublicProfiles.jsx";
import Register from "./Pages/Jsx/Register.jsx";
import Requests from "./Pages/Jsx/Requests.jsx";
import StudyMaterial from "./Pages/Jsx/StudyMaterial.jsx";
import StudyMaterialLink from "./Pages/Jsx/StudyMaterialLink.jsx";
import UploadMaterial from "./Pages/Jsx/UploadMaterial.jsx";
import UploadPaper from "./Pages/Jsx/UploadPaper.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { PageRoutes } from "./Scripts/Const.js";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: PageRoutes.Landing,
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: PageRoutes.Home,
    element: (
      <NavBarPage>
        <PrivateRoute element={<Home />}></PrivateRoute>
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.Login,
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: PageRoutes.Register,
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: PageRoutes.AboutUs,
    element: (
      <NavBarPage>
        <AboutUs />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.ContactUs,
    element: <ContactUs />,
    errorElement: <Error />,
  },
  {
    path: PageRoutes.Explore,
    element: (
      <NavBarPage>
        <PrivateRoute element={<Explore />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.Dashboard,
    element: (
      <NavBarPage>
        <PrivateRoute element={<Dashboard />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },

  {
    path: PageRoutes.PublicProfiles,
    element: (
      <NavBarPage>
        <PrivateRoute element={<PublicProfiles />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.PublicProfile,
    element: (
      <NavBarPage>
        <PrivateRoute element={<Profile />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.UploadMaterial,
    element: (
      <NavBarPage>
        <PrivateRoute element={<UploadMaterial />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.StudyMaterial,
    element: (
      <NavBarPage>
        <PrivateRoute element={<StudyMaterial />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.StudyMaterial + ":id",
    element: (
      <NavBarPage>
        <PrivateRoute element={<StudyMaterialLink />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.EditMaterial,
    element: (
      <NavBarPage>
        <PrivateRoute element={<UploadMaterial updating={true} />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.UploadPaper,
    element: (
      <NavBarPage>
        <PrivateRoute element={<UploadPaper />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.Requests,
    element: (
      <NavBarPage>
        <PrivateRoute element={<Requests />} />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
]);
const myColor = [
  "#ffebff",
  "#f5d5fb",
  "#e6a8f3",
  "#d779eb",
  "#cb51e4",
  "#c337e0",
  "#c029df",
  "#a91cc6",
  "#9715b1",
  "#84099c",
];
const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Greycliff CF, sans-serif" },
  primaryColor: "themeColor",
  colors: {
    themeColor: myColor,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <SnackbarProvider />
          <ReactQueryDevtools />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
