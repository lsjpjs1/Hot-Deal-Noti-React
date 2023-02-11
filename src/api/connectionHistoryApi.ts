import axiosInstance from "./index";

export const postConnectionHistory = () =>
    axiosInstance.post(`/connect`
    )