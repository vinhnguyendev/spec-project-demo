import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FoodTracker from "./pages/FoodTracker";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="tracker" element={<FoodTracker />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
