import {combineReducers} from "redux";
import hotDealReducer from "./hotDeal";
import productReducer from "./product";
import recommendationReducer from "./recommendation";
import keywordNotificationReducer from "./keywordNotification";

const rootReducer = combineReducers({
    hotDealReducer,
    productReducer,
    recommendationReducer,
    keywordNotificationReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;