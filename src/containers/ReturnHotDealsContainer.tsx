import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {callGetHotDeals, callViewHotDeal, setIsShowReturnItem, setPage, setSearchMode} from "../modules/hotDeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import HotDealListView from "../components/hotdeallist/HotDealListView";
import PageView from "../components/PageView";
import mixpanel from "mixpanel-browser";

export const RETURN_ITEM_SEARCH_MODE = "RETURN_ITEM"
const RecommendationHotDealsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const returnHotDeals = useSelector((state: RootState) => state.hotDealReducer.returnHotDeals);
    const totalPages = useSelector((state: RootState) => state.hotDealReducer.totalPages);
    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);

    useEffect(() => {


        dispatch(setSearchMode(RETURN_ITEM_SEARCH_MODE))
        getReturnHotDeals()

    }, []);

    const onPageChange = (page: { selected: number }) => {
        mixpanel.track(
            "pageChangeReturnItem",
            {
                "selectedPage": page.selected
            }
        );
        dispatch(setPage(page.selected))
        getReturnHotDeals()
        window.scrollTo(0, 0);
    }

    const getReturnHotDeals = () => {
        dispatch(setIsShowReturnItem(true))
        // @ts-ignore
        dispatch(callGetHotDeals(true))
    }

    const hotDealLinkOnClick = (hotDealId: number) => {
        // @ts-ignore
        dispatch(callViewHotDeal({hotDealId: hotDealId}))
    }
    return(
        <div  style={{textAlign: "center", marginBottom: "50px"}}>
            <HotDealListView title={"반품 특가"} hotDeals={returnHotDeals} hotDealLinkOnClick={hotDealLinkOnClick} pageType={""}/>

            <PageView currentPage={getHotDealRequest.pageRequest.page} onPageChange={onPageChange}
                      totalPageCount={totalPages}></PageView>
            <p><b>Email : whendiscount@gmail.com</b><br/>
                쿠팡 링크의 경우 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의 수수료를 제공받습니다.<br/>
                그러나 여러분이 구매하시는 가격엔 아무런 영향이 없습니다.<br/>
                이용 중 불편사항이나 문의사항은 메일주시면 감사드리겠습니다!<br/>
            </p>
        </div>
    )
}

export default RecommendationHotDealsContainer