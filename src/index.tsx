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
          </Routes>
      </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
