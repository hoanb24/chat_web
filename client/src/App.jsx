import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";

const isAuthenticated = async () => {
  const userData = await Cookies.get("userData");
  return userData !== undefined;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/chat"
          element={
            isAuthenticated() ? <Chat /> : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
