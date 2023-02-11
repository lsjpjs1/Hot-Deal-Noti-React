import axiosInstance from "./index";
import {PostCustomerRequirementRequest} from "../common/customerRequirementDto";


export const postCustomerRequirement = (postCustomerRequirementRequest: PostCustomerRequirementRequest) =>
    axiosInstance.post("/customer-requirement",
        postCustomerRequirementRequest
    )