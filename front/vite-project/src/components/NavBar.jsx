import React from "react";
import styles from "../styles/NavBar.module.css"; 

const NavBar = () => {
    return ( 
        <nav className={styles.navbar}>
            <div className={styles.navbarBrand}>
                <a href="#" className={styles.logo}>DogSpa</a>
            </div>
            <ul className={styles.navbarMenu}>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Mis Turnos</a></li>
                <li><a href="#">Acerca</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
            <div className={styles.navbarActions}>
                <a href="#" className={styles.btnLogin}>Log in</a>
                <a href="#" className={styles.btnSignup}>Sign up</a>
            </div>
        </nav>
    );
}

export default NavBar;


