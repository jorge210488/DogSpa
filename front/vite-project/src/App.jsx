import "./styles/reset.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Appointments from "./views/MisTurnos";
import Register from "./views/Register";
import Login from "./views/Login";
import ErrorPage from "./components/ErrorPage";
import "./App.css"; // Importa el archivo App.css

function App() {
  return (
    <div className="appContainer">
      <NavBar />
      <div className="contentWrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
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
