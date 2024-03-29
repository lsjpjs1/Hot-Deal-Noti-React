import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import React, {useEffect} from "react";
import {
    callPostHotDeal,
    setAddHotDealDiscountPrice,
    setAddHotDealLink,
    setAddHotDealOriginalPrice,
    setAddHotDealSite,
    setAddHotDealTitle
} from "../modules/hotDeal";
import {Button, TextField, Typography} from "@material-ui/core";


const AddHotDealContainer = () => {

    const dispatch = useDispatch();
    const postHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.postHotDealRequest);


    useEffect(() => {


    }, []);

    return (
        <div>
            {process.env["REACT_APP_SERVER_BASE_URL"] != "https://api.whendiscount.com" ?
                <Typography style={{color: "red"}}>Production 아님!!!!!!!!!! 환경 변수 바꾸셈</Typography> :
                <Typography style={{color: "blue"}}>Production 서버가 맞습니다</Typography>}


            <TextField
                label="제목"
                onChange={(e) => {
                    dispatch(setAddHotDealTitle(e.target.value))
                }}
            />
            <br/>
            <TextField
                label="링크"
                onChange={(e) => {
                    dispatch(setAddHotDealLink(e.target.value))
                }}
            /><br/>
            <TextField
                label="소스사이트"
                onChange={(e) => {
                    dispatch(setAddHotDealSite(e.target.value))
                }}
            /><br/>
            <TextField
                label="원가"
                onChange={(e) => {
                    dispatch(setAddHotDealOriginalPrice(Number.parseInt(e.target.value)))
                }}
            /><br/>
            <TextField
                label="특가"
                onChange={(e) => {
                    dispatch(setAddHotDealDiscountPrice(Number.parseInt(e.target.value)))
                }}
            /><br/>
            <TextField
                value={postHotDealRequest.discountRate}
                disabled={true}
            />
            <Button
                style={{
                    display: 'inline-block',
                    marginLeft: '10px'
                }}
                onClick={() => {
                    // @ts-ignore
                    dispatch(callPostHotDeal())

                }}>
                등록
            </Button>
        </div>
    )
}

export default AddHotDealContainer;