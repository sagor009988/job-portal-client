import { createBrowserRouter } from "react-router-dom";

import MainLayouts from "../layouts/Mainlayouts";
import ApplyForm from "../pages/ApplyForm";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Login from "../pages/Login";
import MyApplications from "../pages/MyApplications";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/jobDetails/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/applyForm/:id",
        element: (
          <PrivateRoute>
            <ApplyForm></ApplyForm>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
