import axiosInstance from "./index";
import {PageRequest} from "../common/page";
import {HotDealsQueryFilter} from "../common/hotDealDto";
import qs from "qs";

export type GetHotDealsRequest = {
    pageRequest: PageRequest,
    filter: HotDealsQueryFilter
}

export type ViewHotDealRequest = {
    hotDealId: number
}
export const getHotDeals = (getHotDealsRequest: GetHotDealsRequest) =>
    axiosInstance.get(`/hot-deals?page=${getHotDealsRequest.pageRequest.page}&size=${getHotDealsRequest.pageRequest.size}&sort=${getHotDealsRequest.pageRequest.sort}`,
        {params:getHotDealsRequest.filter}
    )

export const viewHotDeal = (viewHotDealRequest: ViewHotDealRequest) =>
    axiosInstance.patch(`/hot-deals/${viewHotDealRequest.hotDealId}/view`)