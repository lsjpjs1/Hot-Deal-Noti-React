import {HotDealPreview, NotClassifiedHotDeal} from "../../common/hotDealDto";
import moment from "moment";
import {Autocomplete, Button, MenuItem, Select, TextField} from "@mui/material";
import {ClassifyHotDealRequest, ProductDto, ProductInitData} from "../../common/productDto";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    callClassifyHotDeal, callGetProducts,
    setHotDealId,
    setManufacturerId,
    setManufacturerName,
    setModelName,
    setProductId, setProductPurposeId, setProductTypeId
} from "../../modules/product";
import {RootState} from "../../modules";

moment.locale("ko");

type Props = {
    notClassifiedHotDeals: NotClassifiedHotDeal[],
    productInitData: ProductInitData,
    products: ProductDto[]
}

const NotClassifiedHotDealListView = (props: Props) => {

    const dispatch = useDispatch();


    const [hotDealsIsShowingMap, setHotDealsIsShowingMap] = React.useState(new Map<number,boolean>());


    const hotDealElements = props.notClassifiedHotDeals.map((notClassifiedHotDeals)=>{
        if(!hotDealsIsShowingMap.has(notClassifiedHotDeals.hotDealId)){
            hotDealsIsShowingMap.set(notClassifiedHotDeals.hotDealId, true)
        }
        const productPurposeMenuItems = props.productInitData.productPurposes.map((productPurpose)=>{
            return (
                <MenuItem value={productPurpose.productPurposeId}>{productPurpose.productPurposeName}</MenuItem>
            )
        })

        const productTypeMenuItems = props.productInitData.productTypes.map((productType)=>{
            return (
                <MenuItem value={productType.productTypeId}>{productType.productTypeName}</MenuItem>
            )
        })


        return (
            <div>

                {hotDealsIsShowingMap.get(notClassifiedHotDeals.hotDealId)&&<div style={{marginBottom: "30px"}}>
                    <div>

                        <h4 style={{
                            display: 'inline-block',
                            marginLeft: '10px'
                        }}>{moment(notClassifiedHotDeals.hotDealUploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}</h4>
                        <h2>{notClassifiedHotDeals.hotDealDiscountRate}{"%↓"}</h2>
                        <h2 style={{display: 'inline-block'}}>{notClassifiedHotDeals.hotDealDiscountPrice.toLocaleString() + "원"}</h2>
                        <h3 style={{display: 'inline-block'}}>{" <- "}</h3>
                        <h3 style={{
                            display: 'inline-block',
                            textDecoration: "line-through"
                        }}>{notClassifiedHotDeals.hotDealOriginalPrice.toLocaleString()}</h3>
                    </div>
                    <h3>{notClassifiedHotDeals.hotDealTitle}</h3>
                    <a href={notClassifiedHotDeals.hotDealLink} target={"_blank"}>
                        {notClassifiedHotDeals.hotDealLink}
                    </a>
                    <div>
                        <Autocomplete
                            freeSolo={true}
                            options={props.products}
                            // @ts-ignore
                            getOptionLabel={(option: ProductDto|string) =>typeof option=="object"?option.modelName:option}
                            // @ts-ignore
                            onChange={(event, value: ProductDto) => {
                                dispatch(setProductId(value.productId))
                            }}
                            onInputChange={async (event, inputValue: string) => {
                                if (inputValue != "") {
                                    dispatch(setModelName(inputValue))
                                    // @ts-ignore
                                    dispatch(callGetProducts())
                                }
                            }}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params} label="모델명" variant={"standard"}/>}
                        />
                        <Autocomplete
                            freeSolo={true}
                            options={props.products}
                            // @ts-ignore
                            getOptionLabel={(option: ProductDto|string) =>typeof option=="object"?option.manufacturer:option}
                            // @ts-ignore
                            onChange={(event, value: ProductDto) => {
                                dispatch(setManufacturerId(value.manufacturerId))
                            }}
                            onInputChange={(event, inputValue: string) => {
                                if (inputValue != "") {
                                    dispatch(setManufacturerName(inputValue))
                                    // @ts-ignore
                                    dispatch(callGetProducts())
                                }
                            }}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params} label="제조사" variant={"standard"}/>}
                        />

                        <Select defaultValue={""}
                                onChange={(event, child) => {
                                    dispatch(setProductPurposeId(parseInt(event.target.value)))
                                }}
                        >
                            {productPurposeMenuItems}
                        </Select>

                        <Select defaultValue={""}
                                onChange={(event, child) => {
                                    dispatch(setProductTypeId(parseInt(event.target.value)))
                                }}
                        >
                            {productTypeMenuItems}
                        </Select>


                        <Button
                            onClick={() => {
                                dispatch(setHotDealId(notClassifiedHotDeals.hotDealId))
                                // @ts-ignore
                                dispatch(callClassifyHotDeal())

                                // @ts-ignore
                                setHotDealsIsShowingMap((prevState)=> new Map(prevState).set(notClassifiedHotDeals.hotDealId,false))
                            }}>
                            등록
                        </Button>


                    </div>
                </div>}

            </div>

        )
    })



    return (
        <div style={{textAlign:"center"}}>
            {process.env["REACT_APP_SERVER_BASE_URL"]!="https://api.whendiscount.com"?<h1 style={{color:"red"}}>Production 아님!!!!!!!!!! 환경 변수 바꾸셈</h1>:<h1 style={{color:"blue"}}>Production 서버가 맞습니다</h1>}
            {hotDealElements}
        </div>
    )
}

export default NotClassifiedHotDealListView