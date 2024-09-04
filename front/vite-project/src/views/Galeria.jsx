import React, { useState, useEffect } from "react";
import axios from "axios";
import GaleriaCard from "../components/GaleriaCard";
import styles from "../styles/Galeria.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldDog, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const Galeria = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className={styles.galeriaContainer}>
            <div className={styles.presentationContainer}>
                <img 
                    src="https://res.cloudinary.com/deflfnoba/image/upload/v1725466685/fotosm3/uwl0hijab7rgaqhrl8oe.jpg" 
                    alt="Clientes felices" 
                    className={styles.presentationImage}
                />
                <div className={styles.presentationText}>
                    <h4>¡Bienvenidos a nuestra galería de estrellas peludas!</h4>
                    <p>
                        Nos enorgullece presentar a algunos de nuestros maravillosos clientes y sus adorables compañeros de cuatro patas. Cada uno de ellos ha recibido el amor, el cuidado y la atención que merecen, y estamos encantados de compartir con ustedes las sonrisas y momentos felices que hemos creado juntos.
                        <br/><br/>
                        Estos peluditos no solo son nuestros clientes, son parte de nuestra familia, y verlos felices es nuestra mayor recompensa. En DogSpa, nos aseguramos de que cada experiencia sea única y especial, brindando un ambiente seguro, cómodo y lleno de cariño para que tus mejores amigos puedan relajarse y disfrutar.
                        <br/><br/>
                        Si estás buscando un lugar donde tu mascota sea tratada con el mismo amor que en casa, ¡has llegado al lugar indicado! Nos encantaría que tú y tu peludito se unieran a nuestra comunidad de clientes satisfechos.
                    </p>
                </div>
            </div>
            <h1 className={styles.galeriaTitle}>
                ¡Nuestros Clientes! <FontAwesomeIcon icon={faShieldDog} /> <FontAwesomeIcon icon={faFaceSmile} />
            </h1>
            <div id="cards-container" className={styles.cardsContainer}>
                {users
                    .filter(user => user.profileImage)  
                    .map((user) => (
                        <GaleriaCard
                            key={user.id}
                            id={user.id}
                            profileImage={user.profileImage}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Galeria;
