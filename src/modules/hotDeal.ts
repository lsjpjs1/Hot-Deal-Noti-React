import {
    GetHotDealByProductIdResponse,
    HotDealPreview,
    NotClassifiedHotDeal,
    PostHotDealRequest
} from "../common/hotDealDto";
import {
    deleteHotDeal,
    deletePermanentHotDeal, deleteProductIdHotDeal,
    getFavoriteHotDeals,
    getHotDeals,
    getHotDealsByHotDealId,
    getHotDealsByProductId,
    GetHotDealsRequest,
    getNotClassifiedHotDeals,
    getRecommendationHotDeals,
    getWeeklyPopularHotDeals,
    postFavoriteHotDeal,
    postHotDeal,
    viewHotDeal,
    ViewHotDealRequest
} from "../api/hotDealApi";
import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
import {Page} from "../common/page";
import {postConnectionHistory} from "../api/connectionHistoryApi";
import SortingType from "../enum/SortingType";
import {getInitData} from "../api/getInitDataApi";
import {InitData} from "../common/InitData";
import {postCustomerRequirement} from "../api/customerRequirementApi";
import {PostCustomerRequirementRequest} from "../common/customerRequirementDto";
import {ProductFunctionFilter, ProductFunctionFilterWrapper, SetProductFunctionFilterDTO} from "../common/productDto";

const GET_HOT_DEALS_SUCCESS = "GET_HOT_DEALS_SUCCESS" as const;
const GET_RETURN_HOT_DEALS_SUCCESS = "GET_RETURN_HOT_DEALS_SUCCESS" as const;
const GET_RECOMMENDATION_HOT_DEALS_SUCCESS = "GET_RECOMMENDATION_HOT_DEALS_SUCCESS" as const;
const GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS = "GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS" as const;
const GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS = "GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS" as const;
const GET_INIT_DATA_SUCCESS = "GET_INIT_DATA_SUCCESS" as const;

const SET_SEARCH_BODY = 'SET_SEARCH_BODY' as const;
const SET_SEARCH_MODE = 'SET_SEARCH_MODE' as const;
const SET_SORT = 'SET_SORT' as const;
const SET_PRODUCT_PURPOSE_ID = 'SET_PRODUCT_PURPOSE_ID' as const;
const SET_MANUFACTURER_ID = 'SET_MANUFACTURER_ID' as const;
const SET_PAGE = 'SET_PAGE' as const;
const SET_IS_SHOW_RETURN_ITEM = 'SET_IS_SHOW_RETURN_ITEM' as const;
const SET_SOURCE_SITES = 'SET_SOURCE_SITES' as const;
const SET_PRODUCT_ID_FOR_SEARCH = "SET_PRODUCT_ID_FOR_SEARCH" as const;
const SET_CUSTOMER_REQUIREMENT_BODY = "SET_CUSTOMER_REQUIREMENT_BODY" as const;
const SET_DISCOUNT_RATE_FILTER = "SET_DISCOUNT_RATE_FILTER" as const;


const SET_ADD_HOT_DEAL_TITLE = "SET_ADD_HOT_DEAL_TITLE" as const;
const SET_ADD_HOT_DEAL_LINK = "SET_ADD_HOT_DEAL_LINK" as const;
const SET_ADD_HOT_DEAL_SITE = "SET_ADD_HOT_DEAL_SITE" as const;
const SET_ADD_HOT_DEAL_ORIGINAL_PRICE = "SET_ADD_HOT_DEAL_ORIGINAL_PRICE" as const;
const SET_ADD_HOT_DEAL_DISCOUNT_PRICE = "SET_ADD_HOT_DEAL_DISCOUNT_PRICE" as const;
const SET_ADD_HOT_DEAL_DISCOUNT_RATE = "SET_ADD_HOT_DEAL_DISCOUNT_RATE" as const;


const SET_PRODUCT_FUNCTION_CHECK_BOX_MAP = "SET_PRODUCT_FUNCTION_CHECK_BOX_MAP" as const;
const SET_PRODUCT_FUNCTION_FILTER_WRAPPER = "SET_PRODUCT_FUNCTION_FILTER_WRAPPER" as const;

const SET_HIDE_RECOMMENDATION_HOT_DEAL = "SET_HIDE_RECOMMENDATION_HOT_DEAL" as const;

export const setHideRecommendationHotDeal = (isHide: boolean) => ({
    type: SET_HIDE_RECOMMENDATION_HOT_DEAL,
    isHide: isHide
});

export const setProductFunctionCheckBoxMap = (productFunctionId: number) => ({
    type: SET_PRODUCT_FUNCTION_CHECK_BOX_MAP,
    productFunctionId: productFunctionId
});

export const setProductFunctionFilterWrapper = (setProductFunctionFilterDTO: SetProductFunctionFilterDTO) => ({
    type: SET_PRODUCT_FUNCTION_FILTER_WRAPPER,
    setProductFunctionFilterDTO: setProductFunctionFilterDTO
});

export const setAddHotDealSite = (site: string) => ({
    type: SET_ADD_HOT_DEAL_SITE,
    site: site
});

export const setSearchMode = (searchMode: string) => ({
    type: SET_SEARCH_MODE,
    searchMode: searchMode
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

export const setDiscountRateFilter = (minDiscountRate: number, maxDiscountRate: number) => ({
    type: SET_DISCOUNT_RATE_FILTER,
    minDiscountRate: minDiscountRate,
    maxDiscountRate: maxDiscountRate
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

export const getReturnHotDealsSuccess = (hotDeals: HotDealPreview[], totalPages: number, isReturnHotDealMode: boolean) => ({
    type: GET_RETURN_HOT_DEALS_SUCCESS,
    hotDeals: hotDeals,
    totalPages: totalPages,
    isReturnHotDealMode: isReturnHotDealMode
});

export const getRecommendationHotDealsSuccess = (recommendationHotDeals: HotDealPreview[]) => ({
    type: GET_RECOMMENDATION_HOT_DEALS_SUCCESS,
    recommendationHotDeals: recommendationHotDeals
});

export const getHotDealsByProductIdSuccess = (hotDeals: HotDealPreview[], totalPages: number, historicalLowPrice: number) => ({
    type: GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS,
    hotDeals: hotDeals,
    totalPages: totalPages,
    historicalLowPrice: historicalLowPrice
});

export const getNotClassifiedHotDealsSuccess = (notClassifiedHotDeals: NotClassifiedHotDeal[]) => ({
    type: GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS,
    notClassifiedHotDeals: notClassifiedHotDeals
});

export const getInitDataSuccess = (initData: InitData) => ({
    type: GET_INIT_DATA_SUCCESS,
    initData: initData
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

export const setIsShowReturnItem = (isShow: boolean) => ({
    type: SET_IS_SHOW_RETURN_ITEM,
    isShow: isShow
});

export const setCustomerRequirementBody = (customerRequirementBody: string) => ({
    type: SET_CUSTOMER_REQUIREMENT_BODY,
    customerRequirementBody: customerRequirementBody
});

export const setSourceSites = (checked: boolean, sourceSite: string) => ({
    type: SET_SOURCE_SITES,
    checked: checked,
    sourceSite: sourceSite
});


export const callGetHotDeals =
    (isReturnHotDealMode: boolean = false): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            const isShowReturnItem = getState().hotDealReducer.getHotDealRequest.filter.isShowReturnItem
            await getHotDeals(getState().hotDealReducer.getHotDealRequest).then((res) => {
                const page: Page<HotDealPreview> = res.data
                if (isShowReturnItem == true) {
                    dispatch(getReturnHotDealsSuccess(page.content, page.totalPages, isReturnHotDealMode))
                    dispatch(setIsShowReturnItem(null))
                } else {
                    dispatch(getHotDealsSuccess(page.content, page.totalPages))
                }
            }).catch((error) => {
                console.log(error.response)
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

export const callGetRecommendationHotDeals =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getRecommendationHotDeals().then((res) => {
                const hotDealPreviews: HotDealPreview[] = res.data
                dispatch(getRecommendationHotDealsSuccess(hotDealPreviews))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetHotDealsByProductId =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getHotDealsByProductId(getState().hotDealReducer.getHotDealRequest, getState().hotDealReducer.productIdForSearch).then((res) => {
                const getHotDealByProductIdResponse: GetHotDealByProductIdResponse = res.data
                const page: Page<HotDealPreview> = getHotDealByProductIdResponse.hotDeals
                dispatch(getHotDealsByProductIdSuccess(page.content, page.totalPages, getHotDealByProductIdResponse.historicalLowPrice))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetHotDealsByHotDealId =
    (hotDealId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
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

export const callDeleteProductIdHotDeal =
    (deletedHotDealId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await deleteProductIdHotDeal(deletedHotDealId).then((res) => {
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
    | ReturnType<typeof getReturnHotDealsSuccess>
    | ReturnType<typeof getRecommendationHotDealsSuccess>
    | ReturnType<typeof getHotDealsByProductIdSuccess>
    | ReturnType<typeof getNotClassifiedHotDealsSuccess>
    | ReturnType<typeof getInitDataSuccess>
    | ReturnType<typeof setSearchBody>
    | ReturnType<typeof setSearchMode>
    | ReturnType<typeof setSort>
    | ReturnType<typeof setProductPurposeId>
    | ReturnType<typeof setManufacturerId>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setSourceSites>
    | ReturnType<typeof setProductIdForSearch>
    | ReturnType<typeof setIsShowReturnItem>
    | ReturnType<typeof setCustomerRequirementBody>
    | ReturnType<typeof setDiscountRateFilter>
    | ReturnType<typeof setAddHotDealTitle>
    | ReturnType<typeof setAddHotDealLink>
    | ReturnType<typeof setAddHotDealSite>
    | ReturnType<typeof setAddHotDealOriginalPrice>
    | ReturnType<typeof setAddHotDealDiscountPrice>
    | ReturnType<typeof setAddHotDealDiscountRate>
    | ReturnType<typeof setProductFunctionCheckBoxMap>
    | ReturnType<typeof setProductFunctionFilterWrapper>
    | ReturnType<typeof setHideRecommendationHotDeal>

type HotDealState = {
    hotDeals: HotDealPreview[],
    returnHotDeals: HotDealPreview[],
    recommendationHotDeals: HotDealPreview[],
    notClassifiedHotDeals: NotClassifiedHotDeal[],
    initData: InitData
    totalPages: number,
    getHotDealRequest: GetHotDealsRequest,
    productIdForSearch: number,
    historicalLowPrice: number,
    postCustomerRequirementRequest: PostCustomerRequirementRequest,
    postHotDealRequest: PostHotDealRequest,
    searchMode: string,
    productFunctionFilterWrapper: ProductFunctionFilterWrapper,
    productFunctionCheckBoxMap: Map<number, boolean>,
    hideRecommendationHotDeal: boolean
}

const initialState: HotDealState = {
    hotDeals: [],
    returnHotDeals: [],
    recommendationHotDeals: [],
    notClassifiedHotDeals: [],
    initData: null,
    totalPages: 0,
    getHotDealRequest: {
        pageRequest: {
            page: 0,
            sort: SortingType.UPLOAD_TIME_DESC,
            size: 12
        },
        filter: {
            searchBody: null,
            productPurposeId: null,
            manufacturerId: null,
            isShowReturnItem: null,
            minDiscountRate: 0,
            maxDiscountRate: 100,
            productFunctionFiltersJsonString: null
        },
        sourceSitesMap: new Map<string, boolean>([
                ["11번가", false],
                ["G마켓", false],
                ["옥션", false],
                ["롯데ON", false],
                ["쿠팡", false],
                ["하이마트", false]
            ]
        )
    },
    productIdForSearch: null,
    historicalLowPrice: null,
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
    },
    searchMode: null,
    productFunctionFilterWrapper: {productFunctionFilters: []},
    productFunctionCheckBoxMap: new Map<number, boolean>(),
    hideRecommendationHotDeal: false
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
        case "GET_RETURN_HOT_DEALS_SUCCESS":
            if (action.isReturnHotDealMode) {
                return {
                    ...state,
                    returnHotDeals: action.hotDeals,
                    totalPages: action.totalPages
                }
            } else {
                return {
                    ...state,
                    returnHotDeals: action.hotDeals
                }
            }
        case "GET_RECOMMENDATION_HOT_DEALS_SUCCESS":
            return {
                ...state,
                recommendationHotDeals: action.recommendationHotDeals
            }
        case GET_HOT_DEALS_BY_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                hotDeals: action.hotDeals,
                totalPages: action.totalPages,
                historicalLowPrice: action.historicalLowPrice
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
        case "SET_SEARCH_MODE":
            return {
                ...state,
                searchMode: action.searchMode
            }
        case SET_DISCOUNT_RATE_FILTER:
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    filter: {
                        ...state.getHotDealRequest.filter,
                        minDiscountRate: action.minDiscountRate,
                        maxDiscountRate: action.maxDiscountRate
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
        case "SET_IS_SHOW_RETURN_ITEM":
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    filter: {
                        ...state.getHotDealRequest.filter,
                        isShowReturnItem: action.isShow
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
                        productPurposeId: isNaN(action.productPurposeId) ? null : action.productPurposeId
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
                        manufacturerId: isNaN(action.manufacturerId) ? null : action.manufacturerId
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
            const newSourceSitesMap = new Map(state.getHotDealRequest.sourceSitesMap);
            newSourceSitesMap.set(action.sourceSite, action.checked)
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
            if (state.postHotDealRequest.originalPrice != null && state.postHotDealRequest.discountPrice != null) {
                return {
                    ...state,
                    postHotDealRequest: {
                        ...state.postHotDealRequest,
                        originalPrice: action.originalPrice,
                        discountRate: Math.floor(100 - (state.postHotDealRequest.discountPrice / action.originalPrice))
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
            if (state.postHotDealRequest.originalPrice != null && state.postHotDealRequest.discountPrice != null) {
                return {
                    ...state,
                    postHotDealRequest: {
                        ...state.postHotDealRequest,
                        discountPrice: action.discountPrice,
                        discountRate: Math.floor(100 - 100 * (action.discountPrice / state.postHotDealRequest.originalPrice))
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
        case SET_PRODUCT_FUNCTION_CHECK_BOX_MAP:
            const copyMap = new Map(state.productFunctionCheckBoxMap);
            if (state.productFunctionCheckBoxMap.has(action.productFunctionId)) {
                copyMap.set(action.productFunctionId, !copyMap.get(action.productFunctionId))
            } else {
                copyMap.set(action.productFunctionId, true)
            }
            return {
                ...state,
                productFunctionCheckBoxMap: copyMap
            }
        case SET_PRODUCT_FUNCTION_FILTER_WRAPPER:
            const targetProductFunctionTypeId = action.setProductFunctionFilterDTO.productFunctionTypeId
            const targetProductFunctionId = action.setProductFunctionFilterDTO.productFunctionId
            const targetProductFunctionName = action.setProductFunctionFilterDTO.productFunctionTypeName
            const productFunctionFilterWrapper = state.productFunctionFilterWrapper;
            if (action.setProductFunctionFilterDTO.isChecked) {
                //체크가 이제 풀리는 상황

                //1.펑션 아이디 리스트에서 제거
                var tarProductFunctionFilter = null
                for (let i = 0; i < productFunctionFilterWrapper.productFunctionFilters.length; i++) {
                    if (productFunctionFilterWrapper.productFunctionFilters[i].productFunctionTypeId == targetProductFunctionTypeId) {
                        tarProductFunctionFilter = productFunctionFilterWrapper.productFunctionFilters[i]
                    }
                }
                if (tarProductFunctionFilter == null) {
                    return {...state}
                }
                for (let i = 0; i < tarProductFunctionFilter.productFunctionIdList.length; i++) {
                    if (tarProductFunctionFilter.productFunctionIdList[i] === targetProductFunctionId) {
                        tarProductFunctionFilter.productFunctionIdList.splice(i, 1);
                    }
                }

                //1-1.펑션 아이디 리스트 길이 0이면 펑션 타입아이디도 제거
                console.log("길이:" + tarProductFunctionFilter.productFunctionIdList.length)
                if (tarProductFunctionFilter.productFunctionIdList.length == 0) {
                    for (let i = 0; i < productFunctionFilterWrapper.productFunctionFilters.length; i++) {
                        if (productFunctionFilterWrapper.productFunctionFilters[i].productFunctionTypeId === targetProductFunctionTypeId) {
                            productFunctionFilterWrapper.productFunctionFilters.splice(i, 1);
                        }
                    }
                }

            } else {
                //체크를 이제 하는 상황

                //1.펑션 아이디 리스트에 추가
                var tarProductFunctionFilter = null
                for (let i = 0; i < productFunctionFilterWrapper.productFunctionFilters.length; i++) {
                    if (productFunctionFilterWrapper.productFunctionFilters[i].productFunctionTypeId == targetProductFunctionTypeId) {
                        tarProductFunctionFilter = productFunctionFilterWrapper.productFunctionFilters[i]
                    }
                }
                if (tarProductFunctionFilter == null) {
                    let isAndFilter = false
                    if (targetProductFunctionName.includes("부가")) {
                        isAndFilter = true
                    }
                    productFunctionFilterWrapper.productFunctionFilters.push(
                        {
                            productFunctionTypeId: targetProductFunctionTypeId,
                            productFunctionIdList: [targetProductFunctionId],
                            isAndFilter: isAndFilter
                        }
                    );
                } else {
                    tarProductFunctionFilter.productFunctionIdList.push(targetProductFunctionId)
                }

            }
            //2. 펑션래퍼 스트링 업데이트
            return {
                ...state,
                getHotDealRequest: {
                    ...state.getHotDealRequest,
                    filter: {
                        ...state.getHotDealRequest.filter,
                        productFunctionFiltersJsonString: JSON.stringify(state.productFunctionFilterWrapper)
                    }
                }
            }
        case SET_HIDE_RECOMMENDATION_HOT_DEAL:
            return {
                ...state,
                hideRecommendationHotDeal: action.isHide
            }
        default:
            return state
    }
}

export default hotDealReducer;