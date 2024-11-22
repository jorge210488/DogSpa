import "./styles/reset.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Appointments from "./views/MisTurnos";
import Register from "./views/Register";
// import Login from "./views/Login";
import Contact from "./views/Contact";
import Galeria from "./views/Galeria";
import ErrorPage from "./components/ErrorPage";
import "./App.css";

function App() {
  const user = useSelector((state) => state.user.user); // Accede al usuario desde Redux

  return (
    <div className="appContainer">
      <NavBar />
      <div className="contentWrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Galeria />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
          <Route
            path="/appointments"
            element={user ? <Appointments /> : <Navigate to="/register" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
