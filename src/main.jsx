import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import "./index.css";
import Landing from "./Pages/Jsx/Landing.jsx";
import Login from "./Pages/Jsx/Login.jsx";
import Register from "./Pages/Jsx/Register.jsx";
import Dashboard from "./Pages/Jsx/Dashboard.jsx";
import PublicProfiles from "./Pages/Jsx/PublicProfiles.jsx";
import Error from "./Pages/Jsx/Error.jsx";
import {PageRoutes} from "./Scripts/Const.js";
import {AuthProvider} from "./Context";
import {SnackbarProvider} from "notistack";
import PrivateRoute from "./PrivateRoute.jsx";
import AboutUs from "./Pages/Jsx/AboutUs.jsx";
import ContactUs from "./Pages/Jsx/ContactUs.jsx";
import Explore from "./Pages/Jsx/Explore.jsx";
import Profile from "./Pages/Jsx/Profile.jsx";
import UploadMaterial from "./Pages/Jsx/UploadMaterial.jsx";
import StudyMaterial from "./Pages/Jsx/StudyMaterial.jsx";
import {M}
const queryClient = new QueryClient();


const router = createBrowserRouter([
    {
        path: PageRoutes.Landing,
        element: <Landing/>,
        errorElement: <Error/>,
    },
    {
        path: PageRoutes.Login,
        element: <Login/>,
    },
    {
        path: PageRoutes.Register,
        element: <Register/>,
    },
    {
        path: PageRoutes.AboutUs,
        element: <AboutUs/>,
    },
    {
        path: PageRoutes.ContactUs,
        element: <ContactUs/>,
    },
    {
        path: PageRoutes.Explore,
        element: <Explore/>,
    },
    {
        path: PageRoutes.Dashboard + ":name",
        element: <PrivateRoute element={<Dashboard/>}/>,
    },

    {
        path: PageRoutes.PublicProfiles,
        element: <PrivateRoute element={<PublicProfiles/>}/>,
    },
    {
        path: PageRoutes.PublicProfile + ":id",
        element: <PrivateRoute element={<Profile/>}/>
    },
    {
        path: PageRoutes.UploadMaterial,
        element: <PrivateRoute element={<UploadMaterial/>}/>
    },
    {
        path: PageRoutes.StudyMaterial + ":id",
        element: <PrivateRoute element={<StudyMaterial/>}/>
    }
]);


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router}/>
                <SnackbarProvider/>
                <ReactQueryDevtools/>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
