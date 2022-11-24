import {HotDealPreview, HotDealsQueryFilter, NotClassifiedHotDeal, PostHotDealRequest} from "../common/hotDealDto";
import {
    deleteHotDeal, deletePermanentHotDeal, getFavoriteHotDeals,
    getHotDeals, getHotDealsByHotDealId, getHotDealsByProductId,
    GetHotDealsRequest, getNotClassifiedHotDeals,
    getWeeklyPopularHotDeals, postFavoriteHotDeal, postHotDeal,
    viewHotDeal,
    ViewHotDealRequest
} from "../api/hotDealApi";
import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
import {Page, PageRequest} from "../common/page";
import exp from "constants";
import {postConnectionHistory} from "../api/connectionHistoryApi";
import SortingType from "../enum/SortingType";
import {getInitData} from "../api/getInitDataApi";
import {InitData} from "../common/InitData";
import {postCustomerRequirement} from "../api/customerRequirementApi";
import {PostCustomerRequirementRequest} from "../common/customerRequirementDto";
import {useDispatch} from "react-redux";

const GET_HOT_DEALS_SUCCESS = "GET_HOT_DEALS_SUCCESS" as const;
const GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS = "GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS" as const;
const GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS = "GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS" as const;
const GET_INIT_DATA_SUCCESS = "GET_INIT_DATA_SUCCESS" as const;

const SET_SEARCH_BODY = 'SET_SEARCH_BODY' as const;
const SET_SORT = 'SET_SORT' as const;
const SET_PRODUCT_PURPOSE_ID = 'SET_PRODUCT_PURPOSE_ID' as const;
const SET_MANUFACTURER_ID = 'SET_MANUFACTURER_ID' as const;
const SET_PAGE = 'SET_PAGE' as const;
const SET_SOURCE_SITES = 'SET_SOURCE_SITES' as const;
const SET_PRODUCT_ID_FOR_SEARCH = "SET_PRODUCT_ID_FOR_SEARCH" as const;
const SET_CUSTOMER_REQUIREMENT_BODY = "SET_CUSTOMER_REQUIREMENT_BODY" as const;


const SET_ADD_HOT_DEAL_TITLE = "SET_ADD_HOT_DEAL_TITLE" as const;
const SET_ADD_HOT_DEAL_LINK = "SET_ADD_HOT_DEAL_LINK" as const;
const SET_ADD_HOT_DEAL_SITE = "SET_ADD_HOT_DEAL_SITE" as const;
const SET_ADD_HOT_DEAL_ORIGINAL_PRICE = "SET_ADD_HOT_DEAL_ORIGINAL_PRICE" as const;
const SET_ADD_HOT_DEAL_DISCOUNT_PRICE = "SET_ADD_HOT_DEAL_DISCOUNT_PRICE" as const;
const SET_ADD_HOT_DEAL_DISCOUNT_RATE = "SET_ADD_HOT_DEAL_DISCOUNT_RATE" as const;

export const setAddHotDealSite = (site: string) => ({
    type: SET_ADD_HOT_DEAL_SITE,
    site: site
});

export const setAddHotDealOriginalPrice = (originalPrice: number) => ({
    type: SET_ADD_HOT_DEAL_ORIGINAL_PRICE,
    originalPrice: originalPrice
});

export const setAddHotDealDiscountPrice = (discountPrice: number) => ({
    type: SET_ADD_HOT_DEAL_DISCOUNT_PRICE,
    discountPrice: discountPrice
});

export const setAddHotDealDiscountRate = (discountRate: number) => ({
    type: SET_ADD_HOT_DEAL_DISCOUNT_RATE,
    discountRate: discountRate
});

export const setAddHotDealLink = (link: string) => ({
    type: SET_ADD_HOT_DEAL_LINK,
    link: link
});

export const setAddHotDealTitle = (hotDealTitle: string) => ({
    type: SET_ADD_HOT_DEAL_TITLE,
    hotDealTitle: hotDealTitle
});

export const getHotDealsSuccess = (hotDeals: HotDealPreview[], totalPages: number) => ({
    type: GET_HOT_DEALS_SUCCESS,
    hotDeals: hotDeals,
    totalPages: totalPages
});

export const getHotDealsByProductIdSuccess = (hotDeals: HotDealPreview[], totalPages: number) => ({
    type: GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS,
    hotDeals: hotDeals,
    totalPages: totalPages
});

export const getNotClassifiedHotDealsSuccess = (notClassifiedHotDeals: NotClassifiedHotDeal[]) => ({
    type: GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS,
    notClassifiedHotDeals: notClassifiedHotDeals
});

export const getInitDataSuccess = (initData: InitData) => ({
    type: GET_INIT_DATA_SUCCESS,
    initData:initData
});
export const setProductIdForSearch = (productId: number) => ({
    type: SET_PRODUCT_ID_FOR_SEARCH,
    productId: productId
});

export const setSearchBody = (searchBody: string) => ({
    type: SET_SEARCH_BODY,
    searchBody: searchBody
});

export const setSort = (sort: string) => ({
    type: SET_SORT,
    sort: sort
});

export const setProductPurposeId = (productPurposeId: number) => ({
    type: SET_PRODUCT_PURPOSE_ID,
    productPurposeId: productPurposeId
});
export const setManufacturerId = (manufacturerId: number) => ({
    type: SET_MANUFACTURER_ID,
    manufacturerId: manufacturerId
});

export const setPage = (page: number) => ({
    type: SET_PAGE,
    page: page
});

export const setCustomerRequirementBody = (customerRequirementBody: string) => ({
    type: SET_CUSTOMER_REQUIREMENT_BODY,
    customerRequirementBody: customerRequirementBody
});

export const setSourceSites = (checked:boolean, sourceSite: string) => ({
    type: SET_SOURCE_SITES,
    checked: checked,
    sourceSite: sourceSite
});




export const callGetHotDeals =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getHotDeals(getState().hotDealReducer.getHotDealRequest).then((res) => {
                const page: Page<HotDealPreview> = res.data
                dispatch(getHotDealsSuccess(page.content, page.totalPages))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetFavoriteHotDeals =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getFavoriteHotDeals().then((res) => {
                const hotDealPreviews: HotDealPreview[] = res.data
                dispatch(getHotDealsSuccess(hotDealPreviews, 0))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetHotDealsByProductId =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getHotDealsByProductId(getState().hotDealReducer.getHotDealRequest,getState().hotDealReducer.productIdForSearch).then((res) => {
                const page: Page<HotDealPreview> = res.data
                dispatch(getHotDealsByProductIdSuccess(page.content, page.totalPages))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetHotDealsByHotDealId =
    (hotDealId:number): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getHotDealsByHotDealId(hotDealId).then((res) => {
                const hotDealPreview: HotDealPreview = res.data
                dispatch(getHotDealsSuccess([hotDealPreview], 1))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callDeleteHotDeal =
    (deletedHotDealId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await deleteHotDeal(deletedHotDealId).then((res) => {
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callPostFavoriteHotDeal =
    (hotDealId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await postFavoriteHotDeal(hotDealId).then((res) => {
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callDeletePermanentHotDeal =
    (deletedHotDealId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await deletePermanentHotDeal(deletedHotDealId).then((res) => {
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callPostHotDeal =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await postHotDeal(getState().hotDealReducer.postHotDealRequest).then((res) => {
                window.location.reload()
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetNotClassifiedHotDeals =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getNotClassifiedHotDeals().then((res) => {
                dispatch(getNotClassifiedHotDealsSuccess(res.data.hotDeals))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetWeeklyPopularHotDeals =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getWeeklyPopularHotDeals(getState().hotDealReducer.getHotDealRequest).then((res) => {
                const page: Page<HotDealPreview> = res.data
                dispatch(getHotDealsSuccess(page.content, page.totalPages))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetInitData =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getInitData().then((res) => {
                dispatch(getInitDataSuccess(res.data))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callPostCustomerRequirement =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await postCustomerRequirement(getState().hotDealReducer.postCustomerRequirementRequest).then((res) => {

            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callViewHotDeal =
    (viewHotDealRequest: ViewHotDealRequest): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await viewHotDeal(viewHotDealRequest).then((res) => {

            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callPostConnectionHistory =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await postConnectionHistory().then((res) => {

            }).catch((error) => {
                console.log(error.response.data)
            })
        };

type HotDealAction =
    | ReturnType<typeof getHotDealsSuccess>
    | ReturnType<typeof getHotDealsByProductIdSuccess>
    | ReturnType<typeof getNotClassifiedHotDealsSuccess>
    | ReturnType<typeof getInitDataSuccess>
    | ReturnType<typeof setSearchBody>
    | ReturnType<typeof setSort>
    | ReturnType<typeof setProductPurposeId>
    | ReturnType<typeof setManufacturerId>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setSourceSites>
    | ReturnType<typeof setProductIdForSearch>
    | ReturnType<typeof setCustomerRequirementBody>
    | ReturnType<typeof setAddHotDealTitle>
    | ReturnType<typeof setAddHotDealLink>
    | ReturnType<typeof setAddHotDealSite>
    | ReturnType<typeof setAddHotDealOriginalPrice>
    | ReturnType<typeof setAddHotDealDiscountPrice>
    | ReturnType<typeof setAddHotDealDiscountRate>

type HotDealState = {
    hotDeals: HotDealPreview[],
    notClassifiedHotDeals: NotClassifiedHotDeal[],
    initData:  InitData
    totalPages: number,
    getHotDealRequest: GetHotDealsRequest,
    productIdForSearch: number,
    postCustomerRequirementRequest:PostCustomerRequirementRequest,
    postHotDealRequest: PostHotDealRequest
}

const initialState: HotDealState = {
    hotDeals: [],
    notClassifiedHotDeals: [],
    initData: null,
    totalPages: 0,
    getHotDealRequest: {
        pageRequest: {
            page: 0,
            sort: SortingType.DISCOUNT_RATE_DESC,
            size: 40
        },
        filter: {
            searchBody: null,
            productPurposeId: null,
            manufacturerId: null
        },
        sourceSitesMap: new Map<string, boolean>([
            ["11번가",false],
            ["G마켓",false],
            ["옥션",false],
            ["롯데ON",false],
            ["쿠팡",false],
            ["하이마트",false]
            ]
        )
    },
    productIdForSearch: null,
    postCustomerRequirementRequest: {
        customerRequirementBody: ""
    },
    postHotDealRequest: {
        discountRate: null,
        discountPrice: null,
        originalPrice: null,
        title: null,
        url: null,
        sourceSite: null
    }
}

function hotDealReducer(
    state: HotDealState = initialState,
    action: HotDealAction
) {
    switch (action.type) {
        case "GET_HOT_DEALS_SUCCESS":
            return {
                ...state,
                hotDeals: action.hotDeals,
                totalPages: action.totalPages
            }
        case GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                hotDeals: action.hotDeals,
                totalPages: action.totalPages
            }
        case GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS:
            return {
                ...state,
                notClassifiedHotDeals: action.notClassifiedHotDeals
            }
        case "GET_INIT_DATA_SUCCESS":
            return {
                ...state,
                initData: action.initData
            }
        case "SET_SEARCH_BODY":
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    filter: {
                        ...state.getHotDealRequest.filter,
                        searchBody: action.searchBody
                    }
                }
            }
        case SET_SORT:
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    pageRequest: {
                        ...state.getHotDealRequest.pageRequest,
                        sort: action.sort
                    }
                }
            }
        case SET_PRODUCT_PURPOSE_ID:
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    filter: {
                        ...state.getHotDealRequest.filter,
                        productPurposeId: isNaN(action.productPurposeId) ? null: action.productPurposeId
                    }
                }
            }
        case SET_MANUFACTURER_ID:
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    filter: {
                        ...state.getHotDealRequest.filter,
                        manufacturerId: isNaN(action.manufacturerId) ? null: action.manufacturerId
                    }
                }
            }
        case SET_PAGE:
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    pageRequest: {
                        ...state.getHotDealRequest.pageRequest,
                        page: action.page
                    }
                }
            }
        case "SET_SOURCE_SITES":
            const newSourceSitesMap  = new Map(state.getHotDealRequest.sourceSitesMap);
            newSourceSitesMap.set(action.sourceSite,action.checked)
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    sourceSitesMap: newSourceSitesMap
                }
            }
        case "SET_PRODUCT_ID_FOR_SEARCH":
            return {
                ...state,
                productIdForSearch: action.productId
            }
        case "SET_CUSTOMER_REQUIREMENT_BODY":
            return {
                ...state,
                postCustomerRequirementRequest: {
                    ...state.postCustomerRequirementRequest,
                    customerRequirementBody: action.customerRequirementBody
                }
            }
        case SET_ADD_HOT_DEAL_TITLE:
            return {
                ...state,
                postHotDealRequest: {
                    ...state.postHotDealRequest,
                    title: action.hotDealTitle
                }
            }
        case "SET_ADD_HOT_DEAL_LINK":
            return {
                ...state,
                postHotDealRequest: {
                    ...state.postHotDealRequest,
                    url: action.link
                }
            }
        case "SET_ADD_HOT_DEAL_SITE":
            return {
                ...state,
                postHotDealRequest: {
                    ...state.postHotDealRequest,
                    sourceSite: action.site
                }
            }
        case SET_ADD_HOT_DEAL_ORIGINAL_PRICE:
            if (state.postHotDealRequest.originalPrice!=null&& state.postHotDealRequest.discountPrice!=null){
                return {
                    ...state,
                    postHotDealRequest: {
                        ...state.postHotDealRequest,
                        originalPrice: action.originalPrice,
                        discountRate: Math.floor(100-(state.postHotDealRequest.discountPrice/action.originalPrice))
                    }
                }
            }
            return {
                ...state,
                postHotDealRequest: {
                    ...state.postHotDealRequest,
                    originalPrice: action.originalPrice
                }
            }
        case "SET_ADD_HOT_DEAL_DISCOUNT_PRICE":
            if (state.postHotDealRequest.originalPrice!=null&& state.postHotDealRequest.discountPrice!=null){
                console.log((action.discountPrice/state.postHotDealRequest.originalPrice))
                return {
                    ...state,
                    postHotDealRequest: {
                        ...state.postHotDealRequest,
                        discountPrice: action.discountPrice,
                        discountRate: Math.floor(100-100*(action.discountPrice/state.postHotDealRequest.originalPrice))
                    }
                }
            }
            return {
                ...state,
                postHotDealRequest: {
                    ...state.postHotDealRequest,
                    discountPrice: action.discountPrice
                }
            }
        case "SET_ADD_HOT_DEAL_DISCOUNT_RATE":
            return {
                ...state,
                postHotDealRequest: {
                    ...state.postHotDealRequest,
                    discountRate: action.discountRate
                }
            }
        default:
            return state
    }
}

export default hotDealReducer;