import {HotDealPreview} from "../../common/hotDealDto";
import moment from "moment";
import {useDispatch} from "react-redux";
import {
    callDeleteHotDeal,
    callDeletePermanentHotDeal,
    callGetHotDeals, callGetHotDealsByProductId,
    setProductIdForSearch
} from "../../modules/hotDeal";
import {Button, SvgIcon} from "@mui/material";
import React from "react";
import {Chip} from "@material-ui/core";

moment.locale("ko");

type Props = {
    hotDeals: HotDealPreview[],
    hotDealLinkOnClick: (hotDealId: number) => void
}

const HotDealListView = (props: Props) => {
    const dispatch = useDispatch()
    const hotDealElements = props.hotDeals.map((hotDeal) => {
        return (
            <div style={{marginBottom: "30px", marginTop: "30px"}}>
                <div>
                    <div>
                        {/*@ts-ignore*/}
                        <Chip
                            label={hotDeal.modelName}
                            onClick={() => {
                                console.log("click")
                                dispatch(setProductIdForSearch(hotDeal.productId))
                                // @ts-ignore
                                dispatch(callGetHotDealsByProductId())
                            }}>
                        </Chip>

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
                            <h4>
                                모델명 복사
                            </h4>
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
                            <h3 style={{display: 'inline-block'}}>{hotDeal.manufacturer}</h3>
                            <h3 style={{display: 'inline-block', marginLeft: '10px'}}>{hotDeal.productPurpose}</h3>
                        </div>}

                    </div>
                    <h4 style={{display: 'inline-block'}}>{hotDeal.sourceSite}</h4>
                    <h4 style={{
                        display: 'inline-block',
                        marginLeft: '10px'
                    }}>{moment(hotDeal.uploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}</h4>
                    <h4 style={{display: 'inline-block', marginLeft: '10px'}}>{"조회: " + hotDeal.viewCount}</h4>
                    <h2>{hotDeal.discountRate}{"%↓"}</h2>
                    <h2 style={{display: 'inline-block'}}>{hotDeal.discountPrice.toLocaleString() + "원"}</h2>
                    <h3 style={{display: 'inline-block'}}>{" <- "}</h3>
                    <h3 style={{
                        display: 'inline-block',
                        textDecoration: "line-through"
                    }}>{hotDeal.originalPrice.toLocaleString()}</h3>
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

            </div>
        )
    })

    return (
        <div style={{textAlign: "center"}}>
            {hotDealElements}
        </div>
    )
}

export default HotDealListView