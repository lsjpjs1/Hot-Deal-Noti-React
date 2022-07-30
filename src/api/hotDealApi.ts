import axiosInstance from "./index";
import {PageRequest} from "../common/page";

export type GetHotDealsRequest = {
    pageRequest: PageRequest
}
export const getHotDeals = (getHotDealsRequest: GetHotDealsRequest) =>
    axiosInstance.get(`/hot-deals?page=${getHotDealsRequest.pageRequest.page}&size=${getHotDealsRequest.pageRequest.size}&sort=${getHotDealsRequest.pageRequest.sort},desc`)