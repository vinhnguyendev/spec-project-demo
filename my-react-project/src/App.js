import "./App.css";
// import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login,Register,Dashboard,FoodTracker} from './components/'



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="tracker" element={<FoodTracker />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
