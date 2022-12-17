import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import {HotDealPreview} from "../common/hotDealDto";
import {useSelector} from "react-redux";
import {RootState} from "../modules";

type Props = {
    onCheckBoxClick:(checked:boolean,sourceSite:string) => void
}
const SourceSiteCheckBoxGroup = (props: Props) => {

    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);

    const checkBoxes = Array.from(getHotDealRequest.sourceSitesMap).map(([key, value])=>{
        return (
            <FormControlLabel
                checked={value}
            control={<Checkbox onChange={(event)=>props.onCheckBoxClick(event.target.checked,key)} />}
            label={key}
            />
        )
    })
    return (
        <FormGroup >
            <div>
                {checkBoxes}
                 </div>
        </FormGroup>

    )
}

export default SourceSiteCheckBoxGroup;