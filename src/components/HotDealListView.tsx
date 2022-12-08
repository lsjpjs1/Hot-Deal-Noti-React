import {HotDealPreview} from "../common/hotDealDto";
import moment from "moment";
import {
    callGetHotDealsByHotDealId,
    callGetHotDealsByProductId,
    callGetInitData,
    callPostConnectionHistory, callPostFavoriteHotDeal,
    setProductIdForSearch
} from "../modules/hotDeal";
import {useDispatch} from "react-redux";
import {Button, Chip, Grid, Typography} from "@material-ui/core";
import {SvgIcon} from "@mui/material";
import React, {useEffect} from "react";
import {callGetProductInitData} from "../modules/product";
import ReactGA from "react-ga4";
import IconButton from "@material-ui/core/IconButton";
import {deleteFavoriteHotDeal} from "../api/hotDealApi";
import {useNavigate} from "react-router";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import "./HotDealListView.css"
import mixpanel from "mixpanel-browser";

moment.locale("ko");

type Props = {
    hotDeals: HotDealPreview[],
    hotDealLinkOnClick: (hotDealId: number) => void,
    pageType: string,
    title: string
}

const HotDealListView = (props: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    if (props.pageType == "PRODUCT") {
        const htmlTitle = document.querySelector("title");
        htmlTitle.innerHTML = props.hotDeals.length > 0 ? props.hotDeals[0].modelName + " 특가 목록 | 역대가 " + Math.min(...props.hotDeals.map((hotdeal) => hotdeal.discountPrice)).toLocaleString() + "원" + " | 진짜 최저가 | 노트북 특가 | 특가 어디가" : htmlTitle.innerHTML;
    }

    const title = () => {

        if (props.title != "") {
            return (
                <Typography style={{
                    textAlign: "left",
                    marginLeft: "100px",
                    marginTop: "30px",
                    fontSize: "30px",
                    fontWeight: "bold",
                    marginBottom: "30px"
                }}>
                    {props.title}
                </Typography>
            )
        } else {
            return (
                <div></div>
            )
        }

    }

    const hotDealElements = props.hotDeals.map((hotDeal) => {

        return (
            <Grid item={true} spacing={5} style={{
                marginBottom: "30px", marginTop: "30px",
                width: "300px"
            }} key={hotDeal.hotDealId}>
                <div>
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between", marginInline: "40px"}}>
                            <Typography style={{
                                display: 'inline-block',
                                fontSize: "14px",
                                color: "rgba(17,17,17,0.68)",
                                whiteSpace: "nowrap"
                            }}>{moment(hotDeal.uploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}</Typography>
                            <div style={{
                                display: 'inline-flex',
                                justifyContent: "center",
                                alignItems: "center",
                                color: "rgba(17,17,17,0.68)",
                            }}>
                                <VisibilityOutlinedIcon style={{
                                    width: 15,
                                    height: 15,
                                    verticalAlign: "middle"
                                }}/>
                                <Typography>
                                    &nbsp;&nbsp;{hotDeal.viewCount}
                                </Typography>

                            </div>
                        </div>
                        {props.pageType != "FAVORITE" &&
                            <IconButton style={{color: "black", width: 3, height: 3, marginRight: "5px"}}
                                        onClick={() => {
                                            mixpanel.track(
                                                "postStarButtonClick",
                                                {
                                                    "hotDealId": hotDeal.hotDealId,
                                                    "hotDealTitle": hotDeal.title,
                                                    "productId": hotDeal.productId,
                                                    "productName": hotDeal.modelName,
                                                    "discountRate": hotDeal.discountRate,
                                                    "originalPrice": hotDeal.originalPrice,
                                                    "discountPrice": hotDeal.discountPrice
                                                }
                                            );
                                            if (localStorage.getItem("authToken") == null) {
                                                navigate("/login")
                                            } else {
                                                // @ts-ignore
                                                dispatch(callPostFavoriteHotDeal(hotDeal.hotDealId))
                                                alert("즐겨찾기에 추가되었습니다.")
                                            }
                                        }}>
                                <StarBorderRoundedIcon/>
                            </IconButton>}

                        {props.pageType == "FAVORITE" &&
                            <IconButton style={{color: "black", width: 3, height: 3, marginRight: "5px"}}
                                        onClick={() => {
                                            mixpanel.track(
                                                "deleteStarButtonClick",
                                                {
                                                    "hotDealId": hotDeal.hotDealId,
                                                    "hotDealTitle": hotDeal.title,
                                                    "productId": hotDeal.productId,
                                                    "productName": hotDeal.modelName,
                                                    "discountRate": hotDeal.discountRate,
                                                    "originalPrice": hotDeal.originalPrice,
                                                    "discountPrice": hotDeal.discountPrice
                                                }
                                            );
                                            if (localStorage.getItem("authToken") == null) {
                                                navigate("/login")
                                            } else {
                                                deleteFavoriteHotDeal(hotDeal.hotDealId)
                                                window.location.reload()
                                            }
                                        }}>
                                <CloseRoundedIcon/>
                            </IconButton>}
                        {/*@ts-ignore*/}
                        <Chip
                            className={"model-name-button"}
                            label={hotDeal.modelName}
                            onClick={() => {
                                mixpanel.track(
                                    "showProductPriceHistoryButtonClick",
                                    {
                                        "hotDealId": hotDeal.hotDealId,
                                        "hotDealTitle": hotDeal.title,
                                        "productId": hotDeal.productId,
                                        "productName": hotDeal.modelName,
                                        "discountRate": hotDeal.discountRate,
                                        "originalPrice": hotDeal.originalPrice,
                                        "discountPrice": hotDeal.discountPrice
                                    }
                                );
                                ReactGA.event({
                                    category: "버튼",
                                    action: "모델 역대가 조회",
                                    label: hotDeal.productId + "-" + hotDeal.modelName,
                                });
                                window.open(`/hot-deals/product/${hotDeal.productId}`, '_blank')
                            }}>
                        </Chip>

                        <IconButton onClick={() => {
                            mixpanel.track(
                                "naverShoppingLinkClick",
                                {
                                    "hotDealId": hotDeal.hotDealId,
                                    "hotDealTitle": hotDeal.title,
                                    "productId": hotDeal.productId,
                                    "productName": hotDeal.modelName,
                                    "discountRate": hotDeal.discountRate,
                                    "originalPrice": hotDeal.originalPrice,
                                    "discountPrice": hotDeal.discountPrice
                                }
                            );
                            window.open(`https://search.shopping.naver.com/search/all?query=${hotDeal.modelName}`, '_blank')
                        }}
                        >
                            <img style={{width: "25px", cursor: "pointer", borderRadius: "4px"}}
                                 src={require("../image/naver_logo.png")}
                                 onClick={e => {
                                 }}
                            />
                        </IconButton>

                        {/*<IconButton>*/}
                        {/*    <SvgIcon color={"primary"}*/}
                        {/*             onClick={async (e) => {*/}
                        {/*                 mixpanel.track(*/}
                        {/*                     "copyProductNameButtonClick",*/}
                        {/*                     {*/}
                        {/*                         "hotDealId": hotDeal.hotDealId,*/}
                        {/*                         "hotDealTitle": hotDeal.title,*/}
                        {/*                         "productId": hotDeal.productId,*/}
                        {/*                         "productName": hotDeal.modelName*/}
                        {/*                     }*/}
                        {/*                 );*/}
                        {/*                 ReactGA.event({*/}
                        {/*                     category: "버튼",*/}
                        {/*                     action: "모델명 복사",*/}
                        {/*                     label: hotDeal.productId + "-" + hotDeal.modelName,*/}
                        {/*                 });*/}

                        {/*                 const $textarea = document.createElement('textarea');*/}
                        {/*                 document.body.appendChild($textarea);*/}
                        {/*                 // 2. props로 받은 text값을 textarea의 value로 대입하고 textarea 영역 내 모든 텍스트를 선택(드래그효과)*/}
                        {/*                 $textarea.value = hotDeal.modelName;*/}
                        {/*                 $textarea.select();*/}
                        {/*                 // 3. execCommand 함수를 이용해 클립보드에 복사*/}
                        {/*                 document.execCommand('copy');*/}
                        {/*                 // 4. 임시 textarea 요소 제거*/}
                        {/*                 document.body.removeChild($textarea);*/}
                        {/*                 alert('모델명이 복사되었습니다.');*/}
                        {/*             }}>*/}
                        {/*        <path*/}
                        {/*            d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z"/>*/}
                        {/*    </SvgIcon>*/}
                        {/*</IconButton>*/}


                        {/*{hotDeal.productId != 1 && <div>*/}
                        {/*    <Typography style={{display: 'inline-block'}}>{hotDeal.manufacturer}</Typography>*/}
                        {/*    <Typography style={{*/}
                        {/*        display: 'inline-block',*/}
                        {/*        marginLeft: '10px'*/}
                        {/*    }}>{hotDeal.productPurpose}</Typography>*/}
                        {/*</div>}*/}

                    </div>

                    <div className={"hot-deal-clickable-container"}
                         style={{cursor: "pointer"}}
                         onClick={(e) => {
                             mixpanel.track(
                                 "hotDealLinkClick",
                                 {
                                     "hotDealId": hotDeal.hotDealId,
                                     "hotDealTitle": hotDeal.title,
                                     "productId": hotDeal.productId,
                                     "productName": hotDeal.modelName,
                                     "discountRate": hotDeal.discountRate,
                                     "originalPrice": hotDeal.originalPrice,
                                     "discountPrice": hotDeal.discountPrice
                                 }
                             );
                             window.open(hotDeal.link, '_blank')
                             props.hotDealLinkOnClick(hotDeal.hotDealId)
                             ReactGA.event({
                                 category: "버튼",
                                 action: "특가 링크로 이동",
                                 label: hotDeal.hotDealId + "-" + hotDeal.modelName + "-" + hotDeal.title,
                             });
                         }}>
                        {hotDeal.hotDealThumbnailUrl != "" &&
                            <div>
                                <img
                                    // style={{border:"1px solid transparent",borderRadius: "10px",
                                    //     borderImage: "linear-gradient(#8CD1C8, #8CD1C8), linear-gradient(#8ACFC6, #6DB8B6,#58A8AB,#4C9EA4, #489BA2)",
                                    //     backgroundOrigin: "border-box",
                                    // backgroundClip: "content-box, border-box"}}
                                    src={hotDeal.hotDealThumbnailUrl} width={230} height={230}/><br/>
                            </div>}
                        {/*<Typography style={{display: 'inline-block'}}>{hotDeal.sourceSite}</Typography>*/}

                        {/*<Typography*/}
                        {/*    style={{display: 'inline-block', marginLeft: '10px'}}>{"조회: " + hotDeal.viewCount}</Typography>*/}

                        {/*{Math.min(...props.hotDeals.map((hotdeal)=>hotdeal.discountPrice))==hotDeal.discountPrice&&*/}
                        {/*    <Chip label="🔥역대가" color="primary" style={{marginRight: 5}} />}*/}

                        {
                            hotDeal.isDelete
                                ?

                                <h2 style={{fontSize: "14px"}}>
                                    <del>
                                        <a style={{textDecoration: "none", color: "gray", fontWeight: "normal"}}
                                           target={"_blank"}>
                                            {hotDeal.title}
                                        </a>
                                    </del>
                                </h2>

                                :
                                <h2 style={{fontSize: "14px"}}>
                                    <a
                                        style={{textDecoration: "none", color: "black", fontWeight: "normal"}}
                                        target={"_blank"}>
                                        {hotDeal.title}
                                    </a>
                                </h2>
                        }

                        <Typography style={{
                            display: 'inline-block',
                            textDecoration: "line-through",
                            color: "gray",
                            fontSize: "14px"
                        }}>{hotDeal.originalPrice.toLocaleString()}</Typography>&nbsp;&nbsp;&nbsp;
                        <Typography style={{
                            display: 'inline-block',
                            fontWeight: 'bold',
                            color: "#E83342",
                            fontSize: "18px"
                        }}>{hotDeal.discountRate}{"%↓"}</Typography>

                        <Typography style={{
                            fontSize: "18px",
                            fontWeight: 'bold'
                        }}>{hotDeal.discountPrice.toLocaleString() + "원"}</Typography>

                    </div>


                </div>

                {/*<Button onClick={async (e) => {*/}
                {/*    ReactGA.event({*/}
                {/*        category: "버튼",*/}
                {/*        action: "특가 링크 공유하기",*/}
                {/*        label: hotDeal.hotDealId+"-"+hotDeal.modelName+"-"+hotDeal.title,*/}
                {/*    });*/}

                {/*    const $textarea = document.createElement('textarea');*/}
                {/*    document.body.appendChild($textarea);*/}
                {/*    // 2. props로 받은 text값을 textarea의 value로 대입하고 textarea 영역 내 모든 텍스트를 선택(드래그효과)*/}
                {/*    $textarea.value = `https://whendiscount.com/hot-deals/${hotDeal.hotDealId}`;*/}
                {/*    $textarea.select();*/}
                {/*    // 3. execCommand 함수를 이용해 클립보드에 복사*/}
                {/*    document.execCommand('copy');*/}
                {/*    // 4. 임시 textarea 요소 제거*/}
                {/*    document.body.removeChild($textarea);*/}
                {/*    alert('클립보드에 복사되었습니다.');*/}
                {/*}}>*/}
                {/*    <SvgIcon color={"primary"}>*/}
                {/*        <path*/}
                {/*            d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"/>*/}
                {/*    </SvgIcon>*/}
                {/*    <Typography>*/}
                {/*        공유하기*/}
                {/*    </Typography>*/}
                {/*</Button>*/}

            </Grid>
        )
    })

    return (
        <div>

            {title()}
            <Grid container={true} justifyContent={"center"}>
                {hotDealElements}
            </Grid>
        </div>
    )
}

export default HotDealListView