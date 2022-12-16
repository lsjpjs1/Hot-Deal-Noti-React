
import axiosInstance from "./index";
import {GetProductsRequest} from "../common/productDto";
import {PostKeywordRequest} from "../common/notificationDto";

export const sendEmailVerificationCode = (userEmail:string) =>{
    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""
    return axiosInstance.post(`/accounts/email/${userEmail}/verification`,{},{
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }
    )
}

export const checkEmailVerificationCode = (verificationCode:string) =>{
    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""
    return axiosInstance.post(`/accounts/email/verification-code/${verificationCode}/check`,{},{
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }
    )
}

export const getUserEmail = () =>{
    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""
    return axiosInstance.get("/accounts/email",
        {
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }
    )

}


export const postKeyword = (postKeywordRequest:PostKeywordRequest) =>{
    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""
    return axiosInstance.post(`/notification-keywords`,postKeywordRequest,{
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }
    )
}

export const deleteKeyword = (notificationKeywordId: number) =>{

    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""

    return axiosInstance.delete(`/notification-keywords/${notificationKeywordId}`,{
        headers: {
            "Authorization": "Bearer " + authToken
        }
    })
}

export const getKeywords = () =>{
    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""
    return axiosInstance.get("/notification-keywords",
        {
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }
    )

}

export const getNotifications = () =>{
    const authToken = localStorage.getItem("authToken") != null? localStorage.getItem("authToken"):""
    return axiosInstance.get("/notifications?page=0&size=40&sort=MOCK_DATA",
        {
            headers: {
                "Authorization": "Bearer " + authToken
            }
        }
    )

}

