import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from '../redux/reducer'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faUserGear, faCakeCandles, faAddressCard, faEnvelopeCircleCheck, faImage } from '@fortawesome/free-solid-svg-icons'; 
import styles from "../styles/NavBar.module.css";
import axios from 'axios';

const NavBar = () => {
    const user = useSelector((state) => state.user.user); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        dispatch(clearUser()); 
        navigate("/home");
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleProfileImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.put(`http://localhost:3000/users/${user.id}/profile-image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    
                });
                
                alert('Imagen cargada exitosamente');

                if (response.data && response.data.user) {
                    const updatedUser = response.data.user;
                    dispatch(setUser(updatedUser)); // Actualiza el estado global del usuario con la nueva imagen de perfil
                } else {
                    alert("La respuesta del servidor no contiene la imagen de perfil actualizada.");
                }

            } catch (error) {
                alert('Error al subir la imagen: ' + (error.response ? error.response.data : error.message));
            }
        } else {
            alert("No se seleccionó ningún archivo.");
        }
    };

    return ( 
        <nav className={styles.navbar}>
            <div className={styles.navbarBrand}>
                <Link to="/" className={styles.logo}> DogSpa <FontAwesomeIcon icon={faPaw} /></Link>
            </div>
            <ul className={styles.navbarMenu}>
                <li><Link to="/home">Inicio</Link></li>
                {user && (<li><Link to="/appointments">Mis Turnos</Link></li>)}
                <li><Link to="/about">Acerca</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
            <div className={styles.navbarActions}>
                {user ? (
                    <>
                        <span className={styles.userName}>{user.name}</span>
                        <div className={styles.userDropdown}>
                            <FontAwesomeIcon icon={faUserGear} className={styles.userGearIcon} onClick={toggleDropdown}/>
                            {showDropdown && (
                                <div className={styles.dropdownMenu}>
                                    <label htmlFor="profileImageInput" className={styles.dropdownItem}>
                                        <FontAwesomeIcon icon={faImage} /> Agregar foto perfil
                                    </label>
                                    <input 
                                        type="file" 
                                        id="profileImageInput" 
                                        style={{ display: 'none' }} 
                                        onChange={handleProfileImageChange} 
                                    />
                                    <div className={styles.dropdownItem}>
                                        <FontAwesomeIcon icon={faEnvelopeCircleCheck} /> {user.email}
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
                        <img src={user.profileImage || "https://images.freeimages.com/vme/images/2/5/255724/dog_head_profile_preview"} alt="Profile" className={styles.profileImage} />
                        <button onClick={handleLogout} className={styles.btnLogin}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles.btnLogin}>Log in</Link>
                        <Link to="/register" className={styles.btnSignup}>Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
