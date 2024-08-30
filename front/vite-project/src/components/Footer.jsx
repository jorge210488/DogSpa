import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css"; // Importa el archivo CSS Module

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <Link to="/home">
                    <img src="/path-to-your-logo.png" alt="DogSpa Logo" className={styles.footerLogo} />
                </Link>
                <p className={styles.footerText}>2024 DogSpa. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
