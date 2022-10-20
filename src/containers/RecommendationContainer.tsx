import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import React, {useEffect} from "react";
import {
    callDeleteHotDeal,
    callGetInitData,
    callGetNotClassifiedHotDeals,
    callPostConnectionHistory,
    callPostHotDeal, setAddHotDealDiscountPrice,
    setAddHotDealLink,
    setAddHotDealOriginalPrice,
    setAddHotDealSite,
    setAddHotDealTitle
} from "../modules/hotDeal";
import NotClassifiedHotDealListView from "../components/classifyproduct/NotClassifiedHotDealListView";
import {callGetProductInitData, callGetProducts} from "../modules/product";
import {Button, TextField} from "@material-ui/core";
import {callGetRecommendations} from "../modules/recommendation";
import RecommendationListView from "../components/recommendation/RecommendationListView";


const RecommendationContainer = () => {

    const dispatch = useDispatch();



    useEffect(() => {
    }, []);




    return (
        <div>
            <RecommendationListView/>
        </div>
    )
}

export default RecommendationContainer;