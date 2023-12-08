export interface ICreateProduct {
    productName: string
    authorId: number
    type: string
    photo: string
    price: number
    rating: number
    string: string
}
export interface IChangeProduct {
    id: number
    productName: string
    authorId: number
    type: string
    photo: string
    price: number
    string: string
}
export interface IProductAuth {
    authorId: number
}

