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

export interface GetProductsRankingRequest {
    productPurposeId: number
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

export interface GetProductsRankingResponse {
    productsRankingDTOList: GetProductsRankingDTO[]
}

export interface GetProductsRankingDTO {
    productId: number,
    modelName: string,
    productPurposeId: number,
    productPurpose: string,
    productRankingNumber: number
}

export interface ProductDto {
    productId: number,
    modelName: string,
    fullModelName: string,
    productType: string,
    manufacturer: string,
    manufacturerId: number
}

export interface ClassifyProduct {
    productId: number,
    modelName: string,
    productInfoCandidateHtml: string
}

export interface GetProductFunctionTypesResponse {
    productFunctionTypes: GetProductFunctionTypeDTO[]
}

export interface GetProductFunctionTypeDTO {
    productFunctionTypeId: number,
    productFunctionTypeName: string,
    productFunctions: GetProductFunctionDTO[]
}

export interface GetProductFunctionDTO {
    productFunctionId: number,
    productFunctionName: string,
}

export interface ProductFunctionFilterWrapper {
    productFunctionFilters: ProductFunctionFilter[],
}

export interface ProductFunctionFilter {
    productFunctionTypeId: number,
    productFunctionIdList: number[]
}

export interface SetProductFunctionFilterDTO {
    productFunctionTypeId: number,
    productFunctionId: number,
    isChecked: boolean
}