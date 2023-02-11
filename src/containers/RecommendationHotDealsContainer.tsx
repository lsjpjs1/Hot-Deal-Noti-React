import {useEffect} from "react";
import {useNavigate} from "react-router";
import {callGetRecommendationHotDeals, callViewHotDeal} from "../modules/hotDeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import HotDealListView from "../components/hotdeallist/HotDealListView";

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