import axiosInstance from "./index";
import {ClassifyHotDealRequest, GetProductsRankingRequest, GetProductsRequest} from "../common/productDto";

export const getProductInitData = () =>
    axiosInstance.get("/products/classify/init-data"
    )

export const getClassifyProduct = () =>
    axiosInstance.get("/products/classify"
    )

export const getProducts = (getProductsRequest:GetProductsRequest) =>
    axiosInstance.get("/products",
        {params:getProductsRequest}
    )

export const getProductsRanking = (getProductsRankingRequest:GetProductsRankingRequest) =>
    axiosInstance.get("/products/ranking",
        {params:getProductsRankingRequest}
    )


export const classifyHotDeal = (classifyHotDealRequest:ClassifyHotDealRequest) =>
    axiosInstance.patch("/hot-deals/classify",
        classifyHotDealRequest
    )