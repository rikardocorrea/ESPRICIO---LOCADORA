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

const selectCarroSchema = z.object({
    modelo: z.string().optional(),
    marca: z.string().optional(),
    minAno: z.coerce.number().optional(),
    maxAno: z.coerce.number().optional(),
    orderBy: z.enum(["modelo", "marca", "ano"]).default("modelo"),
    sortBy: z.enum(["asc", "desc"]).default("asc"),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
})

class CarroController{
    cadastrar(req: Request, res: Response): void{
        try {
            const { modelo, marca, ano} = createCarroSchema.parse(req.body);

            const carro = new Carro(modelo, marca, ano);

            if(!fs.existsSync(PATH_FILE))
            {
                fs.mkdirSync("./dados", { recursive: true });
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

            if(error instanceof Error)
            {
                res.status(400).json({
                    erro: error.message
                });
            }


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

    listar(req: Request, res: Response): void{
        try {

            const { modelo, marca, minAno, maxAno, orderBy, sortBy, page, limit} = selectCarroSchema.parse(req.query);


            if(!fs.existsSync(PATH_FILE))
            {
                fs.mkdirSync("./dados", { recursive: true});
                fs.writeFileSync(PATH_FILE, "[]", "utf-8");
            }

            const conteudoArquivo: string = fs.readFileSync(PATH_FILE, "utf-8");
            let carros: Carro[] = JSON.parse(conteudoArquivo);

            if(orderBy == "modelo")
            {
                if(sortBy == "asc")
                {
                    carros.sort((a,b) => a.modelo.localeCompare(b.modelo, "pt-BR"));

                }else if (sortBy == "desc")
                {
                    carros.sort((a,b) => b.modelo.localeCompare(a.modelo, "pt-BR"));
                }
            } else if(orderBy == "marca")
            {
                if(sortBy == "asc")
                {
                    carros.sort((a,b) => a.marca.localeCompare(b.marca, "pt-BR"));

                }else if (sortBy == "desc")
                {
                    carros.sort((a,b) => b.marca.localeCompare(a.marca, "pt-BR"));
                }
            }
            else if (orderBy == "ano")
            {
                if(sortBy == "asc")
                {
                    carros.sort((a,b) => a.ano - b.ano);
                } else if(sortBy == "desc")
                {
                    carros.sort((a,b) => b.ano - a.ano);
                }
            }

            if(modelo)
            {
                carros = carros.filter( carro => carro.modelo.toLowerCase().includes(modelo.toLowerCase())
                )
            }

            if(marca)
            {
                carros = carros.filter( carro => carro.modelo.toLowerCase().includes(marca.toLowerCase())
                )
            }

            if(minAno)
            {
                carros = carros.filter( carro => carro.ano >= minAno
                )
            }

            if(maxAno)
            {
                carros = carros.filter( carro => carro.ano <= maxAno
                )
            }

            //vamos consultar quantos carros tem...
            //Math.ceil vai arredondar para baixo
            const qtdCarros: number = carros.length;
            const qtPaginas: number = Math.ceil(qtdCarros / limit) || 1;

            if(page <= 0 || page > qtPaginas)
            {
                res.status(404).json({erro: "Esta página não existe!"});
            }

            const inicio: number = (page - 1) * limit;
            const fim: number = page * limit;
            carros = carros.slice(inicio, fim);


            res.status(200).json({
                qtdPaginas: qtPaginas,
                paginaAtual: page,
                qtdCarros: qtdCarros,
                carros
            });
            
        } catch (error) {
            console.error("Erro capturado: ", error);
            res.status(500).json({erro: "Erro interno no servidor ao listar carros"});

        }
    }

}

export default new CarroController();