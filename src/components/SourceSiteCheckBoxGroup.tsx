import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import {HotDealPreview} from "../common/hotDealDto";

type Props = {
    onCheckBoxClick:(checked:boolean,sourceSite:string) => void
}
const SourceSiteCheckBoxGroup = (props: Props) => {
    return (
        <FormGroup style={{display:'inline-block'}}>
            <div>
                <FormControlLabel control={<Checkbox onChange={(event)=>props.onCheckBoxClick(event.target.checked,"11번가")} />} label="11번가" />
                <FormControlLabel control={<Checkbox onChange={(event)=>props.onCheckBoxClick(event.target.checked,"G마켓")} />} label="G마켓" />
            </div>
            <div>
                <FormControlLabel control={<Checkbox onChange={(event)=>props.onCheckBoxClick(event.target.checked,"롯데ON")} />} label="롯데ON" />
                <FormControlLabel control={<Checkbox onChange={(event)=>props.onCheckBoxClick(event.target.checked,"옥션")} />} label="옥션" />
            </div>
        </FormGroup>

    )
}

export default SourceSiteCheckBoxGroup;