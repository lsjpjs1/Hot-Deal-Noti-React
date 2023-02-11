import {useDispatch} from "react-redux";
import {List, ListItemButton} from "@mui/material";
import React, {useEffect} from "react";
import {Products} from "../../common/recommendationDto";

type Props = {
    products: Products[]
}
const RecommendationProductListView = (recommendationProductProps: Props) => {
    const dispatch = useDispatch()


    useEffect(() => {

    }, []);

    const recommendationProductElements = recommendationProductProps.products.map((product) => {
        return (
            <ListItemButton style={{marginBottom: "30px", marginTop: "30px"}} key={product.productId}
            onClick={()=>{
                window.open(`/hot-deals/product/${product.productId}`,'_blank')
            }}
            >

                {product.modelName}<br/>
                {product.minHotDealPrice&&("특가 : "+product.minHotDealPrice)}

            </ListItemButton>
        )
    })

    return (
        <div style={{textAlign: "center"}}>
            <List>
                {recommendationProductElements}
            </List>

        </div>
    )
}

export default RecommendationProductListView