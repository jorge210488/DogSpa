import styles from "../styles/HomeCards.module.css";

const HomeCards = () => {
    return (
        <>
            <div className={styles.info}>
                <div className={styles.shapeContainer}>
                    <div className={styles.shape}></div>
                </div>
                <span className={styles.content}>
                    <h3>Bienvenido a DogSpa</h3>
                    <p>El oasis perfecto para el bienestar de tu mejor amigo. En nuestro spa, cada perro es tratado con el amor y el cuidado que se merece, en un ambiente inclusivo y acogedor donde la felicidad y la salud de tu mascota son nuestra prioridad. Ya sea que necesiten un relajante baño, un corte elegante o un mimo especial, nuestro equipo de expertos está aquí para ofrecerle una experiencia rejuvenecedora. Deja que DogSpa sea el lugar donde la belleza, la relajación y el cariño se encuentran para consentir a tu perrito como nunca antes. ¡Porque ellos también merecen un día de spa!</p>
                </span>
            </div>
        </>
    );
}

export default HomeCards;


