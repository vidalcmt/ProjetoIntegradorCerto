export class Guia_Entrada {
    id?: number;
    data: Date = new Date();
    valor: number = 0;
    quantidade: number = 0;
    produto: any = null;
    fornecedor: any = null;
    funcionario: any = null;

    constructor(
        data: Date = new Date(),
        valor: number = 0,
        quantidade: number = 0,
        produto: any = null,
        fornecedor: any = null,
        funcionario: any = null
    ) {
        this.data = data;
        this.valor = valor;
        this.quantidade = quantidade;
        this.produto = produto;
        this.fornecedor = fornecedor;
        this.funcionario = funcionario;
    }
}
