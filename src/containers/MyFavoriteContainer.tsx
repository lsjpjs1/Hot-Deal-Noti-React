import MainHeader from "../components/header/MainHeader";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import {useEffect} from "react";
import {kakaoLogin} from "../api/authApi";
import {useNavigate} from "react-router";
import {callGetFavoriteHotDeals, callViewHotDeal} from "../modules/hotDeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import HotDealListView from "../components/HotDealListView";

const MyFavoriteContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hotDeals = useSelector((state: RootState) => state.hotDealReducer.hotDeals);

    useEffect(() => {
        if (localStorage.getItem("authToken")==null){
            navigate("/login")
        }else{
            // @ts-ignore
            dispatch(callGetFavoriteHotDeals())
        }


    },[])

    const hotDealLinkOnClick = (hotDealId: number) => {
        // @ts-ignore
        dispatch(callViewHotDeal({hotDealId: hotDealId}))
    }
    return(
        <div>
            <MainHeader/>
            <HotDealListView title={"★ 즐겨찾기"} hotDeals={hotDeals} hotDealLinkOnClick={hotDealLinkOnClick} pageType={"FAVORITE"}/>


        </div>
    )
}

export default MyFavoriteContainer