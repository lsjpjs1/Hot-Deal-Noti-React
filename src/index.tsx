import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainContainer from "./containers/MainContainer";
import ServerMaintenanceContainer from "./containers/ServerMaintenanceContainer";
import ReactGA from 'react-ga4';
import HotDealClassifyContainer from "./containers/HotDealClassifyContainer";
import ManageHotDealsContainer from "./containers/ManageHotDealsContainer";
import AddHotDealContainer from "./containers/AddHotDealContainer";
import RecommendationContainer from "./containers/RecommendationContainer";
import ManageRecommendationContainer from "./containers/ManageRecommendationContainer";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import LoginContainer from "./containers/LoginContainer";
import KaKaoOauthCallbackContainer from "./components/login/KaKaoOauthCallbackContainer";
import MyFavoriteContainer from "./containers/MyFavoriteContainer"; // GA4
import mixpanel from 'mixpanel-browser';
import ProductClassifyContainer from "./containers/ProductClassifyContainer";

const TRACKING_ID = process.env["REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID"]; // 발급받은 추적ID를 환경 변수로 불러온다.
ReactGA.initialize(TRACKING_ID); //new
ReactGA.send("pageview");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export const store = createStore(rootReducer, applyMiddleware(thunk));

const THEME = createMuiTheme({
    typography: {
        fontFamily: "line"
    }
});

//mixpanel setup
const mixpanelProjectToken = process.env["REACT_APP_MIXPANEL_PROJECT_TOKEN"];
mixpanel.init(mixpanelProjectToken);
mixpanel.people.set_once({
    "firstView": new Date().toISOString()
});
mixpanel.people.set({
    "lastView": new Date().toISOString()
});

root.render(
    <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainContainer/>}/>
                    <Route path='/hot-deals/:hotDealId' element={<MainContainer/>} />
                    <Route path='/hot-deals/product/:productId' element={<MainContainer/>} />
                    <Route path='/login' element={<LoginContainer/>} />
                    <Route path='/favorite' element={<MyFavoriteContainer/>} />
                    <Route path={"/oauth/callback/kakao"} element={<KaKaoOauthCallbackContainer/>} />
                    <Route path='/recommendation' element={<RecommendationContainer/>} />


                    <Route path='/hoon/recommendation' element={<ManageRecommendationContainer/>} />
                    <Route path="/hoon/980320" element={<HotDealClassifyContainer/>}/>
                    <Route path="/hoon/980320/product-classify" element={<ProductClassifyContainer/>}/>
                    <Route path="/hoon/980320/manage" element={<ManageHotDealsContainer/>}/>
                    <Route path="/hoon/980320/add" element={<AddHotDealContainer/>}/>

                    {/*<Route path="/" element={<ServerMaintenanceContainer/>}/>*/}
                </Routes>
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
