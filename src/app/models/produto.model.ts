export class Produto {
    id?: number;
    nome: string = '';
    marca: string = '';
    modelo: string = '';
    quantidade_atual!: number;
    cod_barras!: number;
    fornecedores: any[] = [];
    guias_entradas: any[] = [];
    guias_saidas: any[] = [];

    constructor(
        nome: string = '',
        marca: string = '',
        modelo: string = '',
        quantidade_atual: number = 0,
        cod_barras: number = 0,
        fornecedores: any[] = [],
        guias_entradas: any[] = [],
        guias_saidas: any[] = []
    ) {
        this.nome = nome;
        this.marca = marca;
        this.modelo = modelo;
        this.quantidade_atual = quantidade_atual;
        this.cod_barras = cod_barras;
        this.fornecedores = fornecedores;
        this.guias_entradas = guias_entradas;
        this.guias_saidas = guias_saidas;
    }

}
