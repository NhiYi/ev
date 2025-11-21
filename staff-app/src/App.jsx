import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layouts/MainLayout";

// pages (lazy import allowed later)
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import StationPage from "./features/stations/pages/StationDetailPage";
import VehicleDetailPage from "./features/vehicles/pages/VehicleDetailPage";
import CheckFormPage from "./features/stations/pages/StationListPage";


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/stations"
          element={
            <PrivateRoute>
              <Layout>
                <StationPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/stations/:stationId/vehicles/:vehicleId"
          element={
            <PrivateRoute>
              <Layout>
                <VehicleDetailPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/check/:vehicleId"
          element={
            <PrivateRoute>
              <Layout>
                <CheckFormPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
