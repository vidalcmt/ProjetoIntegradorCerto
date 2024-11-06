export class Guia_Entrada {
    id?: number;
    data: Date = new Date();
    valor: number = 0;
    quantidade: number = 0;
    produto: any = null;
    fornecedor: any = null;
    funcionarioId!: number;

    constructor(
        data: Date = new Date(),
        valor: number = 0,
        quantidade: number = 0,
        produto: any = null,
        fornecedor: any = null,
        funcionarioId: number = 0
    ) {
        this.data = data;
        this.valor = valor;
        this.quantidade = quantidade;
        this.produto = produto;
        this.fornecedor = fornecedor;
        this.funcionarioId = funcionarioId;
    }
}
