export interface ICreateProduct {
    authorId: number
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
    categories: Category[]
    orders: Order[]
    
}
export interface Category {
    id: number,
    name: string,
    type: string,
    

}

export interface Order {
    id: number,
    order:number,
    categoryId: number,
    authorId: number
}

export interface IGetProducts {
    authorId: number
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
    categories: Category[]
    order: Order[]
    type: string
    string: string
}

export interface Order{
    id: number,
    order: number
    categoryId: number; 
    authorId: number;
}
export interface IChangeProduct {
    authorId: number
    id: number
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
    categories: Category[],
    orders: Order[]
    
}

export interface IReorderProduct {
    authorId: number
    id: number
    categoryId: number,
    order: number
    newOrder: number
}

export interface IProductAuth {
    authorId: number
}

export interface IDeleteProduct {
    id: number,
    authorId: number
}