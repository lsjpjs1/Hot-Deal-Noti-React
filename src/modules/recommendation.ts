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
import {ClassifyHotDealRequest, GetProductsRequest, ProductDto, ProductInitData} from "../common/productDto";
import {classifyHotDeal, getProductInitData, getProducts} from "../api/productApi";
import {getRecommendations} from "../api/recommendationApi";
import RecommendationDto from "../common/recommendationDto";

const GET_RECOMMENDATIONS_SUCCESS = "GET_RECOMMENDATIONS_SUCCESS" as const;

export const getRecommendationsSuccess = (recommendations: RecommendationDto[]) => ({
    type: GET_RECOMMENDATIONS_SUCCESS,
    recommendations: recommendations
});


export const callGetRecommendations =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getRecommendations().then((res) => {
                dispatch(getRecommendationsSuccess(res.data.recommendations))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };


type ProductAction =
    | ReturnType<typeof getRecommendationsSuccess>

type ProductState = {
    recommendations: RecommendationDto[]
}

const initialState: ProductState = {
    recommendations: [],
}

function recommendationReducer(
    state: ProductState = initialState,
    action: ProductAction
) {
    switch (action.type) {
        case "GET_RECOMMENDATIONS_SUCCESS":
            return {
                ...state,
                recommendations: action.recommendations
            }
        default:
            return state
    }
}

export default recommendationReducer;