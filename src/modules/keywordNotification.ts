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
import {getRecommendations, postProductFamily} from "../api/recommendationApi";
import RecommendationDto, {PostProductFamilyRequest} from "../common/recommendationDto";
import {KeywordNotification, NotificationKeyword} from "../common/notificationDto";
import {getKeywords, getNotifications} from "../api/notificationApi";

const GET_KEYWORD_NOTIFICATIONS_SUCCESS = "GET_KEYWORD_NOTIFICATIONS_SUCCESS" as const;
const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS" as const;

export const getKeywordNotificationsSuccess = (keywordNotifications: NotificationKeyword[]) => ({
    type: GET_KEYWORD_NOTIFICATIONS_SUCCESS,
    keywordNotifications: keywordNotifications
});
export const getNotificationsSuccess = (notifications: KeywordNotification[]) => ({
    type: GET_NOTIFICATIONS_SUCCESS,
    notifications: notifications
});


export const callGetNotificationKeywords =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getKeywords().then((res) => {
                dispatch(getKeywordNotificationsSuccess(res.data.keywords))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };

export const callGetNotifications =
    (): ThunkAction<void, RootState, unknown, AnyAction> =>
        async (dispatch, getState) => {
            await getNotifications().then((res) => {
                dispatch(getNotificationsSuccess(res.data.content))
            }).catch((error) => {
                console.log(error.response.data)
            })
        };


type KeywordNotificationAction =
    | ReturnType<typeof getKeywordNotificationsSuccess>
    | ReturnType<typeof getNotificationsSuccess>

type KeywordNotificationState = {
    notificationKeywords: NotificationKeyword[],
    notifications: KeywordNotification[]
}

const initialState: KeywordNotificationState = {
    notificationKeywords: [],
    notifications: []
}

function keywordNotificationReducer(
    state: KeywordNotificationState = initialState,
    action: KeywordNotificationAction
) {
    switch (action.type) {
        case "GET_KEYWORD_NOTIFICATIONS_SUCCESS":
            return {
                ...state,
                notificationKeywords: action.keywordNotifications
            }
        case "GET_NOTIFICATIONS_SUCCESS":
            return {
                ...state,
                notifications: action.notifications
            }
        default:
            return state
    }
}

export default keywordNotificationReducer;