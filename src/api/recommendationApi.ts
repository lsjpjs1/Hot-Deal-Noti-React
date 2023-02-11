import axiosInstance from "./index";
import {
    GetProductFamiliesRequest,
    PostProductFamilyRequest,
    PostRecommendationProductFamilyRequest,
    SetProductFamilyRequest,
    UpdateProductFamilyRequest
} from "../common/recommendationDto";

export const getRecommendations = () =>
    axiosInstance.get("/recommendations"
    )

export const postProductFamily = (postProductFamilyRequest: PostProductFamilyRequest) =>{

    return axiosInstance.post(`/product-families`,
        postProductFamilyRequest
    )
}


export const postRecommendationProductFamily = (postRecommendationProductFamilyRequest: PostRecommendationProductFamilyRequest) =>{

    return axiosInstance.post(`/recommendation-product-family`,
        postRecommendationProductFamilyRequest
    )
}


export const getProductFamilies = (getProductFamiliesRequest:GetProductFamiliesRequest) =>
    axiosInstance.get(`/product-families`,
        {params:getProductFamiliesRequest}
    )

export const getProductPurposeDetails = () =>
    axiosInstance.get(`/product-purpose-details`
    )

export const setProductFamily = (setProductFamilyRequest:SetProductFamilyRequest) =>{

    return axiosInstance.patch(`/products/product-family`,
        setProductFamilyRequest
    )
}

export const updateProductFamily = (updateProductFamilyRequest:UpdateProductFamilyRequest) =>{

    return axiosInstance.patch(`/product-families/${updateProductFamilyRequest.productFamilyId}`,
        updateProductFamilyRequest
    )
}

export const clearProductFamily = (productId:number) =>{

    return axiosInstance.delete(`/products/${productId}/product-family`
    )
}