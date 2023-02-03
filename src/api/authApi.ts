import axiosInstance from "./index";
import {GetProductsRequest, ClassifyHotDealRequest} from "../common/productDto";

export const kakaoLogin = (code:string,callBackUrl:string) =>{
    return axiosInstance.get("/oauth/callback/kakao",
        {params:{code:code,callBackUrl:callBackUrl}}
    )
}

