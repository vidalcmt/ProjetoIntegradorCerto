export class Cliente {
    id?: number;
    nome: string = '';
    cpf: string = '';
    email: string = '';
    telefone: string = '';
    guias_saidas: any[] = []; 

    constructor(
        nome: string = '',
        cpf: string = '',
        email: string = '',
        telefone: string = '',
        guias_saidas: any[] = []
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.guias_saidas = guias_saidas;
    }

    getClienteInfo(): string {
        return `${this.nome} - ${this.email}`;
    }
}
