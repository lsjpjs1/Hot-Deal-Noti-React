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
import AddHotDealContainer from "./AddHotDealContainer";
import AddProductFamily from "../components/recommendation/manage/AddProductFamily";
import ProductToProductFamily from "../components/recommendation/manage/ProductToProductFamily";
import AddRecommendationProductFamily from "../components/recommendation/manage/AddRecommendationProductFamily";


const ManageRecommendationContainer = () => {

    const dispatch = useDispatch();



    useEffect(() => {
    }, []);




    return (
        <div style={{flexDirection:"row",display:"flex"}}>

            <AddProductFamily/>
            <ProductToProductFamily/>
            <AddRecommendationProductFamily/>
        </div>
    )
}

export default ManageRecommendationContainer;