import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/pages/Login';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLogged(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:9999/auth/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsLogged(true);
        } else {

          throw new Error("Token non valido o scaduto");
        }
      } catch (error) {
        console.warn("Autenticazione fallita:", error.message);
        localStorage.removeItem("token");
        setIsLogged(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>Caricamento in corso...</div>;
  }

  return (
    <Router>
      <NavBar isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />

        <Route path="/new" element={isLogged ? <NewBlogPost /> : <Navigate to="/login" replace />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
