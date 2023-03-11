import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import React, {useEffect} from "react";
import {
    callGetHotDeals,
    callGetHotDealsByHotDealId,
    callGetHotDealsByProductId,
    callGetInitData,
    callGetRecommendationHotDeals,
    callGetWeeklyPopularHotDeals,
    callPostConnectionHistory,
    callViewHotDeal,
    setIsShowReturnItem,
    setPage,
    setProductIdForSearch,
    setSearchBody
} from "../modules/hotDeal";
import '../App.css'
import HotDealListView from "../components/hotdeallist/HotDealListView";
import PageView from "../components/PageView";
import 'moment/locale/ko';
import {callGetProductInitData} from "../modules/product";
import {useParams} from "react-router";
import {Typography} from "@material-ui/core";
import ReactGA from "react-ga4";
import {HotDealPreview} from "../common/hotDealDto";
import mixpanel from "mixpanel-browser";
import {Link} from "react-router-dom";

const MainContainer = () => {

    const params = useParams();
    const PAGE_SIZE = 40;
    const dispatch = useDispatch();
    const hotDeals = useSelector((state: RootState) => state.hotDealReducer.hotDeals);
    const returnHotDeals = useSelector((state: RootState) => state.hotDealReducer.returnHotDeals);
    const recommendationHotDeals = useSelector((state: RootState) => state.hotDealReducer.recommendationHotDeals);
    const totalPages = useSelector((state: RootState) => state.hotDealReducer.totalPages);
    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);
    const initData = useSelector((state: RootState) => state.hotDealReducer.initData);
    const historicalLowPrice = useSelector((state: RootState) => state.hotDealReducer.historicalLowPrice);

    const choochoo = <img src={"/image/icon/filter.png"}></img>


    useEffect(() => {
        console.log(JSON.stringify({productFunctionFilters:[{productFunctionTypeId:1,productFunctionIdList:[1,14]}]}))
        // @ts-ignore
        dispatch(callPostConnectionHistory())
        // @ts-ignore
        dispatch(callGetInitData())

        // @ts-ignore
        dispatch(callGetProductInitData())

        if (params.hotDealId != null) {

            // @ts-ignore
            dispatch(callGetHotDealsByHotDealId(params.hotDealId))
        } else if (params.productId != null) {
            dispatch(setProductIdForSearch(Number.parseInt(params.productId)))
            // @ts-ignore
            dispatch(callGetHotDealsByProductId())
        } else {
            getHotDeals()
            // @ts-ignore
            dispatch(callGetRecommendationHotDeals())
            getReturnHotDeals()
        }
    }, []);


    const onPageChange = (page: { selected: number }) => {
        mixpanel.track(
            "pageChange",
            {
                "selectedPage": page.selected
            }
        );
        dispatch(setPage(page.selected))

        if(params.productId != null){
            // @ts-ignore
            dispatch(callGetHotDealsByProductId())
        }else{
            getHotDeals()
        }

        window.scrollTo(0, 0);
    }

    const getHotDeals = () => {
        // @ts-ignore
        dispatch(callGetHotDeals())
    }

    const getReturnHotDeals = () => {
        dispatch(setIsShowReturnItem(true))
        // @ts-ignore
        dispatch(callGetHotDeals())
    }

    const onSearch = (s: string) => {
        dispatch(setSearchBody(s))
        goFirstPage()
        getHotDeals()
    }

    const goFirstPage = () => {
        dispatch(setPage(0))
    }

    const onSearchTextChange = (s: string) => {
    }

    const hotDealLinkOnClick = (hotDealId: number) => {
        // @ts-ignore
        dispatch(callViewHotDeal({hotDealId: hotDealId}))
    }

    const shuffleHotDeals = (hotDeals: HotDealPreview[]) => {
        if (hotDeals.length < 5){
            return hotDeals
        }else{
            hotDeals.sort(()=> Math.random() - 0.5)
            return hotDeals.slice(0,4)
        }


    }



    const onClickWeeklyPopular = () => {
        ReactGA.event({
            category: "버튼",
            action: "이번 주 인기 상품 클릭",
            label: "이번 주 인기 상품 클릭",
        });
        goFirstPage()
        // @ts-ignore
        dispatch(callGetWeeklyPopularHotDeals())
    }

    const hotDealPageTitle = () => {
        if (params.productId != null){
            return "역대 특가 🕰"
        }else {
            return "실시간 특가"
        }
    }


    // @ts-ignore
    return (
        <div>
            {/*<CustomerRequirementInput></CustomerRequirementInput>*/}
            <div style={{textAlign: "center", marginBottom: "50px"}}>
                {/*<Button>*/}
                {/*    <img onClick={() => {*/}
                {/*        ReactGA.event({*/}
                {/*            category: "이미지 버튼",*/}
                {/*            action: "홈 이미지 클릭",*/}
                {/*            label: "홈 이미지 클릭",*/}
                {/*        });*/}
                {/*        window.location.replace("/")*/}
                {/*    }} style={{width: "300px", height: "200"}} src={require("../image/IMG_0385.PNG")}/>*/}
                {/*</Button>*/}
                {/*{initData != null &&*/}
                {/*    <div>*/}
                {/*        <a href={"https://bush-thorn-7ed.notion.site/77c65c69c1cf4176b313cd8b6eb7e3f2"}*/}
                {/*           target={"_blank"}*/}
                {/*           onClick={(e) => {*/}
                {/*               ReactGA.event({*/}
                {/*                   category: "버튼",*/}
                {/*                   action: "노션 공지사항 링크 클릭",*/}
                {/*                   label: "노션 공지사항 링크 클릭",*/}
                {/*               });*/}
                {/*           }*/}
                {/*           }*/}
                {/*           style={{*/}
                {/*               textDecoration: "none",*/}
                {/*               color: "blue",*/}
                {/*               marginTop: "10px",*/}
                {/*               marginBottom: "10px",*/}
                {/*               fontStyle: "normal",*/}
                {/*               fontSize: "20px"*/}
                {/*           }}>*/}
                {/*            (읽어주세요) 여기 써있는 특가랑 실제 가격이랑 다른데요?!*/}
                {/*        </a>*/}
                {/*        <Typography>{"공지사항: 특가 키워드 알림 앱이 출시되었습니다!"}</Typography>*/}
                {/*        <a href={"https://play.google.com/store/apps/details?id=com.hotdealnoti"}*/}
                {/*           onClick={(e) => {*/}
                {/*               ReactGA.event({*/}
                {/*                   category: "버튼",*/}
                {/*                   action: "안드로이드 앱 링크 클릭",*/}
                {/*                   label: "안드로이드 앱 링크 클릭",*/}
                {/*               });*/}
                {/*           }*/}
                {/*           }*/}
                {/*           target={"_blank"}>*/}
                {/*            안드로이드 링크*/}
                {/*        </a>*/}
                {/*        <Typography>{"최근 업데이트: " + moment(initData.recentUpdateTime, 'YYYYMMDDHHmmss z').add(9, "h").format('YYYY-MM-DD HH:mm:ss')}</Typography>*/}
                {/*    </div>*/}
                {/*}*/}

                {/*<Button variant={"contained"} color={"primary"} onClick={onClickWeeklyPopular}>🔥이번 주 인기 상품</Button>*/}
                {/*<div>*/}

                {/*    <SearchBar onSearch={onSearch} onSearchTextChange={onSearchTextChange}></SearchBar>*/}
                {/*    <HotDealSortingSelect onSelect={onHotDealSortingSelect}></HotDealSortingSelect>*/}
                {/*    <Container maxWidth={"sm"}>*/}
                {/*        <ProductPurposeSelect onSelect={onProductPurposeSelect}></ProductPurposeSelect>*/}
                {/*        <ManufacturerSelect onSelect={onManufacturerSelect}></ManufacturerSelect>*/}
                {/*        <SourceSiteCheckBoxGroup onCheckBoxClick={onCheckBoxClick}></SourceSiteCheckBoxGroup>*/}

                {/*    </Container>*/}
                {/*</div>*/}
                <Typography style={{fontWeight:"bold",marginTop:"10px"}}>
                   할인적용이 안되신다면 쇼핑몰 앱으로 접속해보세요!
                    {<br/>}
                    <a href={"https://bush-thorn-7ed.notion.site/77c65c69c1cf4176b313cd8b6eb7e3f2"}>표시된 금액과 가격이 달라요!</a> {<br/>}
                </Typography>
                {params.productId != null && hotDeals.length > 0 &&
                    <div>
                        <h1>
                            {hotDeals[0].modelName}
                            <br/>
                            {historicalLowPrice!=0?"역대 최저가 : " + historicalLowPrice.toLocaleString() + "원":""}
                        </h1>
                    </div>}
                {


                }
                {recommendationHotDeals.length>0&&getHotDealRequest.filter.searchBody==null&&
                <HotDealListView title={"추천 특가"} hotDeals={shuffleHotDeals(recommendationHotDeals)} hotDealLinkOnClick={hotDealLinkOnClick}
                    pageType={params.productId != null ? "PRODUCT" : ""}></HotDealListView>}
                {returnHotDeals.length>0&&
                <HotDealListView title={"반품 특가"} hotDeals={returnHotDeals.slice(0,4)} hotDealLinkOnClick={hotDealLinkOnClick}
                    pageType={params.productId != null ? "PRODUCT" : ""}></HotDealListView>}
                <HotDealListView title={hotDealPageTitle()} hotDeals={hotDeals} hotDealLinkOnClick={hotDealLinkOnClick}
                                 pageType={params.productId != null ? "PRODUCT" : ""}></HotDealListView>
                {hotDeals.length==0&&
                <div>
                    <Typography style={{ fontSize:"18px"}}>
                        원하시는 제품의 특가가 아직 없나요?<br/>
                        키워드 등록하고, 특가 알림을 받아보세요!
                    </Typography>
                    <div  onClick={()=>{
                        mixpanel.track(
                            "notificationPageClickInSearchResult"
                        );

                    }
                    }
                    >
                        <Link className={"header-manu-text"} to={"/notifications"} > 🔔 특가 알림 받기</Link>
                    </div>

                </div>
                }
                <PageView currentPage={getHotDealRequest.pageRequest.page} onPageChange={onPageChange}
                          totalPageCount={totalPages}></PageView>
                <p><b>Email : whendiscount@gmail.com</b><br/>
                    쿠팡 링크의 경우 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의 수수료를 제공받습니다.<br/>
                    그러나 여러분이 구매하시는 가격엔 아무런 영향이 없습니다.<br/>
                    이용 중 불편사항이나 문의사항은 메일주시면 감사드리겠습니다!<br/>
                </p>
            </div>
        </div>

    )
};

export default MainContainer;