import axiosInstance from "./index";
import {GetHotDealsRequest} from "./hotDealApi";

export const postConnectionHistory = () =>
    axiosInstance.post(`/connect`
    )