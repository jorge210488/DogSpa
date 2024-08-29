import styles from "../styles/HomeCards.module.css";

const HomeCards = () => {
    return (
        <>
            <div className={styles.info}>
                <div className={styles.shapeContainer}>
                    <div className={styles.shape}></div>
                </div>
                <span className={styles.content}>
                    <h3>Cerdi</h3>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                </span>
            </div>
        </>
    );
}

export default HomeCards;


