import {HotDealPreview} from "../../common/hotDealDto";
import moment from "moment";
import {useDispatch} from "react-redux";
import {callDeleteHotDeal, callDeletePermanentHotDeal, callGetHotDeals} from "../../modules/hotDeal";
import {Button, SvgIcon} from "@mui/material";
import React from "react";
import {Chip, Grid, Typography} from "@material-ui/core";
import ReactGA from "react-ga4";
import {postRecommendationHotDeal} from "../../api/hotDealApi";

moment.locale("ko");

type Props = {
    hotDeals: HotDealPreview[],
    hotDealLinkOnClick: (hotDealId: number) => void
}

const HotDealListView = (props: Props) => {
    const dispatch = useDispatch()
    const hotDealElements = props.hotDeals.map((hotDeal) => {
        return (
            <Grid item={true} spacing={5} style={{marginBottom: "30px", marginTop: "30px",
                width:"300px"}} key={hotDeal.hotDealId}>
                <div>
                    <div>
                        {/*@ts-ignore*/}
                        <Chip
                            label={hotDeal.modelName}
                            onClick={() => {

                                window.open(`/hot-deals/product/${hotDeal.productId}`, '_blank')
                            }}>
                        </Chip>

                        <Button onClick={async (e)=>{
                            postRecommendationHotDeal(hotDeal.hotDealId)
                        }}>
                            <Typography style={{
                                color:"green"
                            }}>
                                추천
                            </Typography>
                        </Button>

                        <Button onClick={async (e)=>{
                            const $textarea = document.createElement('textarea');
                            document.body.appendChild($textarea);
                            // 2. props로 받은 text값을 textarea의 value로 대입하고 textarea 영역 내 모든 텍스트를 선택(드래그효과)
                            $textarea.value = hotDeal.modelName;
                            $textarea.select();
                            // 3. execCommand 함수를 이용해 클립보드에 복사
                            document.execCommand('copy');
                            // 4. 임시 textarea 요소 제거
                            document.body.removeChild($textarea);
                        }}>
                            <SvgIcon color={"primary"}>
                                <path  d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />
                            </SvgIcon>
                            <Typography>
                                모델명 복사
                            </Typography>
                        </Button>

                        <Button
                            style={{
                                display: 'inline-block',
                                marginLeft: '10px'
                            }}
                            onClick={() => {
                                // @ts-ignore
                                dispatch(callDeleteHotDeal(hotDeal.hotDealId))
                                // @ts-ignore
                                dispatch(callGetHotDeals())
                                // @ts-ignore
                                dispatch(callGetHotDeals())
                            }}>
                            삭제
                        </Button>

                        <Button
                            style={{
                                display: 'inline-block',
                                marginLeft: '40px',
                                color: 'red'
                            }}
                            onClick={() => {
                                // @ts-ignore
                                dispatch(callDeletePermanentHotDeal(hotDeal.hotDealId))
                                // @ts-ignore
                                dispatch(callGetHotDeals())
                                // @ts-ignore
                                dispatch(callGetHotDeals())
                            }}>
                            영구 삭제
                        </Button>
                        {hotDeal.productId != 1 && <div>
                            <Typography style={{display: 'inline-block'}}>{hotDeal.manufacturer}</Typography>
                            <Typography style={{display: 'inline-block', marginLeft: '10px'}}>{hotDeal.productPurpose}</Typography>
                        </div>}

                    </div>
                    {hotDeal.hotDealThumbnailUrl != "" &&
                        <div>
                            <img onClick={(e) => {
                                window.open(hotDeal.link, '_blank')
                                props.hotDealLinkOnClick(hotDeal.hotDealId)
                                ReactGA.event({
                                    category: "이미지 버튼",
                                    action: "특가 링크로 이동",
                                    label: hotDeal.hotDealId + "-" + hotDeal.modelName + "-" + hotDeal.title,
                                });
                            }} src={hotDeal.hotDealThumbnailUrl} width={200} height={200}/><br/>
                        </div>}
                    <Typography style={{display: 'inline-block'}}>{hotDeal.sourceSite}</Typography>
                    <Typography style={{
                        display: 'inline-block',
                        marginLeft: '10px'
                    }}>{moment(hotDeal.uploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}</Typography>
                    <Typography style={{display: 'inline-block', marginLeft: '10px'}}>{"조회: " + hotDeal.viewCount}</Typography>
                    <Typography>{hotDeal.discountRate}{"%↓"}</Typography>
                    <Typography style={{display: 'inline-block'}}>{hotDeal.discountPrice.toLocaleString() + "원"}</Typography>
                    <Typography style={{display: 'inline-block'}}>{" <- "}</Typography>
                    <Typography style={{
                        display: 'inline-block',
                        textDecoration: "line-through"
                    }}>{hotDeal.originalPrice.toLocaleString()}</Typography>
                </div>
                {
                    hotDeal.isDelete
                        ?
                        <del>
                            {hotDeal.title}
                        </del>
                        :
                        <a href={hotDeal.link}
                           target={"_blank"}>
                            {hotDeal.title}
                        </a>
                }

            </Grid>
        )
    })

    return (
        <Grid container={true} justifyContent={"center"}  >
            {hotDealElements}
        </Grid>
    )
}

export default HotDealListView