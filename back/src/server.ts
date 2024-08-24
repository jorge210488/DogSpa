import cors from "cors";
import express from "express";
import router from "./routes";
import morgan from "morgan";


const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(router);

export default server;