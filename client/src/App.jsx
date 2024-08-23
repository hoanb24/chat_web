import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";

const isAuthenticated = () => {
  const userData = Cookies.get("token");
  return userData !== undefined;
};

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setAuth(result);
      console.log("data of token", result);
    };

    checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/chat"
          element={auth ? <Chat /> : <Navigate to="/signin" replace />}
        />
        <Route
          index
          element={
            auth === false ? (
              <Navigate to="/signin" replace />
            ) : (
              <Navigate to="/chat" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
