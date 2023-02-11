import {useDispatch} from "react-redux";
import {Card, CardContent, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {ProductFamilies} from "../../common/recommendationDto";
import RecommendationProductListView from "./RecommendationProductListView";

type Props = {
    productFamilies: ProductFamilies[]
}

const ProductFamilyListView = (productFamilyProps: Props) => {
    const dispatch = useDispatch()


    useEffect(() => {

    }, []);

    const productFamilyElements = productFamilyProps.productFamilies.map((productFamilies) => {
        return (
            <div style={{marginBottom: "30px", marginTop: "30px",flex:"0 0 auto"}} key={productFamilies.productFamily.productFamilyId}>

                <Card variant={"outlined"}>
                    <CardContent>
                        <Typography>
                            {productFamilies.productFamily.productFamilyName}
                        </Typography>
                        <Typography style={{whiteSpace:"pre-wrap"}}>
                            {productFamilies.productFamily.productFamilyDescription}
                        </Typography>
                        <RecommendationProductListView products={productFamilies.products}/>
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

export default ProductFamilyListView