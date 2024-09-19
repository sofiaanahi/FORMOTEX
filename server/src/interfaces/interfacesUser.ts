export interface IUsers {
    id: number,
    username: string,
    password: string,
    email: string,
    role: 'admin' | 'user';
    
}

// aqui se exporta los atributos excepto el ID

export interface InterfazUser extends Omit<IUsers, 'id'> {}