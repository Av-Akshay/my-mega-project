import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./services/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <Router>
    <div className="min-h-screen flex flex-wrap justify-between bg-gray-400 ">
      <div className="w-full block">
        <Header />
        <main>Todo {/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>

    </Router>
  ) : null;
}

export default App;
