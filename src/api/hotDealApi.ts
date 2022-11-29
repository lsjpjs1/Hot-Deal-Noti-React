import axiosInstance from "./index";
import {PageRequest} from "../common/page";
import {HotDealsQueryFilter, PostHotDealRequest} from "../common/hotDealDto";
import qs from "qs";

export type GetHotDealsRequest = {
    pageRequest: PageRequest,
    filter: HotDealsQueryFilter,
    sourceSitesMap: Map<string, boolean>
}


export type ViewHotDealRequest = {
    hotDealId: number
}
export const getHotDeals = (getHotDealsRequest: GetHotDealsRequest) =>{
    let sourceSitesStr = ""
    getHotDealsRequest.sourceSitesMap.forEach(
        (value, key, map) => {
            if(value){
                sourceSitesStr+="&sourceSites="+key
            }
        }
    )
    return axiosInstance.get(`/hot-deals?page=${getHotDealsRequest.pageRequest.page}&size=${getHotDealsRequest.pageRequest.size}&sort=${getHotDealsRequest.pageRequest.sort}${sourceSitesStr}`,
        {params:getHotDealsRequest.filter}
    )
}
export const getHotDealsByProductId = (getHotDealsRequest: GetHotDealsRequest, productId: number) =>{
    return axiosInstance.get(`/hot-deals/${productId}?page=${getHotDealsRequest.pageRequest.page}&size=${getHotDealsRequest.pageRequest.size}&sort=${getHotDealsRequest.pageRequest.sort}`
    )
}
export const getHotDealsByHotDealId = (hotDealId: number) =>{
    return axiosInstance.get(`/hot-deals/hot-deal/${hotDealId}`
    )
}



export const getWeeklyPopularHotDeals = (getHotDealsRequest: GetHotDealsRequest) =>{

    return axiosInstance.get(`/hot-deals/weekly-popular?page=${getHotDealsRequest.pageRequest.page}&size=${getHotDealsRequest.pageRequest.size}&sort=VIEW_COUNT,desc`,
        {params:getHotDealsRequest.filter}
    )
}

export const getNotClassifiedHotDeals = () =>{

    return axiosInstance.get(`/hot-deals/not-classified`)
}

export const deleteHotDeal = (hotDealId: number) =>{

    return axiosInstance.delete(`/hot-deals/${hotDealId}`)
}

export const postFavoriteHotDeal = (hotDealId: number) =>{

    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""

    return axiosInstance.post(`/hot-deals/${hotDealId}/favorite`,null,{
        headers: {
            "Authorization": "Bearer " + authToken
        }
    })
}

export const postRecommendationHotDeal = (hotDealId: number) =>{


    return axiosInstance.post(`/hot-deals/${hotDealId}/recommendation`)
}

export const deleteFavoriteHotDeal = (hotDealId: number) =>{

    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""

    return axiosInstance.delete(`/hot-deals/${hotDealId}/favorite`,{
        headers: {
            "Authorization": "Bearer " + authToken
        }
    })
}

export const deletePermanentHotDeal = (hotDealId: number) =>{

    return axiosInstance.delete(`/hot-deals/${hotDealId}/permanent`)
}


export const postHotDeal = (postHotDealRequest: PostHotDealRequest) =>{

    return axiosInstance.post(`/hot-deals`,
        postHotDealRequest
        )
}


export const viewHotDeal = (viewHotDealRequest: ViewHotDealRequest) =>
    axiosInstance.patch(`/hot-deals/${viewHotDealRequest.hotDealId}/view`)

export const getFavoriteHotDeals = () =>{

    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""
    return axiosInstance.get(`/hot-deals/favorite`,
        {
            headers: {
                Authorization: "Bearer " + authToken
            }
        }
    )
}

export const getRecommendationHotDeals = () =>{

    return axiosInstance.get(`/hot-deals/recommendation`
    )
}