import { TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {callPostCustomerRequirement, setCustomerRequirementBody} from "../modules/hotDeal";
import {useState} from "react";
import {Button, Container} from "@material-ui/core";

const CustomerRequirementInput = () => {
    const dispatch = useDispatch();
    const [customerRequirementBody, customerRequirementBodySet] = useState("");
    const onSendButtonClick = () => {
        dispatch(setCustomerRequirementBody(customerRequirementBody))
        // @ts-ignore
        dispatch(callPostCustomerRequirement())
    }
    return (
        <Container style={{textAlign:"center", marginTop:5}}>
            <h4 >
                이용 중 불편한 부분이나 원하시는 기능이 있으시면 여기에 남겨주세요! 빠르게 반영하겠습니다!
            </h4>
            <TextField
                style={{display: 'inline-block'}}
                onChange={(event) => {
                    customerRequirementBodySet(event.target.value)
                }}
                label="요청사항" variant="standard"/>
            <Button style={{display: 'inline-block', marginTop: 10, marginLeft: 2}}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => onSendButtonClick()}>확인</Button>
        </Container>
    )
}

export default CustomerRequirementInput