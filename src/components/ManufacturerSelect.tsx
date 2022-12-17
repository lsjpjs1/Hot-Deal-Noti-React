import {Box, Checkbox, FormControl, FormControlLabel, InputLabel, NativeSelect} from "@material-ui/core";
import SortingType from "../enum/SortingType";
import "./HotDealSortingSelect.css"
import {useSelector} from "react-redux";
import {RootState} from "../modules";
import {useState} from "react";
import mixpanel from "mixpanel-browser";
type ManufacturerSelectProps = {
    onSelect:(value:number)=>void
}
const ManufacturerSelect = (props: ManufacturerSelectProps) => {
    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);
    const productInitData = useSelector((state: RootState) => state.productReducer.productInitData);
    let options
    if(productInitData!=null){
        options = productInitData.manufacturers.map((manufacturer)=>{
            if(manufacturer.manufacturerId!=0){
                return (
                    <option value={manufacturer.manufacturerId} key={manufacturer.manufacturerId}>{manufacturer.manufacturerName}</option>
                )
            }

        })
    }

    return (
        <Box style={{display:'inline-block', marginLeft:"20px"}} sx={{ minWidth: 50,maxWidth:130 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    제조사
                </InputLabel>
                <NativeSelect
                    defaultValue={getHotDealRequest.filter.manufacturerId}
                    onChange={(event)=>{
                        const selectedTarget = event.target
                        mixpanel.track(
                            "manufacturerSelect",
                            {
                                "manufacturerName": selectedTarget.options[selectedTarget.selectedIndex].innerHTML}
                        );
                        props.onSelect(parseInt(event.target.value))}}
                    inputProps={{
                        name: '제조사',
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


export default ManufacturerSelect