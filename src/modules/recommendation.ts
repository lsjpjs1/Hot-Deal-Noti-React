import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
import {getRecommendations, postProductFamily} from "../api/recommendationApi";
import RecommendationDto, {PostProductFamilyRequest} from "../common/recommendationDto";

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

export const callPostProductFamily =
    (postProductFamilyRequest: PostProductFamilyRequest): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await postProductFamily(postProductFamilyRequest).then((res) => {

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