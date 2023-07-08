export interface IPerson {
    id: number, 
    email: string,
    username: string,
    token: string
}

export interface ICreatePerson {
    username: string,
    email: string,
    password: string
}