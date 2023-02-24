import {Typography} from "@material-ui/core";
import "./MainHeader.css"
import React from "react";
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import SearchBar from "../SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {callGetHotDeals, setIsShowReturnItem, setPage, setSearchBody} from "../../modules/hotDeal";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import mixpanel from "mixpanel-browser";
import {RootState} from "../../modules";
import {RETURN_ITEM_SEARCH_MODE} from "../../containers/ReturnHotDealsContainer";
import FilterListIcon from '@material-ui/icons/FilterList';

const MainHeader = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const searchMode = useSelector((state: RootState) => state.hotDealReducer.searchMode);

    const getHotDeals = () => {
        // @ts-ignore
        dispatch(callGetHotDeals())
    }

    const goFirstPage = () => {
        dispatch(setPage(0))
    }

    const onSearch = (s: string) => {
        mixpanel.track(
            "search",
            {"searchBody": s}
        );
        dispatch(setSearchBody(s))
        goFirstPage()
        if (searchMode==RETURN_ITEM_SEARCH_MODE){
            getReturnHotDeals()
        }else {
            getHotDeals()
        }
    }

    const getReturnHotDeals = () => {
        dispatch(setIsShowReturnItem(true))
        // @ts-ignore
        dispatch(callGetHotDeals(true))
    }

    const logout = () => {
        mixpanel.track(
            "logoutButtonClick"
        );
        localStorage.removeItem("authToken")
        window.location.reload()
    }

    mixpanel.track_links("#star-btn .header-manu-text", "starButtonClick");
    mixpanel.track_links("#login-btn a.header-manu-text", "loginButtonClick");


    return(
        <div className={"shadow"}>
            <div className={"main-header-container"}>
                <div className={"logo-image-container"}>
                    <img className={"logo-image"} onClick={() => {
                        mixpanel.track(
                            "logoButtonClick",
                            {"currentPage": window.location.href}
                        );
                        window.location.href = "/"
                    }} src={"/image/IMG_0385_2.png"} />
                </div>

                <div className={"search-bar-container"}>
                    <SearchBar onSearch={onSearch} onSearchTextChange={(e)=>{}}/>
                </div>

                <div className={"header-manu-container"}>

                    <div id={"notification-btn"}  onClick={()=>{
                        mixpanel.track(
                            "notificationPageClick"
                        );

                    }
                    }
                    >

                    <img className={"naver-logo-image"} src={"/image/icon/alarm.png"}/>
                    <Link className={"header-manu-text"} to={"/notifications"} >특가 알림</Link>
                    </div>

                    <div id={"real-hot-deal-distinction-btn"}  onClick={()=>{
                        mixpanel.track(
                            "realHotDealDistinctionClick"
                        );
                        window.open("https://bush-thorn-7ed.notion.site/924639f9727e400ebb3eeed6c086d8d6", '_blank')
                    }
                    }
                    >
                        <img className={"naver-logo-image"} src={"/image/icon/check.png"}/>
                        <Typography className={"header-manu-text"} >찐 특가 구별법</Typography>
                    </div>

                    <div id={"faq-btn"}  onClick={()=>{
                        mixpanel.track(
                            "faqClick"
                        );
                        window.open("https://bush-thorn-7ed.notion.site/77c65c69c1cf4176b313cd8b6eb7e3f2", '_blank')
                    }
                    }
                    >
                        <HelpOutlineRoundedIcon/>
                        <Typography className={"header-manu-text"} >FAQ</Typography>
                    </div>

                    <div id={"star-btn"} >
                        <StarBorderRoundedIcon/>
                        <Link className={"header-manu-text"} to={"/favorite"} >즐겨찾기</Link>
                    </div>

                    {localStorage.getItem("authToken")?
                        <div id={"login-btn"}>
                            <Typography className={"header-manu-text"}
                                        onClick={logout}
                            > 로그아웃</Typography>
                        </div>
                        :
                        <div id={"login-btn"}>
                            <Link className={"header-manu-text"} to={"/login"} > 로그인</Link>
                        </div>
                    }


                </div>


            </div>
        </div>
        )
}

export default MainHeader