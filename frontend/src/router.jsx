import React from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Layout/Layout";
import LazyLoader from "./components/Dashboard/LazyLoader";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";


const DashboardHome = lazy(() => import("./components/DashboardHome.jsx/DashboardHome"));
const CreatePage = lazy(() => import("./pages/Create.Page"))


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
        path: "/products",
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
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);


export default router