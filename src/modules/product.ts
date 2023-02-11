import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
import {ClassifyHotDealRequest, GetProductsRequest, ProductDto, ProductInitData} from "../common/productDto";
import {classifyHotDeal, getProductInitData, getProducts} from "../api/productApi";

const GET_PRODUCT_INIT_DATA_SUCCESS = "GET_PRODUCT_INIT_DATA_SUCCESS" as const;
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS" as const;
const CLASSIFY_HOT_DEAL_SUCCESS = "CLASSIFY_HOT_DEAL_SUCCESS" as const;

const SET_MODEL_NAME = "SET_MODEL_NAME" as const;
const SET_PRODUCT_ID = "SET_PRODUCT_ID" as const;
const SET_MANUFACTURER_ID = "SET_MANUFACTURER_ID" as const;
const SET_MANUFACTURER_NAME = "SET_MANUFACTURER_NAME" as const;
const SET_PRODUCT_PURPOSE_ID = "SET_PRODUCT_PURPOSE_ID" as const;
const SET_PRODUCT_TYPE_ID = "SET_PRODUCT_TYPE_ID" as const;
const SET_HOT_DEAL_ID = "SET_HOT_DEAL_ID" as const;


export const getProductInitDataSuccess = (productInitData: ProductInitData) => ({
    type: GET_PRODUCT_INIT_DATA_SUCCESS,
    productInitData: productInitData
});
export const getProductsSuccess = (products: ProductDto[]) => ({
    type: GET_PRODUCTS_SUCCESS,
    products: products
});

export const classifyHotDealSuccess = () => ({
    type: CLASSIFY_HOT_DEAL_SUCCESS
});

export const setModelName = (modelName: string) => ({
    type: SET_MODEL_NAME,
    modelName: modelName
});

export const setProductId = (productId: number) => ({
    type: SET_PRODUCT_ID,
    productId: productId
});


export const setManufacturerId = (manufacturerId: number) => ({
    type: SET_MANUFACTURER_ID,
    manufacturerId: manufacturerId
});
export const setManufacturerName = (manufacturerName: string) => ({
    type: SET_MANUFACTURER_NAME,
    manufacturerName: manufacturerName
});
export const setProductPurposeId = (productPurposeId: number) => ({
    type: SET_PRODUCT_PURPOSE_ID,
    productPurposeId: productPurposeId
});
export const setProductTypeId = (productTypeId: number) => ({
    type: SET_PRODUCT_TYPE_ID,
    productTypeId: productTypeId
});


export const setHotDealId = (hotDealId: number) => ({
    type: SET_HOT_DEAL_ID,
    hotDealId: hotDealId
});


export const callGetProductInitData =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getProductInitData().then((res) => {
                dispatch(getProductInitDataSuccess(res.data))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetProducts =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getProducts(getState().productReducer.getProductsRequest).then((res) => {
                dispatch(getProductsSuccess(res.data.products))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callClassifyHotDeal =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await classifyHotDeal(getState().productReducer.classifyHotDealRequest).then((res) => {
                if(200<=res.status && res.status<300){
                    dispatch(classifyHotDealSuccess())
                }
            }).catch((error) => {
                console.log(error.response.data)
            })
        };


type ProductAction =
    | ReturnType<typeof getProductInitDataSuccess>
    | ReturnType<typeof getProductsSuccess>
    | ReturnType<typeof setProductTypeId>
    | ReturnType<typeof setProductId>
    | ReturnType<typeof setProductPurposeId>
    | ReturnType<typeof setManufacturerId>
    | ReturnType<typeof setManufacturerName>
    | ReturnType<typeof setModelName>
    | ReturnType<typeof setHotDealId>
    | ReturnType<typeof classifyHotDealSuccess>

type ProductState = {
    productInitData: ProductInitData,
    products: ProductDto[],
    getProductsRequest: GetProductsRequest,
    classifyHotDealRequest: ClassifyHotDealRequest
}

const initialState: ProductState = {
    productInitData: null,
    products: [],
    getProductsRequest: null,
    classifyHotDealRequest: null
}

function productReducer(
    state: ProductState = initialState,
    action: ProductAction
) {
    switch (action.type) {
        case GET_PRODUCT_INIT_DATA_SUCCESS:
            return {
                ...state,
                productInitData: action.productInitData
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products
            }
        case SET_PRODUCT_TYPE_ID:
            return {
                ...state,
                classifyHotDealRequest: {
                    ...state.classifyHotDealRequest,
                    productTypeId: action.productTypeId
                }
            }
        case SET_PRODUCT_ID:
            return {
                ...state,
                classifyHotDealRequest: {
                    ...state.classifyHotDealRequest,
                    productId: action.productId
                }
            }
        case SET_PRODUCT_PURPOSE_ID:
            return {
                ...state,
                classifyHotDealRequest: {
                    ...state.classifyHotDealRequest,
                    productPurposeId: action.productPurposeId
                }
            }
        case SET_MODEL_NAME:
            return {
                ...state,
                classifyHotDealRequest: {
                    ...state.classifyHotDealRequest,
                    modelName: action.modelName
                },
                getProductsRequest: {
                    ...state.getProductsRequest,
                    modelName: action.modelName,
                    manufacturer: null
                }
            }
        case SET_MANUFACTURER_ID:
            return {
                ...state,
                classifyHotDealRequest: {
                    ...state.classifyHotDealRequest,
                    manufacturerId: action.manufacturerId
                }
            }
        case SET_MANUFACTURER_NAME:
            return {
                ...state,
                classifyHotDealRequest: {
                    ...state.classifyHotDealRequest,
                    manufacturer: action.manufacturerName
                },
                getProductsRequest: {
                    ...state.getProductsRequest,
                    manufacturer: action.manufacturerName,
                    modelName: null
                }
            }

        case SET_HOT_DEAL_ID:
            return {
                ...state,
                classifyHotDealRequest: {
                    ...state.classifyHotDealRequest,
                    hotDealId: action.hotDealId
                }
            }
        case CLASSIFY_HOT_DEAL_SUCCESS:
            return {
                ...state,
                classifyHotDealRequest: null
            }
        default:
            return state
    }
}

export default productReducer;