import {combineReducers} from "redux";
import hotDealReducer from "./hotDeal";

const rootReducer = combineReducers({
    hotDealReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;