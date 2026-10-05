class Animal{
    categoria: string;
    nome: string;
    sexo: string;

    constructor(pCategoria: string, pNome: string, pSexo: string)
    {
        this.categoria = pCategoria;
        this.nome = pNome;
        this.sexo = pSexo;
    }

    static exibirAnoNascimento(): number
    {
        let anoNascimento = new Date().getFullYear();
        return anoNascimento;
    }

    andar():void{
        console.log(this.nome + " está andando ....");
    }    

}


//classes sempre no singular e começam com letra maiúscula (PascalCase)
class Carro{
    modelo: string;
    ano: number;
    velocidade: number;

    constructor(pModelo: string, pAno: number)
    {
        this.modelo = pModelo;
        this.ano = pAno;
        this.velocidade = 0;
    }

    acelerar(): void{
        this.velocidade += 10;
    }

    //void é o tipo do método que não retorna nenhum valor
    frear(): void{
        if(this.velocidade > 0)
        {
            this.velocidade -= 10;       
        }        
    }

    //Método estáticos (static) - não precisam ser instanciados para ser utilizados
    static calcularIdadeCarro(pAno: number): number
    {
        return new Date().getFullYear() - pAno;
    }

}

console.log("Idade do carro = " + Carro.calcularIdadeCarro(2008));
//Reparem que usamos a classe diretamente


//Uma instancia de objeto sempre tem new antes da classe.
const renegade = new Carro("Renegade", 2024);
console.log(renegade);
console.log("Velocidade = " + renegade.velocidade);
renegade.acelerar();
renegade.acelerar();
console.log("Velocidade = " + renegade.velocidade);
renegade.frear();
console.log("Velocidade = " + renegade.velocidade);

console.log("Ano nascimento do animal =  " + Animal.exibirAnoNascimento());

const bixano = new Animal("Felino", "Max", "Macho");
bixano.andar();
