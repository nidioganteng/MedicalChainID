import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { initAuthClient, logout } from "./utils/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principalId, setPrincipalId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const client = await initAuthClient();

      const isAuth = await client.isAuthenticated();

      if (isAuth) {
        const identity = client.getIdentity();
        setPrincipalId(identity.getPrincipal().toString());
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    init();
  }, []);

  const handleLoginSuccess = (principal) => {
    setPrincipalId(principal);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await logout(); // Pastikan logout menghapus session
    setIsAuthenticated(false);
    setPrincipalId("");
  };

  if (loading) return <div>Loading authentication...</div>;

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Dashboard principalId={principalId} onLogout={handleLogout} /> : <Login onLogin={handleLoginSuccess} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
