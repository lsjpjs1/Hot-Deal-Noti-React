import {Typography} from "@material-ui/core";
import "./MainHeader.css"
import React from "react";
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import SearchBar from "../SearchBar";
import {useDispatch} from "react-redux";
import {callGetHotDeals, setPage, setSearchBody} from "../../modules/hotDeal";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {getFavoriteHotDeals} from "../../api/hotDealApi";
import {kakaoLogin} from "../../api/authApi";
import mixpanel from "mixpanel-browser";
const MainHeader = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();


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
        getHotDeals()
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
                    }} src={require("../../image/IMG_0385_2.png")}/>
                </div>

                <div className={"search-bar-container"}>
                    <SearchBar onSearch={onSearch} onSearchTextChange={(e)=>{}}/>
                </div>

                <div className={"header-manu-container"}>

                    <div id={"real-hot-deal-distinction-btn"}  onClick={()=>{
                        mixpanel.track(
                            "realHotDealDistinctionClick"
                        );
                        window.open("https://bush-thorn-7ed.notion.site/924639f9727e400ebb3eeed6c086d8d6", '_blank')
                    }
                    }
                    >
                        <Typography className={"header-manu-text"} > 찐 특가 구별법</Typography>
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
                        <Typography className={"header-manu-text"} > FAQ</Typography>
                    </div>

                    <div id={"star-btn"} >
                        <StarBorderRoundedIcon/>
                        <Link className={"header-manu-text"} to={"/favorite"} > 즐겨찾기</Link>
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