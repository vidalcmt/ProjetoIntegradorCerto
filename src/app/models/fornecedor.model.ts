export class Fornecedor {
    id?: number;
    nome_social: string = '';
    cnpj: string = '';
    email: string = '';
    telefone: string = '';
    endereco: any[] = [];
    produtos: any[] = [];

    constructor(
        nome_social: string = '',
        cnpj: string = '',
        email: string = '',
        telefone: string = '',
        endereco: any[] = [],
        produtos: any[] = [],
    ) {
        this.nome_social = nome_social;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.produtos = produtos;
    }
}
