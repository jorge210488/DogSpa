import React from "react";
import styles from "../styles/GaleriaCard.module.css"

const GaleriaCard = ({ id, profileImage, onImageClick }) => {
    return (
        <figure className={styles.card} onClick={() => onImageClick(id)}>
            <img
                src={profileImage}
                alt={`Imagen ${id}`}
                data-image={id}
            />
        </figure>
    );
};

export default GaleriaCard;
