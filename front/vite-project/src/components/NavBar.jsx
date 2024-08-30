import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css"; 

const NavBar = () => {
    return ( 
        <nav className={styles.navbar}>
            <div className={styles.navbarBrand}>
                <Link to="/" className={styles.logo}>DogSpa</Link>
            </div>
            <ul className={styles.navbarMenu}>
                <li><Link to="/home">Inicio</Link></li>
                <li><Link to="/appointments">Mis Turnos</Link></li>
                <li><Link to="/about">Acerca</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
            </ul>
            <div className={styles.navbarActions}>
                <Link to="/login" className={styles.btnLogin}>Log in</Link>
                <Link to="/register" className={styles.btnSignup}>Sign up</Link>
            </div>
        </nav>
    );
}

export default NavBar;
