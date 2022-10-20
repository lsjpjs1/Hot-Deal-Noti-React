import {combineReducers} from "redux";
import hotDealReducer from "./hotDeal";
import productReducer from "./product";
import recommendationReducer from "./recommendation";

const rootReducer = combineReducers({
    hotDealReducer,
    productReducer,
    recommendationReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;