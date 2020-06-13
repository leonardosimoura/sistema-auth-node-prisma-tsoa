export interface UserViewModel {
    id: string;
    email: string;
    senha: string;
    nome: string;
    apelido: string;
}


export interface LoginViewModel {
    email: string;
    senha: string;
}


export interface CreateUserViewModel {
    email: string;
    senha: string;
    nome: string;
    apelido: string;
}
export interface UserAuthenticated {
    id: string;
    email: string;
    nome: string;
    apelido: string;
    scopes: string[]
}