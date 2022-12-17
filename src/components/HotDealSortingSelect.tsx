import {Box, FormControl, InputLabel, NativeSelect} from "@material-ui/core";
import SortingType from "../enum/SortingType";
import "./HotDealSortingSelect.css"
import mixpanel from "mixpanel-browser";
import {useSelector} from "react-redux";
import {RootState} from "../modules";
type HotDealSortingSelectProps = {
    onSelect:(value:string)=>void
}
const HotDealSortingSelect = (props: HotDealSortingSelectProps) => {

    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);
    return (
        <Box style={{display:'inline-block', marginLeft:"20px"}} sx={{ minWidth: 50,maxWidth:130 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    정렬
                </InputLabel>
                <NativeSelect
                    onChange={(event)=>{

                        mixpanel.track(
                            "hotDealSortingSelect",
                            {
                                "sortingOptionName": event.target.value}
                        );
                        props.onSelect(event.target.value)
                    }}
                    defaultValue={getHotDealRequest.pageRequest.sort}
                    inputProps={{
                        name: '정렬',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={SortingType.DISCOUNT_RATE_DESC}>할인율</option>
                    <option value={SortingType.VIEW_COUNT_DESC}>조회수</option>
                    <option value={SortingType.PRICE_ASC}>낮은 가격순</option>
                    <option value={SortingType.PRICE_DESC}>높은 가격순</option>
                    <option value={SortingType.UPLOAD_TIME_DESC}>최신순</option>
                </NativeSelect>
            </FormControl>
        </Box>
    )
}


export default HotDealSortingSelect