import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import OwnerDashboardPage from './pages/OwnerDashboardPage.jsx'
import OwnerPropertiesPage from './pages/OwnerPropertiesPage.jsx'
import PropertyFormPage from './pages/PropertyFormPage.jsx'
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx'
import TenantPropertiesPage from './pages/TenantPropertiesPage.jsx'
import TenantPropertyDetailsPage from './pages/TenantPropertyDetailsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Owner routes */}
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <OwnerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/properties"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <OwnerPropertiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/properties/new"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <PropertyFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/properties/:propertyId"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <PropertyDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/properties/:propertyId/edit"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <PropertyFormPage />
              </ProtectedRoute>
            }
          />

          {/* Tenant routes */}
          <Route
            path="/tenant/properties"
            element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantPropertiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant/properties/:propertyId"
            element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <TenantPropertyDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
