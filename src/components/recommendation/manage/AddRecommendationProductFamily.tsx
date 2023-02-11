import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {ProductFamily, ProductPurposeDetail} from "../../../common/recommendationDto";
import {
    getProductFamilies,
    getProductPurposeDetails,
    postRecommendationProductFamily
} from "../../../api/recommendationApi";
import {Autocomplete, Button, createFilterOptions, TextField} from "@mui/material";
import {FormControl, NativeSelect} from "@material-ui/core";

const AddRecommendationProductFamily = () => {

    const dispatch = useDispatch();
    const [productFamilyId, setProductFamilyId] = useState<number>(null);
    let [productPurposeDetailId, setProductPurposeDetailId] = useState<number>(null);
    const [productFamilies, setProductFamilies] = useState<ProductFamily[]>([])
    const [productPurposeDetails, setProductPurposeDetails] = useState<ProductPurposeDetail[]>([])

    useEffect(() => {
        callGetProductPurposeDetails()
    }, []);
    const callGetProductFamily = async (productFamilyName: string) => {
        await getProductFamilies({productFamilyName: productFamilyName}).then((res) => {
            setProductFamilies(res.data.productFamilies)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    const callGetProductPurposeDetails = async () => {
        await getProductPurposeDetails().then((res) => {
            setProductPurposeDetails(res.data.productPurposeDetails)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    const callPostRecommendationProductFamily = async () =>{
        await postRecommendationProductFamily(
            {productPurposeDetailId: productPurposeDetailId, productFamilyId: productFamilyId}
        ).then((res) => {
            window.location.reload()
        }).catch((error) => {
            console.log(error.response.data)
            alert(error.response.data)
        })
    }

    return (
        <div style={{marginLeft: "50px"}}>
            상세용도 - 제품군
            <br/>
            <Autocomplete
                filterOptions={createFilterOptions({
                    stringify: (option: ProductFamily) => option.productFamilyName
                })}
                freeSolo={true}
                options={productFamilies}
                // @ts-ignore
                getOptionLabel={(option: ProductFamily | string) => typeof option == "object" ? option.productFamilyName : option}
                // @ts-ignore
                onChange={(event, value: ProductFamily) => {
                    setProductFamilyId(value.productFamilyId)
                }}
                onInputChange={async (event, inputValue: string) => {
                    await callGetProductFamily(inputValue)
                }}
                sx={{width: 300}}
                renderInput={(params) =>
                    <TextField {...params}
                               label="제품군" variant={"standard"}/>}
            />
            <br/>
            <FormControl fullWidth>
                <NativeSelect
                    defaultValue={productPurposeDetailId}
                    onChange={(event) => setProductPurposeDetailId(parseInt(event.target.value))}
                    inputProps={{
                        name: '상세용도',
                        id: 'uncontrolled-native',
                    }}
                >
                    {productPurposeDetails.map((productPurposeDetail, idx) => {
                        if (idx==0){
                            productPurposeDetailId=productPurposeDetail.productPurposeDetailId
                        }
                        return (
                            <option
                                key={productPurposeDetail.productPurposeDetailId}
                                value={productPurposeDetail.productPurposeDetailId}>{productPurposeDetail.productPurposeDetailTitle}</option>
                        )
                    })}
                </NativeSelect>
            </FormControl>

            <Button
                onClick={async () => {
                    await callPostRecommendationProductFamily()
                }}>
                확인
            </Button>
        </div>
    )
}

export default AddRecommendationProductFamily