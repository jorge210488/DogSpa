import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faUserGear,
  faCakeCandles,
  faAddressCard,
  faEnvelopeCircleCheck,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/NavBar.module.css";
import axios from "axios";
import Login from "./Login"; // Importamos el componente Login
import Swal from "sweetalert2";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Estado para controlar el modal de login
  const dropdownRef = useRef(null); // Ref para el menú desplegable

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro de que deseas cerrar sesión?",
      text: "Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearUser());
        navigate("/home");
        Swal.fire({
          icon: "success",
          title: "Sesión cerrada",
          text: "Has cerrado sesión exitosamente.",
        });
      }
    });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal); // Alterna el estado del modal
  };

  const closeLoginModal = () => {
    setShowLoginModal(false); // Cierra el modal
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const confirmed = window.confirm(
        "¿Estás seguro? Al subir esta foto, das permiso para que sea utilizada en la página y estará disponible para la vista de todos."
      );

      if (!confirmed) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.put(
          `http://localhost:3000/users/${user.id}/profile-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Imagen cargada exitosamente");

        if (response.data && response.data.user) {
          const updatedUser = response.data.user;
          dispatch(setUser(updatedUser)); // Actualiza el estado global del usuario con la nueva imagen de perfil
        } else {
          alert(
            "La respuesta del servidor no contiene la imagen de perfil actualizada."
          );
        }
      } catch (error) {
        alert(
          "Error al subir la imagen: " +
            (error.response ? error.response.data : error.message)
        );
      }
    } else {
      alert("No se seleccionó ningún archivo.");
    }
  };

  // Cierra el dropdown al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <Link to="/" className={styles.logo}>
          {" "}
          DogSpa <FontAwesomeIcon icon={faPaw} />
        </Link>
      </div>
      <ul className={styles.navbarMenu}>
        <li>
          <Link to="/home">Inicio</Link>
        </li>
        {user && (
          <li>
            <Link to="/appointments">Mis Turnos</Link>
          </li>
        )}
        <li>
          <Link to="/gallery">Galería</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
      </ul>
      <div className={styles.navbarActions}>
        {user ? (
          <>
            <span className={styles.userName}>{user.name}</span>
            <div className={styles.userDropdown} ref={dropdownRef}>
              <FontAwesomeIcon
                icon={faUserGear}
                className={styles.userGearIcon}
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <label
                    htmlFor="profileImageInput"
                    className={styles.dropdownItemClickable}
                  >
                    <FontAwesomeIcon icon={faImage} /> Agregar la foto del
                    perrito
                  </label>
                  <input
                    type="file"
                    id="profileImageInput"
                    style={{ display: "none" }}
                    onChange={handleProfileImageChange}
                  />
                  <div className={styles.dropdownItem}>
                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} />{" "}
                    {user.email}
                  </div>
                  <div className={styles.dropdownItem}>
                    <FontAwesomeIcon icon={faCakeCandles} /> {user.birthdate}
                  </div>
                  <div className={styles.dropdownItem}>
                    <FontAwesomeIcon icon={faAddressCard} /> {user.nDni}
                  </div>
                </div>
              )}
            </div>
            <img
              src={
                user.profileImage ||
                "https://images.freeimages.com/vme/images/2/5/255724/dog_head_profile_preview"
              }
              alt="Profile"
              className={styles.profileImage}
            />
            <button onClick={handleLogout} className={styles.btnLogin}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={toggleLoginModal} className={styles.btnLogin}>
              Log in
            </button>
            <Link to="/register" className={styles.btnSignup}>
              Sign up
            </Link>
          </>
        )}
      </div>

      {/* Modal de Login */}
      {showLoginModal && (
        <div
          className={styles.modal}
          onClick={(e) =>
            e.target.className === styles.modal && closeLoginModal()
          } // Detecta clic fuera del modal
        >
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeLoginModal}>
              ×
            </button>
            <Login onLoginSuccess={closeLoginModal} />{" "}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
