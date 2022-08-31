import {HotDealPreview, HotDealsQueryFilter, NotClassifiedHotDeal} from "../common/hotDealDto";
import {
    getHotDeals,
    GetHotDealsRequest, getNotClassifiedHotDeals,
    getWeeklyPopularHotDeals,
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

const GET_HOT_DEALS_SUCCESS = "GET_HOT_DEALS_SUCCESS" as const;
const GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS = "GET_NOT_CLASSIFIED_HOT_DEALS_SUCCESS" as const;
const GET_INIT_DATA_SUCCESS = "GET_INIT_DATA_SUCCESS" as const;

const SET_SEARCH_BODY = 'SET_SEARCH_BODY' as const;
const SET_SORT = 'SET_SORT' as const;
const SET_PAGE = 'SET_PAGE' as const;
const SET_SOURCE_SITES = 'SET_SOURCE_SITES' as const;

export const getHotDealsSuccess = (hotDeals: HotDealPreview[], totalPages: number) => ({
    type: GET_HOT_DEALS_SUCCESS,
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


export const setSearchBody = (searchBody: string) => ({
    type: SET_SEARCH_BODY,
    searchBody: searchBody
});

export const setSort = (sort: string) => ({
    type: SET_SORT,
    sort: sort
});

export const setPage = (page: number) => ({
    type: SET_PAGE,
    page: page
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
    | ReturnType<typeof getNotClassifiedHotDealsSuccess>
    | ReturnType<typeof getInitDataSuccess>
    | ReturnType<typeof setSearchBody>
    | ReturnType<typeof setSort>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setSourceSites>

type HotDealState = {
    hotDeals: HotDealPreview[],
    notClassifiedHotDeals: NotClassifiedHotDeal[],
    initData:  InitData
    totalPages: number,
    getHotDealRequest: GetHotDealsRequest
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
            searchBody: null
        },
        sourceSitesMap: new Map<string, boolean>([
            ["11번가",false],
            ["G마켓",false],
            ["옥션",false],
            ["롯데ON",false]
            ]
        )
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
        default:
            return state
    }
}

export default hotDealReducer;