

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
}

export interface PostHotDealRequest {
     discountRate: number
     discountPrice: number
     originalPrice: number
     title: string
     url: string
     sourceSite: string
}

