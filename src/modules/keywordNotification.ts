import {AnyAction} from "redux";
import {RootState} from "./index";
import {ThunkAction} from "redux-thunk";
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