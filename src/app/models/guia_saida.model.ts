export class Guia_Saida {
    id?: number;
    data: Date = new Date();
    valor: number = 0;
    quantidade: number = 0;
    produto: any = null;
    cliente: any = null;
    funcionario: any = null;

    constructor(
        data: Date = new Date(),
        valor: number = 0,
        quantidade: number = 0,
        produto: any = null,
        cliente: any = null,
        funcionario: any = null
    ) {
        this.data = data;
        this.valor = valor;
        this.quantidade = quantidade;
        this.produto = produto;
        this.cliente = cliente;
        this.funcionario = funcionario;
    }
}
