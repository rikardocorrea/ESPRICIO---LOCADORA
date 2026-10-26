import express from "express";
import CarroController from "../controllers/CarroController.js";

const carroRoutes = express.Router();

carroRoutes.post("/carros", CarroController.cadastrar);
carroRoutes.get("/carros", CarroController.listar);

export default carroRoutes;