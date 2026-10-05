//export para exportar a classe para outros arquivos
//default pois ela é a classe padrao deste arquivo.
export default class Carro {
    modelo: string;
    marca: string;
    ano: number;

    constructor(pModelo: string, pMarca: string, pAno: number)
    {
        this.modelo = pModelo;
        this.marca = pMarca;
        this.ano = pAno;
    }
}