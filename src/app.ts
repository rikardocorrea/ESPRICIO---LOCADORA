//A pasta Models contem o modelo de dados;
//A controllers contem o controle de informações que chegam na API e também responde a requisição
//Routers organiza as rotas
//database vai armazenar os dados, configuração com BD
import express from "express";
import type { Express } from "express";
import carroRoutes from "./routes/carroRoutes.js";

const app: Express = express();
const PORT: number = 8081;

app.use(express.json());
app.use(carroRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})

