export interface ICreateProduct {
    productName: string
    type: string
    photo: string
    price: number
    rating: number
    string: string
}

export interface IProductAuth {
    author: number
}

export interface IGetProducts {
    startIndex: number
    endIndex: number
}