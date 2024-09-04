import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css"; 

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <Link to="/home">
                <img 
                src="https://res.cloudinary.com/deflfnoba/image/upload/v1725246181/fotosm3/acewvbwzg9bvmar8wz9g.png" 
                alt="Your Logo" 
                className={styles.footerLogo} 
            />
                </Link>
                <p className={styles.footerText}>2024 DogSpa. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
