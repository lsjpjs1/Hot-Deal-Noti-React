export interface ProductInitData {
    productTypes: ProductType[],
    productPurposes: ProductPurpose[],
    manufacturers: Manufacturer[]
}

export interface ProductType {
    productTypeId: number,
    productTypeName: string
}
export interface ProductPurpose {
    productPurposeId: number,
    productPurposeName: string
}
export interface Manufacturer {
    manufacturerId: number,
    manufacturerName: string
}

export interface GetProductsRequest {
    modelName: string,
    manufacturer: string
}

export interface ClassifyHotDealRequest {
    hotDealId: number,
    productId: number,
    modelName: string,
    manufacturerId: number,
    manufacturer: string,
    productPurposeId: number,
    productTypeId: number
}


export interface GetProductsResponse {
    products: ProductDto[]
}

export interface ProductDto {
    productId: number,
    modelName: string,
    fullModelName: string,
    productType: string,
    manufacturer: string,
    manufacturerId: number
}