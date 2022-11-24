import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {
    callGetHotDeals,
    callGetHotDealsByHotDealId,
    callGetHotDealsByProductId,
    callGetInitData,
    callGetWeeklyPopularHotDeals,
    callPostConnectionHistory,
    callViewHotDeal,
    setManufacturerId,
    setPage,
    setProductIdForSearch,
    setProductPurposeId,
    setSearchBody,
    setSort,
    setSourceSites
} from "../modules/hotDeal";
import '../App.css'
import HotDealListView from "../components/HotDealListView";
import PageView from "../components/PageView";
import SearchBar from "../components/SearchBar";
import Button from "@material-ui/core/Button";
import HotDealSortingSelect from "../components/HotDealSortingSelect";
import moment from 'moment';
import 'moment/locale/ko';
import SourceSiteCheckBoxGroup from "../components/SourceSiteCheckBoxGroup";
import ProductPurposeSelect from "../components/ProductPurposeSelect";
import {callGetProductInitData} from "../modules/product";
import ManufacturerSelect from "../components/ManufacturerSelect";
import {Container} from "@mui/material";
import CustomerRequirementInput from "../components/CustomerRequirementInput";
import {useParams} from "react-router";
import {Typography} from "@material-ui/core";
import ReactGA from "react-ga4";
import MainHeader from "../components/header/MainHeader";

const MainContainer = () => {

    const params = useParams();
    const PAGE_SIZE = 40;
    const dispatch = useDispatch();
    const hotDeals = useSelector((state: RootState) => state.hotDealReducer.hotDeals);
    const totalPages = useSelector((state: RootState) => state.hotDealReducer.totalPages);
    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);
    const initData = useSelector((state: RootState) => state.hotDealReducer.initData);


    useEffect(() => {

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
        }
    }, []);


    const onPageChange = (page: { selected: number }) => {
        dispatch(setPage(page.selected))
        getHotDeals()
        window.scrollTo(0, 0);
    }

    const getHotDeals = () => {
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
            return "실시간 특가 🔥"
        }
    }


    // @ts-ignore
    return (
        <div>
            <MainHeader/>
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
                {params.productId != null && hotDeals.length > 0 &&
                    <div>
                        <h1>
                            {hotDeals[0].modelName}
                            <br/>
                            {"역대 최저가 : " + Math.min(...hotDeals.map((hotdeal) => hotdeal.discountPrice)).toLocaleString() + "원"}
                        </h1>
                    </div>}

                <HotDealListView title={hotDealPageTitle()} hotDeals={hotDeals} hotDealLinkOnClick={hotDealLinkOnClick}
                                 pageType={params.productId != null ? "PRODUCT" : ""}></HotDealListView>
                <PageView currentPage={getHotDealRequest.pageRequest.page} onPageChange={onPageChange}
                          totalPageCount={totalPages}></PageView>
                <p><b>Email : whendiscount@gmail.com</b><br/>
                    이용 중 불편사항이나 문의사항은 메일주시면 감사드리겠습니다!
                </p>
            </div>
        </div>

    )
};

export default MainContainer;