import axiosInstance from "./index";
import {PageRequest} from "../common/page";
import {HotDealsQueryFilter} from "../common/hotDealDto";
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


export const viewHotDeal = (viewHotDealRequest: ViewHotDealRequest) =>
    axiosInstance.patch(`/hot-deals/${viewHotDealRequest.hotDealId}/view`)