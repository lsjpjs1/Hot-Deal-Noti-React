import {HotDealPreview} from "../../common/hotDealDto";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    callDeleteHotDeal,
    callDeletePermanentHotDeal,
    callGetHotDeals, callGetHotDealsByProductId,
    setProductIdForSearch
} from "../../modules/hotDeal";
import {Button, List, ListItemButton, SvgIcon} from "@mui/material";
import React, {useEffect, useRef} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {RootState} from "../../modules";
import recommendation, {callGetRecommendations} from "../../modules/recommendation";
import ProductFamilyListView from "./ProductFamilyListView";
import {ProductFamilies, Products, UpdateProductFamilyRequest} from "../../common/recommendationDto";
import {clearProductFamily, updateProductFamily} from "../../api/recommendationApi";

type Props = {
    products: Products[]
}
const ManageRecommendationProductListView = (recommendationProductProps: Props) => {
    const dispatch = useDispatch()

    const itemsRef = useRef([]);

    useEffect(() => {

    }, []);




    const callClearProductFamily = async (productId: number,itemIdx:number) => {
        await clearProductFamily(productId).then((res) => {
            alert("삭제완료")
            itemsRef.current[itemIdx].remove()
        }).catch((error) => {
            alert("석제실패 : "+error.toString())
        })
    }

    const recommendationProductElements = recommendationProductProps.products.map((product,i) => {
        return (
<div  style={{marginBottom: "30px", marginTop: "30px"}} ref={el=> itemsRef.current[i]=el}>
    <ListItemButton style={{display: 'inline-block'}} key={product.productId}
                    onClick={()=>{
                        window.open(`/hot-deals/product/${product.productId}`,'_blank')
                    }}
    >

        {product.modelName}<br/>
        {product.minHotDealPrice&&("특가 : "+product.minHotDealPrice)}


    </ListItemButton>
    <Button onClick={async (e)=>{
        const $textarea = document.createElement('textarea');
        document.body.appendChild($textarea);
        // 2. props로 받은 text값을 textarea의 value로 대입하고 textarea 영역 내 모든 텍스트를 선택(드래그효과)
        $textarea.value = product.modelName;
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
    <Button style={{
        marginLeft: '50px',
        color: 'red'
    }}
            onClick={async (e)=>{
                await callClearProductFamily(product.productId,i)
            }}
    >
        삭제
    </Button>
</div>

        )
    })

    return (
        <div style={{textAlign: "center"}}>
            <List>
                {recommendationProductElements}
            </List>

        </div>
    )
}

export default ManageRecommendationProductListView