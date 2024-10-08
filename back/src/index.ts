import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadAppointmentsData, preloadUsersAndCredentials} from "./helpers/preloadData";

  const initializeApp = async () => {
    await AppDataSource.initialize();
        console.log("Conexión a la base de datos realizada con éxito");
    await preloadUsersAndCredentials();
    await preloadAppointmentsData();
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};

initializeApp();