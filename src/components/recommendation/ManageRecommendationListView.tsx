import {HotDealPreview} from "../../common/hotDealDto";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    callDeleteHotDeal,
    callDeletePermanentHotDeal,
    callGetHotDeals, callGetHotDealsByProductId,
    setProductIdForSearch
} from "../../modules/hotDeal";
import {Button} from "@mui/material";
import React, {useEffect} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {RootState} from "../../modules";
import recommendation, {callGetRecommendations} from "../../modules/recommendation";
import ProductFamilyListView from "./ProductFamilyListView";
import ManageProductFamilyListView from "./ManageProductFamilyListView";


const ManageRecommendationListView = () => {
    const dispatch = useDispatch()

    const recommendations = useSelector((state: RootState) => state.recommendationReducer.recommendations);

    useEffect(() => {
        // @ts-ignore
        dispatch(callGetRecommendations())
    }, []);

    const recommendationElements = recommendations.map((recommendationDto) => {
        return (
            <div style={{marginBottom: "30px", marginTop: "30px"}} key={recommendationDto.productPurposeDetail.productPurposeDetailId}>
                <Accordion>
                    <AccordionSummary>
                        <Typography>{recommendationDto.productPurposeDetail.productPurposeDetailTitle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography style={{whiteSpace:"pre-wrap"}}>
                            {recommendationDto.productPurposeDetail.productPurposeDetailBody}
                        </Typography>
                        <ManageProductFamilyListView productFamilies={recommendationDto.productFamilies}/>
                    </AccordionDetails>
                </Accordion>

            </div>
        )
    })

    return (
        <div style={{textAlign: "center"}}>
            {recommendationElements}
        </div>
    )
}

export default ManageRecommendationListView