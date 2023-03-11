import {HotDealPreview} from "../../common/hotDealDto";
import moment from "moment";
import {
    callDeletePermanentHotDeal,
    callGetHotDeals,
    callPostFavoriteHotDeal,
    setIsShowReturnItem
} from "../../modules/hotDeal";
import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, Chip, Grid, Modal, Tooltip, Typography} from "@material-ui/core";
import React from "react";
import ReactGA from "react-ga4";
import IconButton from "@material-ui/core/IconButton";
import {deleteFavoriteHotDeal} from "../../api/hotDealApi";
import {useNavigate} from "react-router";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import "./HotDealListView.css"
import mixpanel from "mixpanel-browser";
import {Desktop, Mobile} from "../../common/mediaQuery";
import {useState} from "react"
import { textAlign } from "@mui/system";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {RootState} from "../../modules";

moment.locale("ko");

type Props = {
    hotDeals: HotDealPreview[],
    hotDealLinkOnClick: (hotDealId: number) => void,
    pageType: string,
    title: string
}

const HotDealListView = (props: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [currentHotDealLink,setCurrentHotDealLink] = useState("")
    const historicalLowPrice = useSelector((state: RootState) => state.hotDealReducer.historicalLowPrice);

    if (props.pageType == "PRODUCT") {
        const htmlTitle = document.querySelector("title");
        if (historicalLowPrice!=null){
            htmlTitle.innerHTML = props.hotDeals.length > 0 ?
                props.hotDeals[0].modelName + " 특가 목록 | 역대가 " + historicalLowPrice.toLocaleString() + "원" + " | 진짜 최저가 | 노트북 특가 | 특가 어디가"
                :
                htmlTitle.innerHTML;
        }

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
                    &nbsp;&nbsp;
                    {props.title == "추천 특가" &&
                        <Button
                            className={"see-all-button"}
                            onClick={() => {
                                mixpanel.track(
                                    "showEntireRecommendationHotDeals"
                                );
                                window.open(`/hot-deals/recommendation`, '_blank')
                            }}
                        >
                        <span style={{fontWeight:"bold"}}>전체보기</span>
                        </Button>
                    }
                    {props.title == "반품 특가" &&
                        <Button
                            className={"model-name-button"}
                            onClick={() => {
                                mixpanel.track(
                                    "showEntireReturnHotDeals"
                                );
                                window.open(`/hot-deals/return`, '_blank')
                            }}
                        >
                        <span style={{fontWeight:"bold"}}>전체보기</span>
                        </Button>
                    }

                </Typography>
            )
        } else {
            return (
                <div></div>
            )
        }

    }

    const shouldShowPopup = () => {

        

        if(localStorage.getItem("noPopupExpireTime") == null) return true
        
        const noPopupExpireTime = JSON.parse(localStorage.getItem("noPopupExpireTime"))
        let nowTime = new Date()

        console.log(nowTime.getTime())
        console.log(noPopupExpireTime)

        if(nowTime.getTime() > noPopupExpireTime){
            return true
        } else {
            return false
        }
    }

    const noShowPopupClicked = () => {
        let noPopupExpireTime = new Date()
        noPopupExpireTime.setTime(noPopupExpireTime.getTime() + 24*60*60*1000)


        localStorage.setItem("noPopupExpireTime",JSON.stringify(noPopupExpireTime.getTime()))
        setIsOpenPopup(false)
    }   

    const onClickHotDeal = (hotDeal:HotDealPreview) => {
        if (props.title == "추천 특가") {
            mixpanel.track(
                "recommendationHotDealLinkClick",
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
        } else {
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
        }
       
        if (hotDeal.sourceSite == "11번가" || hotDeal.sourceSite == "G마켓") {

           if (shouldShowPopup()){
               setCurrentHotDealLink(hotDeal.link)
               setIsOpenPopup(true)
           }else{
               window.open(hotDeal.link, '_blank')
           }
        }else{
           window.open(hotDeal.link, '_blank')
        }
        props.hotDealLinkOnClick(hotDeal.hotDealId)
        ReactGA.event({
            category: "버튼",
            action: "특가 링크로 이동",
            label: hotDeal.hotDealId + "-" + hotDeal.modelName + "-" + hotDeal.title,
        });
    }

    const naverShoppingLinkButton = (hotDeal:HotDealPreview) => {
        return(
        
            (hotDeal.productId != 1 && hotDeal.productId !=0) &&
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
                     src={"/image/naver_logo.png"}
                     onClick={e => {
                     }}
                />
            </IconButton>
        
        )
    }

    const onClickPriceHistory = (hotDeal: HotDealPreview) => {
        
            
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
        
    }

    const hotDealElementsForPC = props.hotDeals.map((hotDeal) => {
        const productAdditionalFunctions = hotDeal.productAdditionalFunctionDTOList.map((productAdditionalFunctionDTO)=>{
            return(
                <>
                    <span style={{fontWeight:"bold",color:"#434343", fontSize: 14.5}}>{productAdditionalFunctionDTO.productFunctionTypeName}</span>  <span style={{color:"#434343", fontSize: 14.5}}>&nbsp;{productAdditionalFunctionDTO.productFunctionName}</span>
                    <br/>
                </>
            )
        });
        return (
            <Grid item={true} spacing={5} style={{
                padding: "30px",
                width: "580px"
            }} key={hotDeal.hotDealId}>
                <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{width:300}}>
                    <div className={"hot-deal-clickable-container"}>

                        {hotDeal.hotDealThumbnailUrl != "" &&
                            <div onClick={()=>onClickHotDeal(hotDeal)} style={{cursor:"pointer"}}>
                                <img
                                    src={hotDeal.hotDealThumbnailUrl} width={230} height={230}
                                    style={hotDeal.isDelete ? {filter: "brightness(60%)",zIndex:1} : {zIndex:1}}
                                /><br/>
                            </div>}

                        {hotDeal.returnItemId != 0 && hotDeal.returnItemId != null &&
                            <Chip label={hotDeal.returnItemQuality + " / " + hotDeal.returnItemQualityDetail}
                                  size={"small"} variant={"outlined"} style={{margin: "3px"}}/>
                        }
                        <div style={{textAlign:"left", paddingLeft:"17px",  display:"flex"}}>
                        <div style={{flex:4}}>
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
                                <h2 style={{fontSize: "14px", cursor:"pointer"}} onClick={()=>onClickHotDeal(hotDeal)} >
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
                        <div style={{width:40 , position:"relative"} }>
                            {naverShoppingLinkButton(hotDeal)}
                            <Button variant="contained" className="price-history-button" onClick={()=>onClickPriceHistory(hotDeal)} >역대특가조회</Button>
                        </div>
                        </div>
                    </div>

                </div>
                <div style={{ width:300, height:100, textAlign: "left"}}>
                <div style={{marginBottom:20}}>
                        <div style={{display: "flex", justifyContent: "space-between", marginInline: "40px"}}>
                            <Typography style={{
                                display: 'inline-block',
                                fontSize: "14px",
                                color: "rgba(17,17,17,0.68)",
                                whiteSpace: "nowrap"
                            }}>{moment(hotDeal.uploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}</Typography>
                            {hotDeal.productRanking != null &&
                                <Chip label={"" + hotDeal.productPurpose + " " + hotDeal.productRanking + "위👑"}
                                      size={"small"} variant={"outlined"} style={{margin: "3px"}}
                                      onClick={() => {
                                          mixpanel.track(
                                              "showEntireRanking"
                                          );
                                          window.open(`/products/ranking`, '_blank')
                                      }}
                                />
                            }
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

                        <Tooltip
                            enterTouchDelay={0}
                            onClick={(event)=>{
                                event.stopPropagation();
                            }}
                            title={
                                hotDeal.isCandidateProduct&&hotDeal.productId!=1?
                                <div>
                                    자동분류된 모델명으로 잘못 분류되어 있을 수 있습니다.
                                    정확도는 약 90%입니다.
                                </div>
                                    :
                                    ""
                            }>
                        <Badge badgeContent={"자동분류됨"} color="primary"
                               invisible={!hotDeal.isCandidateProduct||hotDeal.productId==1}
                               anchorOrigin={{
                                   vertical: 'top',
                                   horizontal: 'left',
                               }}
                        >
                            {/*@ts-ignore*/}
                           

                            <div className="model-name-container" onClick={()=>onClickHotDeal(hotDeal)}>
                            {props.pageType != "FAVORITE" &&
                            <IconButton style={{color: "#4D4D4D", width: 3, height: 3, marginRight: "5px", top:"3px", left:"5px", position:"absolute"}}
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
                                <img className={"pc-favorite-image"}
                                         src={"/image/icon/star_favorite.svg"}
                                    />
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
                                <img className={"pc-favorite-image"}
                                         src={"/image/icon/close_favorite.svg"}
                                    />
                            </IconButton>}

                                <span className="model-name-span">{hotDeal.modelName}</span>
                            </div>
                        </Badge>
                        </Tooltip>





                        {props.pageType == "MANAGE_RETURN" && <Button
                            style={{
                                display: 'inline-block',
                                marginLeft: '40px',
                                color: 'red'
                            }}
                            onClick={() => {
                                // @ts-ignore
                                dispatch(callDeletePermanentHotDeal(hotDeal.hotDealId))
                                dispatch(setIsShowReturnItem(true))
                                // @ts-ignore
                                dispatch(callGetHotDeals())
                                dispatch(setIsShowReturnItem(true))
                                // @ts-ignore
                                dispatch(callGetHotDeals())
                            }}>
                            영구 삭제
                        </Button>}

                    </div>
                    <div style={{marginLeft:20}}>{productAdditionalFunctions}</div>
                
                </div>
                </div>

            </Grid>
        )
    })

    const hotDealElementsForMoblie = props.hotDeals.map((hotDeal) => {
        const productAdditionalFunctions = hotDeal.productAdditionalFunctionDTOList.map((productAdditionalFunctionDTO)=>{
            return(
                <>
                    <span style={{fontWeight:"bold",color:"#434343", fontSize:14}}>{productAdditionalFunctionDTO.productFunctionTypeName}</span>  <span style={{color:"#434343", fontSize:14}}>&nbsp;{productAdditionalFunctionDTO.productFunctionName}</span>
                    <br/>
                </>
            )
        });
        const productAdditionalFunctionsPreview = hotDeal.productAdditionalFunctionDTOList.map((productAdditionalFunctionDTO)=>{
            return(
                <>
                    <span style={{fontWeight:"bold",color:"#434343", fontSize:14}}>{productAdditionalFunctionDTO.productFunctionTypeName}</span>  <span style={{color:"#434343", fontSize:14}}>&nbsp;{productAdditionalFunctionDTO.productFunctionName}&nbsp;/&nbsp;</span>
                </>
            )
        });
        return (
            <Grid item={true} spacing={5} style={{
                marginBottom: "30px", marginTop: "30px"
            }} key={hotDeal.hotDealId}
                  alignContent={"stretch"}
            >
                <div>

                    <div className={"mobile-hot-deal-header-container"}>

                        {hotDeal.productRanking!=null&&
                            <Button
                                className={"mobile-product-ranking-button"}
                                variant={"outlined"}
                                onClick={()=>{
                                    mixpanel.track(
                                        "showEntireRanking"
                                    );
                                    window.open(`/products/ranking`, '_blank')
                                }}
                            >
                                <Typography className={"mobile-product-ranking-text"}>
                                    {""+hotDeal.productPurpose+" "+hotDeal.productRanking+"위👑"}
                                </Typography>
                            </Button>
                        }

                        <Tooltip
                            style={{width:"100%"}}
                            enterTouchDelay={0}
                            onClick={(event)=>{
                                event.stopPropagation();
                            }}
                            title={
                                hotDeal.isCandidateProduct&&hotDeal.productId!=1?
                                    <div>
                                        자동분류된 모델명으로 잘못 분류되어 있을 수 있습니다.
                                        정확도는 약 90%입니다.
                                    </div>
                                    :
                                    ""
                            }>
                            <Badge badgeContent={"자동분류됨"} color="primary"
                                   invisible={!hotDeal.isCandidateProduct}
                                   anchorOrigin={{
                                       vertical: 'top',
                                       horizontal: 'right',
                                   }}
                                   style={{marginRight:"50px",width:"95%"}}

                            >
                        <div className={"mobile-hot-deal-header-second-line-container"}
                             onClick={()=>onClickHotDeal(hotDeal)}
                        >
                            {props.pageType != "FAVORITE" ?
                                <IconButton className={"mobile-favorite-icon-button"}
                                            onClick={(event) => {
                                                event.stopPropagation();
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
                                    <img className={"mobile-favorite-image"}
                                         src={"/image/icon/star_favorite.svg"}
                                    />
                                </IconButton>
                                :
                                <IconButton className={"mobile-favorite-icon-button"}
                                            onClick={(event) => {
                                                event.stopPropagation();
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
                                    <img className={"mobile-favorite-image"}
                                         src={"/image/icon/close_favorite.svg"}
                                    />
                                </IconButton>
                            }



                            <Typography
                                className={hotDeal.isDelete ? "mobile-model-name-delete-text" : "mobile-model-name-text"}>
                                {hotDeal.modelName}
                            </Typography>

                            <img className={"mobile-arrow-image"}
                                 src={"/image/icon/arrow.svg"}
                            />

                        </div>
                            </Badge>
                        </Tooltip>

                    </div>

                    <div className={"mobile-hot-deal-clickable-container"}>

                        {hotDeal.hotDealThumbnailUrl != "" &&
                            <div className={"mobile-hot-deal-thumbnail-container"}>

                                <div onClick={()=>onClickHotDeal(hotDeal)}>
                                    <img
                                        src={hotDeal.hotDealThumbnailUrl} width={100} height={100}
                                        style={hotDeal.isDelete ? {filter: "brightness(60%)"} : {}}
                                    /><br/>
                                </div>
                            </div>
                        }

                        <div className={"mobile-hot-deal-info-container"}>



                            <h2 className={hotDeal.isDelete ? "mobile-hot-deal-title-delete-text" : "mobile-hot-deal-title-text"} onClick={()=>onClickHotDeal(hotDeal)}>
                                <a style={{textDecoration: "none"}}
                                   target={"_blank"}>
                                    {hotDeal.title}
                                </a>
                            </h2>

                            <div className={"mobile-discount-original-price-container"}>
                                <Typography className={"mobile-hot-deal-discount-rate-text"}>
                                    {hotDeal.discountRate}
                                </Typography>

                                <Typography className={"mobile-hot-deal-original-price-text"}>
                                    {hotDeal.originalPrice.toLocaleString()}원
                                </Typography>
                            </div>

                            <div className={"mobile-discount-price-naver-container"}>
                                <Typography className={"mobile-hot-deal-discount-price-text"}>
                                    {hotDeal.discountPrice.toLocaleString() + "원"}
                                </Typography>

                                {hotDeal.returnItemId!=0 && hotDeal.returnItemId!=null &&
                                    <Typography className={"mobile-hot-deal-return-info-text"}>
                                        {hotDeal.returnItemQuality+" / "+hotDeal.returnItemQualityDetail}
                                    </Typography>
                                }                                
                                
                                {naverShoppingLinkButton(hotDeal)} 
                            </div>
                            
                            <div style={{ textAlign:"left"}}><Button variant="contained" className="price-history-button-mobile" onClick={()=>onClickPriceHistory(hotDeal)} >역대특가조회</Button></div>


                            <div className={"mobile-hot-deal-metadata-container"}>
                                <img className={"mobile-clock-image"}
                                     src={"/image/icon/clock.svg"}
                                />
                                <Typography className={"mobile-hot-deal-upload-time-text"}>
                                    {moment(hotDeal.uploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}
                                </Typography>

                                <img className={"mobile-eye-image"}
                                     src={"/image/icon/eye.svg"}
                                />
                                <Typography className={"mobile-hot-deal-view-count-text"}>
                                    {hotDeal.viewCount}
                                </Typography>


                            </div>


                        </div>

                    </div>


                    
                    {hotDeal.productAdditionalFunctionDTOList.length>0&&
                        <Accordion style={{marginTop:13}} square={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                
                            >
                                <span className="accordian-summary-mobile" >
                                    {/*hotDeal.productAdditionalFunctionDTOList.map(
                                        (productAdditionalFunction)=>productAdditionalFunction.productFunctionTypeName+":"+productAdditionalFunction.productFunctionName).join(" / ").slice(0,50).concat("...")
                                    */productAdditionalFunctionsPreview}
                                </span>
                                
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={{textAlign:"left"}}>
                                    {productAdditionalFunctions}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    }


                </div>

            </Grid>
        )
    })

    return (
        <div>
            <Desktop>
                <div>
                    <Modal
                        open={isOpenPopup}
                        onClose={() => {
                            setIsOpenPopup(false)
                        }}
                        style={{alignItems:"center",display:"flex",justifyContent:"center"}}
                    >
                        <div className={"popup-modal"}>
                            <p style={{fontWeight:"bold", color:"#000099", fontSize:"25px"}}>특가 적용 안내</p>
                            <div style={{textAlign:"left"}}>
                            &nbsp;11번가와 G마켓의 경우 쇼핑몰 정책에 따라 특가어디가의 링크를 통해 접속 시 특가 적용이 안될 수도 있습니다.
                            <br></br>&nbsp;아래 링크를 참고하시면 특가어디가에 표기된 가격대로 구매 가능합니다.
                            </div>
                            <a href="https://bush-thorn-7ed.notion.site/77c65c69c1cf4176b313cd8b6eb7e3f2" target="_blank" style={{textDecoration:"none"}}><p style={{marginBottom:0, marginTop:20, fontWeight:"bold"}}>특가 적용법</p></a>
                            <Button onClick={()=>{window.open(currentHotDealLink, '_blank')}}><p style={{marginTop:0, fontWeight:"bold", fontSize:16, height:10}}>그냥 쇼핑몰 방문하기</p></Button>
                            <br></br>
                            <Button onClick={()=>noShowPopupClicked()} style={{marginTop:25, marginBottom:0, height: 24, color: "gray"}}>오늘 하루동안 보지 않기</Button>
                            <Button onClick={()=>setIsOpenPopup(false)} style={{marginTop:25, marginBottom:0, height: 24}}>닫기</Button>
                           
                        </div>
                    </Modal>
                    {title()}
                    
                    <Grid container={true} justifyContent={"center"}>
                    
                        {hotDealElementsForPC}
                    </Grid>
                </div>
            </Desktop>

            <Mobile>
                <div className={"mobile-container"}>
                <Modal
                        open={isOpenPopup}
                        onClose={() => {
                            setIsOpenPopup(false)
                        }}
                        style={{alignItems:"center",display:"flex",justifyContent:"center"}}
                    >
                        <div className={"popup-modal-mobile"}>
                            <p style={{fontWeight:"bold", color:"#000099", fontSize:"25px"}}>특가 적용 안내</p>
                            <div style={{textAlign:"left"}}>
                            &nbsp;11번가와 G마켓의 경우 쇼핑몰 정책에 따라 특가어디의 링크를 통해 접속 시 특가 적용이 안될 수도 있습니다.
                            <br></br>&nbsp;아래 링크를 참고하시면 특가어디가에 표기된 가격대로 구매 가능합니다.
                            </div>
                            <a href="https://bush-thorn-7ed.notion.site/77c65c69c1cf4176b313cd8b6eb7e3f2" target="_blank" style={{textDecoration:"none"}}><p style={{marginBottom:0, marginTop:20, fontWeight:"bold"}}>특가 적용법</p></a>
                            <Button onClick={()=>{window.open(currentHotDealLink, '_blank')}}><p style={{marginTop:0, fontWeight:"bold", fontSize:16, height:10}}>그냥 쇼핑몰 방문하기</p></Button>
                            <br></br>
                            <Button onClick={()=>noShowPopupClicked()} style={{marginTop:25, marginBottom:0, height: 24, color: "gray"}}>오늘 하루동안 보지 않기</Button>
                            <Button onClick={()=>setIsOpenPopup(false)} style={{marginTop:25, marginBottom:0, height:24}}>닫기</Button>
                        </div>
                    </Modal>
                    {title()}
                    <Grid container={false} justifyContent={"center"}>
                        {hotDealElementsForMoblie}
                    </Grid>
                </div>
            </Mobile>
        </div>
    )
}

export default HotDealListView