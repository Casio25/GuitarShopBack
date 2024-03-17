export interface ICreateProduct {
    authorId: number
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
    categoryId: number
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
    categoryId: number
    order: number
}

export interface IReorderProduct {
    authorId: number
    id: number
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