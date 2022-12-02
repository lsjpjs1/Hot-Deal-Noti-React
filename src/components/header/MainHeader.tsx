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
        dispatch(setSearchBody(s))
        goFirstPage()
        getHotDeals()
    }

    const logout = () => {
        localStorage.removeItem("authToken")
        window.location.reload()
    }



    return(
        <div className={"shadow"}>
            <div className={"main-header-container"}>
                <div className={"logo-image-container"}>
                    <img className={"logo-image"} onClick={() => {
                        window.location.href = "/"
                    }} src={require("../../image/IMG_0385_2.png")}/>
                </div>

                <div className={"search-bar-container"}>
                    <SearchBar onSearch={onSearch} onSearchTextChange={(e)=>{}}/>
                </div>

                <div className={"header-manu-container"}>

                    <div id={"faq-btn"}  onClick={()=>{window.open("https://bush-thorn-7ed.notion.site/77c65c69c1cf4176b313cd8b6eb7e3f2", '_blank')}}>
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