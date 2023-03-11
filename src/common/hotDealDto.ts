import {Page} from "./page";


export interface HotDealPreview {
    hotDealId: number
    title: string
    originalPrice: number
    discountPrice: number
    discountRate: number
    link: string
    uploadTime: string
    viewCount: number
    sourceSite: string

    productId: number
    modelName: string
    manufacturer:string
    productPurpose: string

    isDelete: boolean

    hotDealThumbnailUrl: string

    returnItemId: number
    returnItemQuality: string
    returnItemQualityDetail: string
    returnItemSaleStatus: string

    productRanking: number
    productPurposeId: number

    isCandidateProduct: boolean

    productAdditionalFunctionDTOList: ProductAdditionalFunctionDTO[]
}

export interface ProductAdditionalFunctionDTO {
    productFunctionTypeId:number
    productFunctionId:number
    productFunctionTypeName:string
    productFunctionName:string

}

export interface GetHotDealByProductIdResponse {
    hotDeals: Page<HotDealPreview>
    historicalLowPrice: number
}

export interface NotClassifiedHotDeal {
    hotDealId: number
    hotDealTitle: string
    hotDealOriginalPrice: number
    hotDealDiscountPrice: number
    hotDealDiscountRate: number
    hotDealLink: string
    hotDealUploadTime: string
    candidateProductName: string

}

export interface HotDealsQueryFilter {
    searchBody: string
    productPurposeId: number
    manufacturerId: number
    isShowReturnItem: boolean
    minDiscountRate: number
    maxDiscountRate: number
    productFunctionFiltersJsonString: string
}

export interface PostHotDealRequest {
     discountRate: number
     discountPrice: number
     originalPrice: number
     title: string
     url: string
     sourceSite: string
}

