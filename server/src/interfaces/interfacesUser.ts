export interface IUsers {
    id: number,
    username: string,
    password: string,
    email: string,
    role: 'admin' | 'user';
    createdAt?: Date;
    updatedAt?: Date;
    
}