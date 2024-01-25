export interface ICreateProduct {
    authorId: number
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
    category: string
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
    category: string
}
export interface IProductAuth {
    authorId: number
}

