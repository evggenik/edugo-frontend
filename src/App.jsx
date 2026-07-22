import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import NotSupportedPage from "./pages/NotSupportedPage/NotSupportedPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Layout from "./components/Layout/Layout";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/teachers" element={
        <ProtectedRoute allowedRole="TEACHER">
            <Layout>
              <SchedulePage />
            </Layout>
        </ProtectedRoute>
      } />
      <Route path="/not-supported" element={<NotSupportedPage />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <ProfilePage />
          </Layout>
        </ProtectedRoute>
      } />

    </Routes>
  )
}

export default App