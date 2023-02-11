import {useDispatch} from "react-redux";
import {Button, Card, CardContent, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {ProductFamilies, UpdateProductFamilyRequest} from "../../common/recommendationDto";
import {updateProductFamily} from "../../api/recommendationApi";
import ManageRecommendationProductListView from "./ManageRecommendationProductListView";

type Props = {
    productFamilies: ProductFamilies[]
}

const ManageProductFamilyListView = (productFamilyProps: Props) => {
    const dispatch = useDispatch()
    const [productFamilyDescriptionMap, setProductFamilyDescription] = React.useState(new Map<number, string>());

    useEffect(() => {

    }, []);

    const callUpdateProductFamily = async (updateProductFamilyRequest: UpdateProductFamilyRequest) => {
        await updateProductFamily(updateProductFamilyRequest).then((res) => {
            alert("수정완료")
        }).catch((error) => {
            alert("수정실패 : "+error.toString())
        })
    }

    const productFamilyElements = productFamilyProps.productFamilies.map((productFamilies) => {


        if(!productFamilyDescriptionMap.has(productFamilies.productFamily.productFamilyId)){
            productFamilyDescriptionMap.set(
                productFamilies.productFamily.productFamilyId,
                productFamilies.productFamily.productFamilyDescription
            )
        }

        return (
            <div style={{marginBottom: "30px", marginTop: "30px",flex:"0 0 auto"}} key={productFamilies.productFamily.productFamilyId}>

                <Card variant={"outlined"}>
                    <CardContent>
                        <Typography>
                            {productFamilies.productFamily.productFamilyName}
                        </Typography>
                        <TextField
                            value={productFamilyDescriptionMap.get(productFamilies.productFamily.productFamilyId)}
                            multiline={true}
                            fullWidth={true}
                            onChange={(event)=>{
                                productFamilyDescriptionMap.set(productFamilies.productFamily.productFamilyId,event.target.value)
                                setProductFamilyDescription(new Map(productFamilyDescriptionMap))
                            }}
                            inputProps={{style:{resize:"both",minWidth:"600px"}}}
                        />
                        <Button
                        onClick={async (e)=>{
                            await callUpdateProductFamily({
                                productFamilyId: productFamilies.productFamily.productFamilyId,
                                productFamilyDescription: productFamilyDescriptionMap.get(productFamilies.productFamily.productFamilyId)
                            })
                        }}
                        >
                            저장
                        </Button>
                        <ManageRecommendationProductListView products={productFamilies.products}/>
                    </CardContent>
                </Card>

            </div>
        )
    })

    return (
        <div style={{display:"flex",flexWrap:"nowrap",overflowX:"auto"}}>
            {productFamilyElements}
        </div>
    )
}

export default ManageProductFamilyListView