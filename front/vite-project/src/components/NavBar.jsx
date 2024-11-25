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

  const [editingField, setEditingField] = useState(null); // Campo en edición
  const [editValues, setEditValues] = useState({
    email: user?.email || "",
    birthdate: user?.birthdate || "",
    nDni: user?.nDni || "",
  });

  // Actualiza los datos del usuario
  const handleUpdateUser = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.user) {
        dispatch(setUser(response.data.user)); // Actualiza el estado global
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Confirma la edición de un campo
  const handleConfirmEdit = async (field) => {
    setEditingField(null);
    if (editValues[field] === user[field]) return;

    const confirmed = await Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: `¿Deseas actualizar el campo ${field}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed.isConfirmed) {
      try {
        await handleUpdateUser(user.id, { [field]: editValues[field] });
        Swal.fire(
          "Actualizado",
          `El campo ${field} se actualizó correctamente.`,
          "success"
        );
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al actualizar el campo.", "error");
      }
    } else {
      setEditValues({ ...editValues, [field]: user[field] });
    }
  };

  // Maneja la tecla "Enter"
  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      handleConfirmEdit(field);
    }
  };

  // Detecta clic fuera del campo en edición
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editingField &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        handleConfirmEdit(editingField);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingField]);

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
                  <div
                    className={styles.dropdownItem}
                    onDoubleClick={() => setEditingField("email")}
                  >
                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                    {editingField === "email" ? (
                      <input
                        type="text"
                        value={editValues.email}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            email: e.target.value,
                          })
                        }
                        onBlur={() => handleConfirmEdit("email")}
                        onKeyDown={(e) => handleKeyDown(e, "email")}
                        className={styles.editInput}
                        autoFocus
                      />
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </div>

                  <div
                    className={styles.dropdownItem}
                    onDoubleClick={() => setEditingField("birthdate")}
                  >
                    <FontAwesomeIcon icon={faCakeCandles} />
                    {editingField === "birthdate" ? (
                      <input
                        type="date"
                        value={editValues.birthdate}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            birthdate: e.target.value,
                          })
                        }
                        onBlur={() => handleConfirmEdit("birthdate")}
                        onKeyDown={(e) => handleKeyDown(e, "birthdate")}
                        className={styles.editInput}
                        autoFocus
                      />
                    ) : (
                      <span>{user.birthdate}</span>
                    )}
                  </div>

                  <div
                    className={styles.dropdownItem}
                    onDoubleClick={() => setEditingField("nDni")}
                  >
                    <FontAwesomeIcon icon={faAddressCard} />
                    {editingField === "nDni" ? (
                      <input
                        type="number"
                        value={editValues.nDni}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            nDni: e.target.value,
                          })
                        }
                        onBlur={() => handleConfirmEdit("nDni")}
                        onKeyDown={(e) => handleKeyDown(e, "nDni")}
                        className={styles.editInput}
                        autoFocus
                      />
                    ) : (
                      <span>{user.nDni}</span>
                    )}
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
