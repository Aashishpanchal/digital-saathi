import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChangePassword from "../pages/home/user/ChangePassword";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/home/Dashboard";
import AdminProtectedRoute from "./AdminProtectedRoute";
import PublicRouter from "./PublicRouter";
import Farmers from "../pages/home/management/farmers/Farmers";
import Retailers from "../pages/home/management/retailers/Retailers";
import CreateFarmers from "../pages/home/management/farmers/CreateFarmers";
import RetrieveUpdate from "../pages/home/management/farmers/RetrieveUpdate";
import Categories from "../pages/home/management/categories/Categories";
import CreateRetailers from "../pages/home/management/retailers/CreateRetailers";
import RetrieveUpdateRetailers from "../pages/home/management/retailers/RetrieveUpdateRetailers";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="auth/login"
          element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          }
        />
        <Route
          path="user/change-password"
          element={
            <AdminProtectedRoute>
              <ChangePassword />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/management/farmers"
          element={
            <AdminProtectedRoute>
              <Farmers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/management/farmers/new"
          element={
            <AdminProtectedRoute>
              <CreateFarmers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/management/farmers/:id"
          element={
            <AdminProtectedRoute>
              <RetrieveUpdate />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/management/categories"
          element={
            <AdminProtectedRoute>
              <Categories />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/management/retailers"
          element={
            <AdminProtectedRoute>
              <Retailers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/management/retailers/new"
          element={
            <AdminProtectedRoute>
              <CreateRetailers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/management/retailers/:id"
          element={
            <AdminProtectedRoute>
              <RetrieveUpdateRetailers />
            </AdminProtectedRoute>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}
