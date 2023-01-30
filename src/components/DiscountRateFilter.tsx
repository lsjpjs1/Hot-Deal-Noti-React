import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    NativeSelect,
    Slider,
    Typography
} from "@material-ui/core";
import SortingType from "../enum/SortingType";
import "./HotDealSortingSelect.css"
import {useSelector} from "react-redux";
import {RootState} from "../modules";
import {useState} from "react";
import mixpanel from "mixpanel-browser";
type DiscountRateFilterProps = {
    onSliderChange:(valueList: number|number[])=>void
}
const DiscountRateFilter = (props: DiscountRateFilterProps) => {


    const [value, setValue] = useState<number|number[]>([15, 100]);
    const marks = [
        {
            value: 15,
            label: '15%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];

    return (
        <div style={{ marginLeft:"20px",padding:"5px",background:"lightgrey",borderRadius:"14px",display:"flex",flexDirection:"column",alignItems:"center"}}>

            <Typography>
                할인율
            </Typography>
            <Slider
                style={{maxWidth:"80%"}}
                value={value}
                min={15}
                max={100}
                step={5}
                marks={marks}
                onChange={(event,newValue)=>{
                    setValue(newValue)
                }}
                onChangeCommitted={(event,newValue)=>{
                    props.onSliderChange(newValue)
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"

            />
        </div>
    )
}


export default DiscountRateFilter