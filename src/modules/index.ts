import {combineReducers} from "redux";
import hotDealReducer from "./hotDeal";
import productReducer from "./product";

const rootReducer = combineReducers({
    hotDealReducer,
    productReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;