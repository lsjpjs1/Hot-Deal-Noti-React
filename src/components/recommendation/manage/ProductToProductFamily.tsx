import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {PostProductFamilyRequest, ProductFamilies, ProductFamily} from "../../../common/recommendationDto";
import {Autocomplete, Button, createFilterOptions, TextField} from "@mui/material";
import {callPostProductFamily, getRecommendationsSuccess} from "../../../modules/recommendation";
import {GetProductsRequest, ProductDto} from "../../../common/productDto";
import {callGetProducts, setModelName, setProductId} from "../../../modules/product";
import {getProductFamilies, getRecommendations, setProductFamily} from "../../../api/recommendationApi";
import {getProducts} from "../../../api/productApi";



const ProductToProductFamily = () => {

    const dispatch = useDispatch();


    const [productFamilyId, setProductFamilyId] = useState<number>(null);
    const [productId, setProductId] = useState<number>(null);

    const [productFamilies, setProductFamilies] = useState<ProductFamily[]>([])
    const [products, setProducts] = useState<ProductDto[]>([])
    useEffect(() => {

    }, []);



    const callGetProductFamily = async (productFamilyName:string) =>{
        await getProductFamilies({productFamilyName:productFamilyName}).then((res) => {
            setProductFamilies(res.data.productFamilies)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    const callGetProduct = async (modelName:string) =>{
        await getProducts({modelName:modelName,manufacturer:null}).then((res) => {
            setProducts(res.data.products)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    const callSetProductFamily = async () =>{
        await setProductFamily({productId:productId, productFamilyId: productFamilyId}).then((res) => {
            window.location.reload()
        }).catch((error) => {
            console.log(error.response.data)
            alert(error.response.data)
        })
    }




    return (
        <div style={{marginLeft:"50px"}}>
            제품 - 제품군에 추가
            <br/>
            <Autocomplete
                filterOptions={createFilterOptions({
                    stringify: (option:ProductFamily) => option.productFamilyName
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
            <Autocomplete
                filterOptions={createFilterOptions({
                    stringify: (option:ProductDto) => option.fullModelName + option.modelName
                })}
                freeSolo={true}
                options={products}
                // @ts-ignore
                getOptionLabel={(option: ProductDto | string) => typeof option == "object" ? option.fullModelName : option}
                // @ts-ignore
                onChange={(event, value: ProductDto) => {
                    setProductId(value.productId)
                }}
                onInputChange={async (event, inputValue: string) => {
                    await callGetProduct(inputValue)
                }}
                sx={{width: 300}}
                renderInput={(params) =>
                    <TextField {...params}
                               label="모델명" variant={"standard"}/>}
            />
            <br/>
            <Button
                onClick={async ()=>{
                    await callSetProductFamily()
                }}>
                확인
            </Button>
        </div>
    )
}

export default ProductToProductFamily;