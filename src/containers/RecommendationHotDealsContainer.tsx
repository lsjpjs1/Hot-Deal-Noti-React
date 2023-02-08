import MainHeader from "../components/header/MainHeader";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import {useEffect} from "react";
import {kakaoLogin} from "../api/authApi";
import {useNavigate} from "react-router";
import {
    callGetFavoriteHotDeals,
    callGetHotDealsByHotDealId, callGetHotDealsByProductId,
    callGetInitData, callGetRecommendationHotDeals,
    callPostConnectionHistory,
    callViewHotDeal, setProductIdForSearch
} from "../modules/hotDeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import HotDealListView from "../components/hotdeallist/HotDealListView";
import {callGetProductInitData} from "../modules/product";

const RecommendationHotDealsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const recommendationHotDeals = useSelector((state: RootState) => state.hotDealReducer.recommendationHotDeals);

    useEffect(() => {



            // @ts-ignore
            dispatch(callGetRecommendationHotDeals())

    }, []);


    const hotDealLinkOnClick = (hotDealId: number) => {
        // @ts-ignore
        dispatch(callViewHotDeal({hotDealId: hotDealId}))
    }
    return(
        <div>
            <HotDealListView title={"추천 특가 👍"} hotDeals={recommendationHotDeals} hotDealLinkOnClick={hotDealLinkOnClick} pageType={""}/>


        </div>
    )
}

export default RecommendationHotDealsContainer