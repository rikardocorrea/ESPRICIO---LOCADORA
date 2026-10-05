import type { Request, Response } from "express";
import fs from "fs";
import { z } from "zod";

import Carro from "../models/Carro.js";

const ANO_MAXIMO_PERMITIDO: number = new Date().getFullYear()+1;
const PATH_FILE: string = "./dados/carros.json";

const createCarroSchema = z.object({
    //converte para string e exige 2 caracteres sem ser vazio.
    modelo: z.coerce.string().trim().min(2, "O modelo deve ter no mínimo 2 caracteres!"),
    marca: z.coerce.string().trim().min(3, "A marca precisar ter no mínimo 3 caracteres!"),
    ano: z.coerce.number().min(1950, "O ao não pode ser menor que 1950!")
    .max(ANO_MAXIMO_PERMITIDO,`O ano não pode ser maior que ${ANO_MAXIMO_PERMITIDO}`)

})

class CarroController{
    cadastrar(req: Request, res: Response): void{
        try {
            const { modelo, marca, ano} = createCarroSchema.parse(req.body);

            const carro = new Carro(modelo, marca, ano);

            if(!fs.existsSync(PATH_FILE))
            {
                fs.writeFileSync(PATH_FILE, "[]", "utf-8");
            }

            const conteudoArquivo: string = fs.readFileSync(PATH_FILE, "utf-8");

            let carros: Carro[] = JSON.parse(conteudoArquivo);
            
            carros.push(carro);

            fs.writeFileSync(PATH_FILE, JSON.stringify(carros, null, 4),"utf-8");

            res.status(201).json({
                message: "Carro Cadastrado com sucesso !", carro
            });

        } catch (error) {
            if(error instanceof z.ZodError)
            {
                res.status(400).json({
                    erro: error.issues.map(issue => issue.message)
                });

                return;
            }

            console.error("Erro capturado: ", error);
            res.status(500).json({ erro: "Erro interno ao cadastrar carro !"});
        }
    }
}

export default new CarroController();