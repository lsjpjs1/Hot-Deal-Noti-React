import {callGetProductFunctionTypes, callGetProductInitData} from "../../modules/product";
import {useEffect} from "react";
import {callGetInitData} from "../../modules/hotDeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../modules";
import ProductFunctionCheckBoxContainer from "./ProductFunctionCheckBoxContainer";
import {GetProductFunctionTypeDTO} from "../../common/productDto";

type ProductFunctionCheckBoxContainerProps = {
    onFilterChange: ()=>void
}

const ProductFunctionFilter = (props: ProductFunctionCheckBoxContainerProps) => {

    const dispatch = useDispatch()
    const productFunctionTypes = useSelector((state: RootState) => state.productReducer.productFunctionTypes);


        const productFunctionCheckBoxContainers = productFunctionTypes.map(productFunctionType =>
            (<ProductFunctionCheckBoxContainer productFunctionType={productFunctionType} onFilterChange={props.onFilterChange}/>)
        );

    return (
        <div style={{marginTop:20}}>
            {productFunctionCheckBoxContainers}
        </div>
    )
}

export default ProductFunctionFilter
