'use client'
import LoginForm from "@/components/Login/LoginForm";
import { DashBoard } from "../components/Dashboard";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    setLoggedIn(loginStatus === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('login', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem('login', 'false');
    setLoggedIn(false);
  };

  return (
    <div className="p-4">
      {!loggedIn && <h1 className="text-2xl font-bold">User Metrics Dashboard</h1>}
      {loggedIn ? (
        <>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
          <DashBoard />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
