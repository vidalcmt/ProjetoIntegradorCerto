export class Admin {
    id?: number;
    nome: string = '';
    senha: string = '';
    acesso!: number;
}

export class Funcionario {
    nome: string = '';
    cpf: string = '';
    email: string = '';
    telefone: string = '';
    ativo: boolean = true;
}