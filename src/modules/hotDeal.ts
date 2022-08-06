import {HotDealPreview, HotDealsQueryFilter} from "../common/hotDealDto";
import {getHotDeals, GetHotDealsRequest, viewHotDeal, ViewHotDealRequest} from "../api/hotDealApi";
import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
import {Page, PageRequest} from "../common/page";
import exp from "constants";
import {postConnectionHistory} from "../api/connectionHistoryApi";
import SortingType from "../enum/SortingType";

const GET_HOT_DEALS_SUCCESS = "GET_HOT_DEALS_SUCCESS" as const;

const SET_SEARCH_BODY = 'SET_SEARCH_BODY' as const;
const SET_SORT = 'SET_SORT' as const;
const SET_PAGE = 'SET_PAGE' as const;

export const getHotDealsSuccess = (hotDeals: HotDealPreview[], totalPages: number) => ({
    type: GET_HOT_DEALS_SUCCESS,
    hotDeals: hotDeals,
    totalPages: totalPages
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
    | ReturnType<typeof setSearchBody>
    | ReturnType<typeof setSort>
    | ReturnType<typeof setPage>

type HotDealState = {
    hotDeals: HotDealPreview[],
    totalPages: number,
    getHotDealRequest: GetHotDealsRequest
}

const initialState: HotDealState = {
    hotDeals: [],
    totalPages: 0,
    getHotDealRequest: {
        pageRequest: {
            page: 0,
            sort: SortingType.DISCOUNT_RATE_DESC,
            size: 40
        },
        filter: {
            searchBody: null
        }
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
        default:
            return state
    }
}

export default hotDealReducer;