import "./styles/reset.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Appointments from "./views/MisTurnos";
import Register from "./views/Register";
import Login from "./views/Login";
import Contact from "./views/Contact";
import Galeria from "./views/Galeria";
import ErrorPage from "./components/ErrorPage";
import "./App.css"; 

function App() {
  return (
    <div className="appContainer">
      <NavBar />
      <div className="contentWrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Galeria />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
