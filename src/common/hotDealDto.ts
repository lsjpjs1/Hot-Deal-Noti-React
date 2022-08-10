

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
}

export interface HotDealsQueryFilter {
    searchBody: string
}



