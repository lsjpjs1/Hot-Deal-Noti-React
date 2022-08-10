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


export const viewHotDeal = (viewHotDealRequest: ViewHotDealRequest) =>
    axiosInstance.patch(`/hot-deals/${viewHotDealRequest.hotDealId}/view`)