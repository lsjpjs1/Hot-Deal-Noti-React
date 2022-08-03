import {HotDealPreview, HotDealsQueryFilter} from "../common/hotDealDto";
import {getHotDeals, GetHotDealsRequest, viewHotDeal, ViewHotDealRequest} from "../api/hotDealApi";
import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
import {Page} from "../common/page";
import exp from "constants";
import {postConnectionHistory} from "../api/connectionHistoryApi";

const GET_HOT_DEALS_SUCCESS = "GET_HOT_DEALS_SUCCESS" as const;

const SET_SEARCH_BODY = 'SET_SEARCH_BODY' as const;

export const getHotDealsSuccess = (hotDeals: HotDealPreview[],totalPages: number) => ({
    type: GET_HOT_DEALS_SUCCESS,
    hotDeals: hotDeals,
    totalPages: totalPages
});


export const setSearchBody = (searchBody : string) => ({
    type: SET_SEARCH_BODY,
    searchBody: searchBody
});


export const callGetHotDeals =
    (getHotDealsRequest:GetHotDealsRequest): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch,getState) => {
            await getHotDeals(getHotDealsRequest).then((res)=>{
                const page:Page<HotDealPreview> = res.data
                dispatch(getHotDealsSuccess(page.content,page.totalPages))
            }).catch((error)=>{
                console.log(error.response.data)
            })
        };

export const callViewHotDeal =
    (viewHotDealRequest: ViewHotDealRequest): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch,getState) => {
            await viewHotDeal(viewHotDealRequest).then((res)=>{

            }).catch((error)=>{
                console.log(error.response.data)
            })
        };

export const callPostConnectionHistory =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch,getState) => {
            await postConnectionHistory().then((res)=>{

            }).catch((error)=>{
                console.log(error.response.data)
            })
        };

type HotDealAction =
    | ReturnType<typeof getHotDealsSuccess>
    | ReturnType<typeof setSearchBody>

type HotDealState = {
    hotDeals: HotDealPreview[],
    totalPages: number,
    filter: HotDealsQueryFilter
}

const initialState: HotDealState = {
    hotDeals: [],
    totalPages: 0,
    filter: {searchBody:null}
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
                filter:{
                    ...state.filter,
                    searchBody:action.searchBody
                }
            }
        default:
            return state
    }
}

export default hotDealReducer;