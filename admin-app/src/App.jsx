import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import AdminLayout from './layouts/AdminLayout'

import LoginPage from './features/auth/LoginPage'
import DashboardPage from './features/dashboard/DashboardPage'
import StationsManage from './features/stations/StationsManage'
import VehiclesManage from './features/vehicles/VehiclesManage'
import StaffManage from './features/staff/StaffManage'
import CustomersManage from './features/customers/CustomersManage'
import ReportsPage from './features/reports/ReportsPage'

export default function App(){
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />

        <Route path="/" element={<PrivateRoute><AdminLayout><DashboardPage/></AdminLayout></PrivateRoute>} />
        <Route path="/stations" element={<PrivateRoute><AdminLayout><StationsManage/></AdminLayout></PrivateRoute>} />
        <Route path="/vehicles" element={<PrivateRoute><AdminLayout><VehiclesManage/></AdminLayout></PrivateRoute>} />
        <Route path="/staff" element={<PrivateRoute><AdminLayout><StaffManage/></AdminLayout></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><AdminLayout><CustomersManage/></AdminLayout></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><AdminLayout><ReportsPage/></AdminLayout></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
