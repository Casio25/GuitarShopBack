export interface ICreateProduct {
    authorId: number
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
    categories: Category[]
}
export interface Category {
    id: number,
    name: string,
    type: string

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
    categories: Category[]
    order: number
}

export interface IReorderProduct {
    authorId: number
    id: number
    categoryid: number,
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