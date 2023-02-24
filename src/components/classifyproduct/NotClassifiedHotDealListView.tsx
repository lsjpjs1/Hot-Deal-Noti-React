import {NotClassifiedHotDeal} from "../../common/hotDealDto";
import moment from "moment";
import {Autocomplete, Button, createFilterOptions, MenuItem, Select, TextField} from "@mui/material";
import {ProductDto, ProductInitData} from "../../common/productDto";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    callClassifyHotDeal,
    callGetProducts,
    setHotDealId,
    setManufacturerId,
    setManufacturerName,
    setModelName,
    setProductId,
    setProductPurposeId,
    setProductTypeId
} from "../../modules/product";
import {RootState} from "../../modules";
import {callDeleteHotDeal, callDeletePermanentHotDeal, callGetNotClassifiedHotDeals} from "../../modules/hotDeal";
import {Typography} from "@material-ui/core";
import {postRecommendationHotDeal} from "../../api/hotDealApi";
import {getProductFamilies} from "../../api/recommendationApi";
import {notClassifyHotDeal, passHotDeal} from "../../api/productApi";

moment.locale("ko");

type Props = {
    notClassifiedHotDeals: NotClassifiedHotDeal[],
    productInitData: ProductInitData,
    products: ProductDto[]
}

const NotClassifiedHotDealListView = (props: Props) => {

    const dispatch = useDispatch();
    const productInitData = useSelector((state: RootState) => state.productReducer.productInitData);
    const classifyHotDealRequest = useSelector((state: RootState) => state.productReducer.classifyHotDealRequest);

    const callPassHotDeal = async (hotDealId: number) => {
        await passHotDeal(hotDealId).then((res) => {

        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    const callNotClassifyHotDeal = async (hotDealId: number) => {
        await notClassifyHotDeal(hotDealId).then((res) => {

        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    const [hotDealsIsShowingMap, setHotDealsIsShowingMap] = React.useState(new Map<number, boolean>());

    const filterOptions = createFilterOptions({
        stringify: (option:ProductDto) => option.fullModelName + option.modelName
    });

    const [inputValueMap, setInputValueMap] = React.useState(new Map<number, string>());

    const hotDealElements = props.notClassifiedHotDeals.map((notClassifiedHotDeals) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var inputValue
        if(!inputValueMap.has(notClassifiedHotDeals.hotDealId)){
            inputValue = notClassifiedHotDeals.candidateProductName!=undefined?notClassifiedHotDeals.candidateProductName:""
            inputValueMap.set(notClassifiedHotDeals.hotDealId,inputValue)
        }

        if (!hotDealsIsShowingMap.has(notClassifiedHotDeals.hotDealId)) {
            hotDealsIsShowingMap.set(notClassifiedHotDeals.hotDealId, true)
        }
        const productPurposeMenuItems = productInitData!=null? productInitData.productPurposes.map((productPurpose) => {
            return (
                <MenuItem value={productPurpose.productPurposeId}>{productPurpose.productPurposeName}</MenuItem>
            )
        }):(<div></div>)

        const productTypeMenuItems =
            productInitData!=null? productInitData.productTypes.map((productType) => {
                return (
                    <MenuItem value={productType.productTypeId}>{productType.productTypeName}</MenuItem>
                )
            }):(<div></div>)



        return (
            <div>

                {hotDealsIsShowingMap.get(notClassifiedHotDeals.hotDealId) && <div style={{marginBottom: "30px"}}>
                    <div>

                        <Typography style={{
                            display: 'inline-block',
                            marginLeft: '10px'
                        }}>{moment(notClassifiedHotDeals.hotDealUploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}</Typography>




                        <Button onClick={async (e)=>{
                            postRecommendationHotDeal(notClassifiedHotDeals.hotDealId)
                        }}>
                            <Typography style={{
                                color:"green"
                            }}>
                                추천
                            </Typography>
                        </Button>

                        <Button
                            style={{
                                display: 'inline-block',
                                marginLeft: '10px'
                            }}
                            onClick={() => {
                                // @ts-ignore
                                dispatch(callDeleteHotDeal(notClassifiedHotDeals.hotDealId))

                                // @ts-ignore
                                setHotDealsIsShowingMap((prevState) => new Map(prevState).set(notClassifiedHotDeals.hotDealId, false))
                            }}>
                            삭제
                        </Button>
                        <Button
                            style={{
                                display: 'inline-block',
                                marginLeft: '50px',
                                color: 'red'
                            }}
                            onClick={() => {
                                // @ts-ignore
                                dispatch(callDeletePermanentHotDeal(notClassifiedHotDeals.hotDealId))

                                // @ts-ignore
                                setHotDealsIsShowingMap((prevState) => new Map(prevState).set(notClassifiedHotDeals.hotDealId, false))
                            }}>
                            영구 삭제
                        </Button>
                        <Typography>{notClassifiedHotDeals.hotDealDiscountRate}{"%↓"}</Typography>
                        <Typography style={{display: 'inline-block'}}>{notClassifiedHotDeals.hotDealDiscountPrice.toLocaleString() + "원"}</Typography>
                        <Typography style={{display: 'inline-block'}}>{" <- "}</Typography>
                        <Typography style={{
                            display: 'inline-block',
                            textDecoration: "line-through"
                        }}>{notClassifiedHotDeals.hotDealOriginalPrice.toLocaleString()}</Typography>
                    </div>
                    <Typography>{notClassifiedHotDeals.hotDealTitle}</Typography>
                    <a href={notClassifiedHotDeals.hotDealLink} target={"_blank"}>
                        {notClassifiedHotDeals.hotDealLink}
                    </a>
                    <div>
                        <Autocomplete
                            filterOptions={filterOptions}
                            freeSolo={true}
                            options={props.products}
                            inputValue={inputValueMap.get(notClassifiedHotDeals.hotDealId)}
                            // @ts-ignore
                            getOptionLabel={(option: ProductDto | string) => typeof option == "object" ? option.modelName : option}
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
                                inputValueMap.set(notClassifiedHotDeals.hotDealId,inputValue)
                                setInputValueMap(inputValueMap)
                            }}
                            onFocus={(a)=>{
                                dispatch(setModelName(a.target.textContent))
                                // @ts-ignore
                                dispatch(callGetProducts())
                            }}
                            sx={{width: 600}}
                            renderInput={(params) =>
                                <TextField {...params}
                                           label="모델명" variant={"standard"}/>}
                        />
                        <Button onClick={()=>{window.open(`https://search.danawa.com/dsearch.php?k1=${inputValueMap.get(notClassifiedHotDeals.hotDealId)}&module=goods&act=dispMain`, '_blank')}}>다나와검색</Button>
                        <Autocomplete
                            freeSolo={true}
                            options={props.products}
                            // @ts-ignore
                            getOptionLabel={(option: ProductDto | string) => typeof option == "object" ? option.manufacturer : option}
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
                                setHotDealsIsShowingMap((prevState) => new Map(prevState).set(notClassifiedHotDeals.hotDealId, false))
                            }}>
                            등록
                        </Button>

                        <Button
                            style={{marginLeft:"100px",color:"goldenrod"}}
                            onClick={() => {
                                dispatch(setHotDealId(notClassifiedHotDeals.hotDealId))

                                callPassHotDeal(notClassifiedHotDeals.hotDealId)

                                // @ts-ignore
                                setHotDealsIsShowingMap((prevState) => new Map(prevState).set(notClassifiedHotDeals.hotDealId, false))
                            }}>
                            통과
                        </Button>

                        <Button
                            style={{marginLeft:"100px",color:"grey"}}
                            onClick={() => {
                                dispatch(setHotDealId(notClassifiedHotDeals.hotDealId))

                                callNotClassifyHotDeal(notClassifiedHotDeals.hotDealId)

                                // @ts-ignore
                                setHotDealsIsShowingMap((prevState) => new Map(prevState).set(notClassifiedHotDeals.hotDealId, false))
                            }}>
                            분류불가
                        </Button>


                    </div>
                </div>}

            </div>

        )
    })


    return (
        <div style={{textAlign: "center"}}>
            {process.env["REACT_APP_SERVER_BASE_URL"] != "https://api.whendiscount.com" ?
                <Typography style={{color: "red"}}>Production 아님!!!!!!!!!! 환경 변수 바꾸셈</Typography> :
                <Typography style={{color: "blue"}}>Production 서버가 맞습니다</Typography>}
            {hotDealElements}
        </div>
    )
}

export default NotClassifiedHotDealListView