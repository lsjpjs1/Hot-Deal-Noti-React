import axiosInstance from "./index";
import {GetProductsRequest, ClassifyHotDealRequest} from "../common/productDto";
import {PostCustomerRequirementRequest} from "../common/customerRequirementDto";


export const postCustomerRequirement = (postCustomerRequirementRequest: PostCustomerRequirementRequest) =>
    axiosInstance.post("/customer-requirement",
        postCustomerRequirementRequest
    )