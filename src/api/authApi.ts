import axiosInstance from "./index";

export const kakaoLogin = (code:string,callBackUrl:string) =>{
    return axiosInstance.get("/oauth/callback/kakao",
        {params:{code:code,callBackUrl:callBackUrl}}
    )
}

