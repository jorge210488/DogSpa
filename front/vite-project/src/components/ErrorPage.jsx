import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ErrorPage.module.css"; // Importa el archivo CSS Module

function ErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      navigate("/home");
    }, 10000);

    return () => clearInterval(countdownInterval);
  }, [navigate]);

  return (
    <div className={styles.errorPageContainer}> 
      <div className={styles.errorPageContent}> 
        <h1>Página no encontrada</h1>
        <p>Redireccionando a Inicio en {countdown} segundos...</p>
      </div>
    </div>
  );
}

export default ErrorPage;
