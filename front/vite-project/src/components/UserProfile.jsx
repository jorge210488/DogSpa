import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/UserProfile.module.css";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={styles.userProfile}>
      {user ? (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p>Email: {user.email}</p>
          {/* Aquí podrías añadir más detalles del perfil */}
        </div>
      ) : (
        <p>Por favor inicia sesión para ver los detalles del perfil.</p>
      )}
    </div>
  );
};

export default UserProfile;
