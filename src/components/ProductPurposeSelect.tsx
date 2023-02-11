import {Box, FormControl, InputLabel, NativeSelect} from "@material-ui/core";
import "./HotDealSortingSelect.css"
import {useSelector} from "react-redux";
import {RootState} from "../modules";
import mixpanel from "mixpanel-browser";

type ProductPurposeSelectProps = {
    onSelect:(value:number)=>void
}
const ProductPurposeSelect = (props: ProductPurposeSelectProps) => {
    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);
    const productInitData = useSelector((state: RootState) => state.productReducer.productInitData);
    let options
    if(productInitData!=null){
        options = productInitData.productPurposes.map((productPurpose)=>{
            if(productPurpose.productPurposeId!=0){
                return (
                    <option value={productPurpose.productPurposeId} key={productPurpose.productPurposeId}>{productPurpose.productPurposeName}</option>
                )
            }

        })
    }

    return (
        <Box style={{display:'inline-block', marginLeft:"20px"}} sx={{ minWidth: 50,maxWidth:130 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    제품 용도
                </InputLabel>
                <NativeSelect
                    defaultValue={getHotDealRequest.filter.productPurposeId}
                    onChange={(event)=>{

                        const selectedTarget = event.target
                        mixpanel.track(
                            "productPurposeSelect",
                            {
                                "productPurposeName": selectedTarget.options[selectedTarget.selectedIndex].innerHTML}
                        );
                        props.onSelect(parseInt(event.target.value))}}
                    inputProps={{
                        name: '제품 용도',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={null}>모두</option>
                    {options}
                </NativeSelect>
            </FormControl>
        </Box>
    )
}


export default ProductPurposeSelect