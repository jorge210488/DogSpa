import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadAppointmentsData, preloadUserData } from "./helpers/preloadData";



// AppDataSource.initialize()
//   .then(res => {
    
//     server.listen(PORT, () => {
      
//     });
//   })


  const initializeApp = async () => {
    await AppDataSource.initialize();
        console.log("Conexión a la base de datos realizada con éxito");
    await preloadUserData();
    await preloadAppointmentsData();
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

initializeApp();