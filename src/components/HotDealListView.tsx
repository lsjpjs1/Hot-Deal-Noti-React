import {HotDealPreview} from "../common/hotDealDto";
import moment from "moment";
import {callGetHotDealsByProductId, setProductIdForSearch} from "../modules/hotDeal";
import {useDispatch} from "react-redux";
import {Button, Chip} from "@material-ui/core";
import {SvgIcon} from "@mui/material";

moment.locale("ko");

type Props = {
    hotDeals: HotDealPreview[],
    hotDealLinkOnClick: (hotDealId: number) => void
}

const HotDealListView = (props: Props) => {
    const dispatch = useDispatch();
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
                            alert('모델명이 복사되었습니다.');
                        }}>
                            <SvgIcon color={"primary"}>
                                <path  d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />
                            </SvgIcon>
                            <h4>
                                모델명 복사
                            </h4>
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
                            <a style={{color:"gray"}} href={hotDeal.link} onClick={() => props.hotDealLinkOnClick(hotDeal.hotDealId)}
                               target={"_blank"}>
                                {hotDeal.title}
                            </a>
                        </del>
                        :
                        <a  href={hotDeal.link} onClick={() => props.hotDealLinkOnClick(hotDeal.hotDealId)}
                           target={"_blank"}>
                            {hotDeal.title}
                        </a>
                }
                <Button onClick={async (e)=>{
                    // try {
                    //     await navigator.clipboard.writeText(`https://whendiscount.com/hot-deals/${hotDeal.hotDealId}`);
                    //     alert('클립보드에 복사되었습니다.');
                    // } catch (error) {
                    //     alert('복사에 실패하였습니다.');
                    // }
                    const $textarea = document.createElement('textarea');
                    document.body.appendChild($textarea);
                    // 2. props로 받은 text값을 textarea의 value로 대입하고 textarea 영역 내 모든 텍스트를 선택(드래그효과)
                    $textarea.value = `https://whendiscount.com/hot-deals/${hotDeal.hotDealId}`;
                    $textarea.select();
                    // 3. execCommand 함수를 이용해 클립보드에 복사
                    document.execCommand('copy');
                    // 4. 임시 textarea 요소 제거
                    document.body.removeChild($textarea);
                    alert('클립보드에 복사되었습니다.');
                }}>
                    <SvgIcon color={"primary"}>
                        <path  d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
                    </SvgIcon>
                    <h4>
                        공유하기
                    </h4>
                </Button>

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