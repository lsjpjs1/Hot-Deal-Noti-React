import {HotDealPreview} from "../../common/hotDealDto";
import {GetProductFunctionTypeDTO, SetProductFunctionFilterDTO} from "../../common/productDto";
import { Checkbox, FormControlLabel, Grid, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../modules";
import {callGetInitData, setProductFunctionCheckBoxMap, setProductFunctionFilterWrapper} from "../../modules/hotDeal";
import mixpanel from "mixpanel-browser";
import productFunctionFilter from "./ProductFunctionFilter";
import "./ProductFunctionCheckBoxContainer.css"
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import Accordion from "@mui/material/Accordion";

type ProductFunctionCheckBoxContainerProps = {
    productFunctionType: GetProductFunctionTypeDTO,
    onFilterChange: ()=>void
}

const ProductFunctionCheckBoxContainer = (props: ProductFunctionCheckBoxContainerProps) => {
    const dispatch = useDispatch();
    const productFunctionCheckBoxMap = useSelector((state: RootState) => state.hotDealReducer.productFunctionCheckBoxMap);
    const checkBoxes = props.productFunctionType.productFunctions.map(productFunction => (
        <Grid className={"form-control-label-item"} item={true} spacing={1}
              key={productFunction.productFunctionId}>
            <FormControlLabel
                checked={productFunctionCheckBoxMap.has(productFunction.productFunctionId) ?
                    productFunctionCheckBoxMap.get(productFunction.productFunctionId) :
                    false
                }
                control={
                    <Checkbox onChange={(event) => {
                        const isChecked = productFunctionCheckBoxMap.has(productFunction.productFunctionId) ?
                            productFunctionCheckBoxMap.get(productFunction.productFunctionId) :
                            false;

                        mixpanel.track(
                            "productFunctionSelect",
                            {
                                "productFunctionType": props.productFunctionType.productFunctionTypeName,
                                "productFunction": productFunction.productFunctionName,
                                "isChecked": !isChecked
                            }
                        );

                        dispatch(setProductFunctionFilterWrapper({
                            productFunctionTypeId:props.productFunctionType.productFunctionTypeId,
                            productFunctionId:productFunction.productFunctionId,
                            isChecked: isChecked,
                            productFunctionTypeName: props.productFunctionType.productFunctionTypeName
                        }))
                        dispatch(setProductFunctionCheckBoxMap(productFunction.productFunctionId))
                        props.onFilterChange()
                    }

                    }
                    />
                }
                label={productFunction.productFunctionName}
            />
        </Grid>
    ));

    return (
        <div>
            <Accordion
                style={{marginTop:13}} square={true}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className="product-function-check-box-accordian-summary"

                >
                                <span  >
                                    <b>{props.productFunctionType.productFunctionTypeName}</b>
                                </span>

                </AccordionSummary>
                <AccordionDetails>
                    <Grid className={"form-control-label-container"} container={true} justifyContent={"center"}>
                        {checkBoxes}
                    </Grid>
                </AccordionDetails>
            </Accordion>


        </div>
    )
}

export default ProductFunctionCheckBoxContainer