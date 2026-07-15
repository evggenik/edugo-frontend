import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
    </Routes>
  )
}

export default App