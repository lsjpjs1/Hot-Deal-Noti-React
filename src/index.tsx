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
import KaKaoOauthCallbackContainer from "./containers/KaKaoOauthCallbackContainer"; // GA4


const TRACKING_ID = process.env["REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID"]; // 발급받은 추적ID를 환경 변수로 불러온다.
ReactGA.initialize(TRACKING_ID); //new
ReactGA.send("pageview");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainContainer/>}/>
              {/*<Route path="/" element={<ServerMaintenanceContainer/>}/>*/}
              <Route path={"/oauth/callback/kakao"} element={<KaKaoOauthCallbackContainer/>} />
          </Routes>
      </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
