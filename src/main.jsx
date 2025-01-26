import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import Landing from "./Pages/Jsx/Landing.jsx";
import Login from "./Pages/Jsx/Login.jsx";
import Register from "./Pages/Jsx/Register.jsx";
import Dashboard from "./Pages/Jsx/Dashboard.jsx";
import PublicProfile from "./Pages/Jsx/PublicProfile.jsx";
import Error from "./Pages/Jsx/Error.jsx";
import { PageRoutes } from "./Scripts/Const.js";
import { AuthProvider } from "./Context";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./PrivateRoute.jsx";
import AboutUs from "./Pages/Jsx/AboutUs.jsx";
import ContactUs from "./Pages/Jsx/ContactUs.jsx";
import Explore from "./Pages/Jsx/Explore.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: PageRoutes.Landing,
    element: <Landing />,
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
    element: <AboutUs />,
  },
  {
    path: PageRoutes.ContactUs,
    element: <ContactUs />,
  },
  {
    path: PageRoutes.Explore,
    element: <Explore />,
  },
  {
    path: PageRoutes.Dashboard + ":name",
    element: <PrivateRoute element={<Dashboard />} />,
  },

  {
    path: PageRoutes.PublicProfile + ":name",
    element: <PrivateRoute element={<PublicProfile />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <SnackbarProvider />
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
