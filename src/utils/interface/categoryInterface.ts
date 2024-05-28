export interface ICreateCategory {
    name: string,
    
}

export interface ICustomCategory {
    name: string,
    id: number,
    userId: number
}

export interface IDeleteCategory {
    id: number,
    name: string,
    type: string
}