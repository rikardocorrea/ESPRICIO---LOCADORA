//export para exportar a classe para outros arquivos
//default pois ela é a classe padrao deste arquivo.
export default class Carro {
    private _modelo!: string;
    private _marca!: string;
    private _ano!: number;

    constructor(pModelo: string, pMarca: string, pAno: number) {
        this.modelo = pModelo;
        this.marca = pMarca;
        this.ano = pAno;
    }

    public get modelo(): string {
        return this._modelo;
    }

    public set modelo(novoModelo: string) {
        if (novoModelo.length < 2) {
            throw new Error(`O modelo deve possuir pelo menos 2 caracteres.`);
        }
        this._modelo = novoModelo;
    }

    public get marca(): string {
        return this._marca;
    }

    public set marca(novaMarca: string) {
        if (novaMarca.length < 2) {
            throw new Error(`A marca deve possuir pelo menos 2 letras.`);
        }
        this._marca = novaMarca;
    }


    public get ano(): number {
        return this._ano;
    }

    public set ano(novoAno: number) {
        const ANO_MAXIMO = new Date().getFullYear() + 1;

        if (novoAno > ANO_MAXIMO) {
            throw new Error(`Oano do carro não pode ser maior que ${ANO_MAXIMO}.`)
        }


        if (novoAno < 1950) {
            throw new Error(`O ano do carro não pode ser menor que 1950`);
        }
        this._ano = novoAno;
    }

    toJSON() {
        return {
            modelo: this._modelo,
            marca: this._marca,
            ano: this._ano
        }
    }

}