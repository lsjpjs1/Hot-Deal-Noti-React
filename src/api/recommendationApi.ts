import axiosInstance from "./index";
import {GetProductsRequest, ClassifyHotDealRequest} from "../common/productDto";
import {PostProductFamilyRequest} from "../common/recommendationDto";

export const getRecommendations = () =>
    axiosInstance.get("/recommendations"
    )

export const postProductFamily = (postProductFamilyRequest: PostProductFamilyRequest) =>{

    return axiosInstance.post(`/product-families`,
        postProductFamilyRequest
    )
}

