import {HotDealPreview} from "../../common/hotDealDto";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    callDeleteHotDeal,
    callDeletePermanentHotDeal,
    callGetHotDeals, callGetHotDealsByProductId,
    setProductIdForSearch
} from "../../modules/hotDeal";
import {Button, List, ListItemButton} from "@mui/material";
import React, {useEffect} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {RootState} from "../../modules";
import recommendation, {callGetRecommendations} from "../../modules/recommendation";
import ProductFamilyListView from "./ProductFamilyListView";
import {ProductFamilies, Products} from "../../common/recommendationDto";

type Props = {
    products: Products[]
}
const RecommendationProductListView = (recommendationProductProps: Props) => {
    const dispatch = useDispatch()


    useEffect(() => {

    }, []);

    const recommendationProductElements = recommendationProductProps.products.map((product) => {
        console.log(product)
        return (
            <ListItemButton style={{marginBottom: "30px", marginTop: "30px"}} key={product.productId}
            onClick={()=>{
                window.open(`/hot-deals/product/${product.productId}`,'_blank')
            }}
            >

                {product.modelName}<br/>
                {product.minHotDealPrice&&("특가 : "+product.minHotDealPrice)}

            </ListItemButton>
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

export default RecommendationProductListView