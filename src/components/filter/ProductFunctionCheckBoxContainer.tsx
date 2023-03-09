import {HotDealPreview} from "../../common/hotDealDto";
import {GetProductFunctionTypeDTO, SetProductFunctionFilterDTO} from "../../common/productDto";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../modules";
import {callGetInitData, setProductFunctionCheckBoxMap, setProductFunctionFilterWrapper} from "../../modules/hotDeal";
import mixpanel from "mixpanel-browser";
import productFunctionFilter from "./ProductFunctionFilter";

type ProductFunctionCheckBoxContainerProps = {
    productFunctionType: GetProductFunctionTypeDTO,
    onFilterChange: ()=>void
}

const ProductFunctionCheckBoxContainer = (props: ProductFunctionCheckBoxContainerProps) => {
    const dispatch = useDispatch();
    const productFunctionCheckBoxMap = useSelector((state: RootState) => state.hotDealReducer.productFunctionCheckBoxMap);
    const checkBoxes = props.productFunctionType.productFunctions.map(productFunction => (
        <div >
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
                            isChecked: isChecked
                        }))
                        dispatch(setProductFunctionCheckBoxMap(productFunction.productFunctionId))
                        props.onFilterChange()
                    }

                    }
                    />
                }
                label={productFunction.productFunctionName}
            />
        </div>
    ));

    return (
        <div>
            <b>{props.productFunctionType.productFunctionTypeName}</b>
            <div style={{display:"flex"}}>
                {checkBoxes}
            </div>
        </div>
    )
}

export default ProductFunctionCheckBoxContainer