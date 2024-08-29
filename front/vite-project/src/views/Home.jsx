import React from 'react';
import HomeCards from '../components/HomeCards';
import styles from "../styles/Home.module.css"

const Home = () => {
    return (
        <>
        <div className={styles.shapeContainerHome}>
            <div className={styles.fondo}></div>
        </div>
        <HomeCards />
        </>
    );
}

export default Home;
