import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Landing from "./Pages/Jsx/Landing.jsx";
import Login from "./Pages/Jsx/Login.jsx";
import Register from "./Pages/Jsx/Register.jsx";
import Dashboard from "./Pages/Jsx/Dashboard.jsx";
import PublicProfiles from "./Pages/Jsx/PublicProfiles.jsx";
import Error from "./Pages/Jsx/Error.jsx";
import { PageRoutes } from "./Scripts/Const.js";
import { AuthProvider } from "./Context";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./PrivateRoute.jsx";
import AboutUs from "./Pages/Jsx/AboutUs.jsx";
import ContactUs from "./Pages/Jsx/ContactUs.jsx";
import Explore from "./Pages/Jsx/Explore.jsx";
import Profile from "./Pages/Jsx/Profile.jsx";
import UploadMaterial from "./Pages/Jsx/UploadMaterial.jsx";
import StudyMaterial from "./Pages/Jsx/StudyMaterial.jsx";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { NavBarPage } from "./NavBarPage.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: PageRoutes.Landing,
    element: (
      <NavBarPage>
        <Landing />
      </NavBarPage>
    ),
    errorElement: <Error />,
  },
  {
    path: PageRoutes.Login,
    element: <Login />,
  },
  {
    path: PageRoutes.Register,
    element: <Register />,
  },
  {
    path: PageRoutes.AboutUs,
    element: (
      <NavBarPage>
        <AboutUs />
      </NavBarPage>
    ),
  },
  {
    path: PageRoutes.ContactUs,
    element: <ContactUs />,
  },
  {
    path: PageRoutes.Explore,
    element: (
      <NavBarPage>
        <Explore />
      </NavBarPage>
    ),
  },
  {
    path: PageRoutes.Dashboard,
    element: (
      <NavBarPage>
        <PrivateRoute element={<Dashboard />} />
      </NavBarPage>
    ),
  },

  {
    path: PageRoutes.PublicProfiles,
    element: (
      <NavBarPage>
        <PrivateRoute element={<PublicProfiles />} />
      </NavBarPage>
    ),
  },
  {
    path: PageRoutes.PublicProfile,
    element: (
      <NavBarPage>
        <PrivateRoute element={<Profile />} />
      </NavBarPage>
    ),
  },
  {
    path: PageRoutes.UploadMaterial,
    element: (
      <NavBarPage>
        <PrivateRoute element={<UploadMaterial />} />
      </NavBarPage>
    ),
  },
  {
    path: PageRoutes.StudyMaterial,
    element: (
      <NavBarPage>
        <PrivateRoute element={<StudyMaterial />} />{" "}
      </NavBarPage>
    ),
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
