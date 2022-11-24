import axiosInstance from "./index";
import {GetProductsRequest, ClassifyHotDealRequest} from "../common/productDto";

export const kakaoLogin = (code:string) =>
    axiosInstance.get("/oauth/callback/kakao",
        {params:{code:code}}
    )

