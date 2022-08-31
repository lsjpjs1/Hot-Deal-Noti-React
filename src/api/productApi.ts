import axiosInstance from "./index";
import {GetProductsRequest, ClassifyHotDealRequest} from "../common/productDto";

export const getProductInitData = () =>
    axiosInstance.get("/products/classify/init-data"
    )

export const getProducts = (getProductsRequest:GetProductsRequest) =>
    axiosInstance.get("/products",
        {params:getProductsRequest}
    )

export const classifyHotDeal = (classifyHotDealRequest:ClassifyHotDealRequest) =>
    axiosInstance.patch("/hot-deals/classify",
        classifyHotDealRequest
    )