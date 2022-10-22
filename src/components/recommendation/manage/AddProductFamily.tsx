import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {PostProductFamilyRequest} from "../../../common/recommendationDto";
import {Button, TextField} from "@mui/material";
import {callPostProductFamily} from "../../../modules/recommendation";



const AddProductFamily = () => {

    const dispatch = useDispatch();
    const [postProductFamilyRequest, setPostProductFamilyRequest] = useState<PostProductFamilyRequest>({
        productFamilyName:"",
        productFamilyDescription: ""
    });

    const initState = () =>{
        setPostProductFamilyRequest({
            productFamilyName:"",
            productFamilyDescription: ""
        })
    }


    useEffect(() => {
        initState()
    }, []);





    return (
        <div>
            제품군 추가
            <br/>
            <TextField
                label={"이름"}
                value={postProductFamilyRequest.productFamilyName}
                onChange={(e)=>{
                    setPostProductFamilyRequest({
                        ...postProductFamilyRequest,
                        productFamilyName:e.target.value
                    })
                }}
            />
            <br/>
            <TextField
                label={"설명"}
                value={postProductFamilyRequest.productFamilyDescription}
                multiline={true}
                onChange={(e)=>{
                    setPostProductFamilyRequest({
                        ...postProductFamilyRequest,
                        productFamilyDescription:e.target.value
                    })
                }}
            />
            <br/>
            <Button
                onClick={()=>{
                    // @ts-ignore
                    dispatch(callPostProductFamily(postProductFamilyRequest))
                    initState()
                }}>
                확인
            </Button>
        </div>
    )
}

export default AddProductFamily;