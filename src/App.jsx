import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import NotSupportedPage from "./pages/NotSupportedPage/NotSupportedPage";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/teachers" element={
        <ProtectedRoute allowedRole="TEACHER">
            <SchedulePage />
        </ProtectedRoute>
      } />
      <Route path="/not-supported" element={<NotSupportedPage />} />

    </Routes>
  )
}

export default App