import {Button, Input} from "@material-ui/core";
import {useState} from "react";
import axiosInstance from "../api";
import {Page} from "../common/page";
import {HotDealPreview} from "../common/hotDealDto";
import {getHotDealsSuccess, getReturnHotDealsSuccess, setIsShowReturnItem} from "../modules/hotDeal";

const TestContainer = () => {

    const [searchBody, setSearchBody] = useState("");

    return(
        <div>
            <Input style={{width:"1000px"}} value={searchBody} onChange={(e)=>{
                setSearchBody(e.target.value)
            }}></Input>
            <Button
            onClick={()=>{
                axiosInstance.post(`https://api.openai.com/v1/completions`,
                    {
                        model:"text-davinci-003",
                        prompt:"한글로 모델명 추출\n\n"+searchBody,
                        max_tokens:100,
                        temperature:0.8
                    },{
                    headers: {
                        "Authorization": "Bearer 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"
                    }
                }).then((res) => {
                    console.log(res.data)
                    alert(res.data.choices[0].text)
                })
            }}>
                모델명 추출
            </Button>
        </div>
    )
}

export default TestContainer