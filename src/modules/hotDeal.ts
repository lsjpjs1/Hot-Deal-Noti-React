import {HotDealPreview} from "../common/hotDealDto";
import {getHotDeals, GetHotDealsRequest} from "../api/hotDealApi";
import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
import {Page} from "../common/page";
import exp from "constants";

const GET_HOT_DEALS_SUCCESS = "GET_HOT_DEALS_SUCCESS" as const;

export const getHotDealsSuccess = (hotDeals: HotDealPreview[],totalPages: number) => ({
    type: GET_HOT_DEALS_SUCCESS,
    hotDeals: hotDeals,
    totalPages: totalPages
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

type HotDealAction =
    | ReturnType<typeof getHotDealsSuccess>

type HotDealState = {
    hotDeals: HotDealPreview[],
    totalPages: number
}

const initialState: HotDealState = {
    hotDeals: [],
    totalPages: 0
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
        default:
            return state
    }
}

export default hotDealReducer;