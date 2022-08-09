import axiosInstance from "./index";


export const getInitData = () =>
    axiosInstance.get("/init-data"
    )
