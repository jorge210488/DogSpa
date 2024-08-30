import "./styles/reset.css"
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css"
import NavBar from "./components/NavBar";
import Footer from "./components/footer";
import Home from "./views/Home";
import Appointments from "./views/MisTurnos";
import Register from "./views/Register";
import Login from "./views/Login"
import ErrorPage from "./components/ErrorPage";


function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/appointments" element={<Appointments />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App;
