import {HotDealPreview} from "../../common/hotDealDto";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    callDeleteHotDeal,
    callDeletePermanentHotDeal,
    callGetHotDeals, callGetHotDealsByProductId,
    setProductIdForSearch
} from "../../modules/hotDeal";
import {Button, Card, CardContent} from "@mui/material";
import React, {useEffect} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {RootState} from "../../modules";
import recommendation, {callGetRecommendations} from "../../modules/recommendation";
import {ProductFamilies} from "../../common/recommendationDto";
import RecommendationProductListView from "./RecommendationProductListView";
type Props = {
    productFamilies: ProductFamilies[]
}

const ProductFamilyListView = (productFamilyProps: Props) => {
    const dispatch = useDispatch()


    useEffect(() => {

    }, []);

    const productFamilyElements = productFamilyProps.productFamilies.map((productFamilies) => {
        return (
            <div style={{marginBottom: "30px", marginTop: "30px"}} key={productFamilies.productFamily.productFamilyId}>

                <Card variant={"outlined"}>
                    <CardContent>
                        <Typography>
                            {productFamilies.productFamily.productFamilyName}
                        </Typography>
                        <Typography>
                            {productFamilies.productFamily.productFamilyDescription}
                        </Typography>
                        <RecommendationProductListView products={productFamilies.products}/>
                    </CardContent>
                </Card>

            </div>
        )
    })

    return (
        <div style={{flexDirection:"row",display:"flex"}}>
            {productFamilyElements}
        </div>
    )
}

export default ProductFamilyListView