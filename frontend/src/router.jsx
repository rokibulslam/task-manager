import React from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Layout/Layout";
import LazyLoader from "./components/Dashboard/LazyLoader";
import Login from "./pages/Login/Login"





const DashboardHome = lazy(() => import("./components/DashboardHome.jsx/DashboardHome"));
const CreatePage = lazy(() => import("./pages/Create.Page"))


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: "/createTask",
        element: (
          <Suspense fallback={<LazyLoader />}>
            <CreatePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element:<Login />
  }
]);


export default router