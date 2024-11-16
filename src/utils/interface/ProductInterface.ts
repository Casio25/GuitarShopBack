export interface ICreateProduct {
    authorId: number
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
    categories: Category[]
    orders: NewOrder[]
    
}
export interface ICreateProductResponseData{
    id: number;
    authorId: number;
    name: string
    photo: string
    description: string
    price: number
    visibility: boolean
    inStock: boolean
}
export interface ICreateProductResponse {
    data?: ICreateProductResponseData
    status: number
    error?: string
    
}
export interface Category {
    id: number,
    name: string,
    type: string,
    

}
export interface NewOrder {
    authorId: number,
    order: number,
    categoryId: number,
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

export interface IGetProductsResponse {
    id: number
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

export interface IGetProductsQuery {
    type?: string,
    string?: string,
    price?: string,
    productIds?: string,
    categories?: Category[]
    orders?: Order[]
    skip?: number,
    take?: number
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


export interface IGetProductsDataServiceResponse {
    count: number,
    data: IGetProductsResponse[]
}