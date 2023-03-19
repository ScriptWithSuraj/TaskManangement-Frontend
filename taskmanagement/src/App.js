import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { useState } from "react";
function App() {
  const info = localStorage.getItem("user");
  // const [user, setUser] = useState(JSON.parse(info));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
