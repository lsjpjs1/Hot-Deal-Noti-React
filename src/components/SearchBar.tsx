import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, {useEffect, useState} from "react";
import "./SearchBar.css"
import {ProductDto} from "../common/productDto";
import {
    callGetProductFunctionTypes,
    callGetProductInitData,
    callGetProducts,
    setManufacturerId,
    setModelName
} from "../modules/product";
import {Autocomplete} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { BrowserView, MobileView } from 'react-device-detect'
import {
    callGetHotDeals,
    callGetInitData,
    setDiscountRateFilter,
    setIsShowReturnItem,
    setPage,
    setProductPurposeId,
    setSort,
    setSourceSites
} from "../modules/hotDeal";
import {RootState} from "../modules";
import SearchIcon from '@material-ui/icons/Search';
import {Container, Modal, Typography} from "@material-ui/core";
import HotDealSortingSelect from "./HotDealSortingSelect";
import ProductPurposeSelect from "./ProductPurposeSelect";
import ManufacturerSelect from "./ManufacturerSelect";
import SourceSiteCheckBoxGroup from "./SourceSiteCheckBoxGroup";
import FilterListIcon from '@material-ui/icons/FilterList';
import mixpanel from "mixpanel-browser";
import {RETURN_ITEM_SEARCH_MODE} from "../containers/ReturnHotDealsContainer";
import DiscountRateFilter from "./DiscountRateFilter";
import ProductFunctionFilter from "./filter/ProductFunctionFilter";

type SearchBarProps = {
    onSearch: (s: string) => void;
    onSearchTextChange: (s: string) => void;
}

const SearchBar = (searchBarProps: SearchBarProps) => {

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.productReducer.products);
    const searchMode = useSelector((state: RootState) => state.hotDealReducer.searchMode);
    const [searchBody, setSearchBody] = useState("");
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [open, setOpen] = useState(false);
    const closePopper = () => setOpen(false);
    const openPopper = () => setOpen(true);

    const getReturnHotDeals = () => {
        dispatch(setIsShowReturnItem(true))
        // @ts-ignore
        dispatch(callGetHotDeals(true))
    }

    const onHotDealSortingSelect = (sort: string) => {
        dispatch(setSort(sort))
        goFirstPage()
        if (searchMode==RETURN_ITEM_SEARCH_MODE){
            getReturnHotDeals()
        }else {
            getHotDeals()
        }
    }


    const onSliderChange = (valueList: number|number[]) => {

        // @ts-ignore
        mixpanel.track("discountFilterChange", {"minDiscountRate": valueList[0], "maxDiscountRate":valueList[1]});
        // @ts-ignore
        dispatch(setDiscountRateFilter(valueList[0],valueList[1]))
        goFirstPage()
        if (searchMode==RETURN_ITEM_SEARCH_MODE){
            getReturnHotDeals()
        }else {
            getHotDeals()
        }
    }

    const onProductPurposeSelect = (productPurposeId: number) => {

        dispatch(setProductPurposeId(productPurposeId))
        goFirstPage()
        if (searchMode==RETURN_ITEM_SEARCH_MODE){
            getReturnHotDeals()
        }else {
            getHotDeals()
        }
    }

    const onManufacturerSelect = (manufacturerId: number) => {
        dispatch(setManufacturerId(manufacturerId))
        goFirstPage()
        if (searchMode==RETURN_ITEM_SEARCH_MODE){
            getReturnHotDeals()
        }else {
            getHotDeals()
        }
    }

    const onCheckBoxClick = (checked: boolean, sourceSite: string) => {
        if (checked){
            mixpanel.track(
                "sourceSiteSelect",
                {
                    "sourceSiteName": sourceSite
                }
            );
        }

        dispatch(setSourceSites(checked, sourceSite))
        goFirstPage()
        if (searchMode==RETURN_ITEM_SEARCH_MODE){
            getReturnHotDeals()
        }else {
            getHotDeals()
        }
    }

    const onFilterChange = () => {

        goFirstPage()
        if (searchMode==RETURN_ITEM_SEARCH_MODE){
            getReturnHotDeals()
        }else {
            getHotDeals()
        }
    }

    const goFirstPage = () => {
        dispatch(setPage(0))
    }

    const getHotDeals = () => {
        // @ts-ignore
        dispatch(callGetHotDeals())
    }

    const SearchButton = () => (
        <InputAdornment
            position={"end"}
            style={{cursor: "pointer"}}
            onClick={(e) => {
                searchBarProps.onSearch(searchBody)
            }}>
            <SearchIcon/>
        </InputAdornment>
    )

    useEffect(() => {

        // @ts-ignore
        dispatch(callGetInitData())

        // @ts-ignore
        dispatch(callGetProductInitData())
        // @ts-ignore
        dispatch(callGetProductFunctionTypes())
    }, []);

    return (
        <div>
        <BrowserView>
        <div className={"search"}>

            <Autocomplete
                freeSolo={true}
                options={products}
                groupBy={(option: ProductDto) => option.manufacturer}
                // @ts-ignore
                getOptionLabel={(option: ProductDto | string) => typeof option == "object" ? option.fullModelName : option}
                // @ts-ignore
                onChange={(event, value: ProductDto) => {
                    mixpanel.track(
                        "showProductPriceHistoryInSearch",
                        {
                            "productId": value.productId,
                            "productName": value.modelName
                        }
                    );
                    window.open(`/hot-deals/product/${value.productId}`, '_blank')
                }}
                inputValue={searchBody}
                onInputChange={(event, inputValue: string) => {
                    setSearchBody(inputValue)

                    if (inputValue != "") {
                        dispatch(setModelName(inputValue))
                        // @ts-ignore
                        dispatch(callGetProducts())
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        // Prevent's default 'Enter' behavior.
                        // @ts-ignore
                        event.defaultMuiPrevented = true;
                        // your handler code
                        searchBarProps.onSearch(searchBody)
                        closePopper()
                    }
                }}

                open={open}
                onOpen={openPopper}
                onClose={closePopper}
                disableClearable={true}
                style={{display: 'inline-block', width: "320px"}}
                renderInput={(params) =>
                    <TextField {...params}
                               InputProps={{
                                   ...params.InputProps,
                                   endAdornment: <SearchButton/>
                               }}
                               variant={"outlined"} label="검색"/>
                }
            />
            <IconButton style={{color: "black", marginLeft: "22px"}}
                        onClick={() => {
                            mixpanel.track(
                                "filterClick"
                            );
                            setIsOpenFilter(true)
                        }}
            >
                
                <img className={"naver-logo-image"} src={"/image/icon/filter.png"}/><Typography style={{color:"#4D4D4D", marginLeft:"6px"}}>필터</Typography>
            </IconButton>

            <Modal
                open={isOpenFilter}
                onClose={() => {
                    setIsOpenFilter(false)
                }}
                style={{alignItems:"center",display:"flex",justifyContent:"center"}}
            >
                <div style={{backgroundColor:"white", borderRadius: "14px",padding:"30px",height:"80%", overflowY:"auto"
                    }}>


                    <div>

                        <Container maxWidth={"sm"} >
                            <HotDealSortingSelect onSelect={onHotDealSortingSelect}></HotDealSortingSelect>
                            <ProductPurposeSelect onSelect={onProductPurposeSelect}></ProductPurposeSelect>
                            <ManufacturerSelect onSelect={onManufacturerSelect}></ManufacturerSelect>
                            <SourceSiteCheckBoxGroup onCheckBoxClick={onCheckBoxClick}></SourceSiteCheckBoxGroup>
                            <DiscountRateFilter onSliderChange={onSliderChange}></DiscountRateFilter>
                            <ProductFunctionFilter onFilterChange={onFilterChange}/>
                        </Container>
                    </div>

                </div>

            </Modal>

        </div>
        </BrowserView>
        <MobileView>
        <div className={"search"}>

            <Autocomplete
                freeSolo={true}
                options={products}
                groupBy={(option: ProductDto) => option.manufacturer}
                // @ts-ignore
                getOptionLabel={(option: ProductDto | string) => typeof option == "object" ? option.fullModelName : option}
                // @ts-ignore
                onChange={(event, value: ProductDto) => {
                    mixpanel.track(
                        "showProductPriceHistoryInSearch",
                        {
                            "productId": value.productId,
                            "productName": value.modelName
                        }
                    );
                    window.open(`/hot-deals/product/${value.productId}`, '_blank')
                }}
                inputValue={searchBody}
                onInputChange={(event, inputValue: string) => {
                    setSearchBody(inputValue)

                    if (inputValue != "") {
                        dispatch(setModelName(inputValue))
                        // @ts-ignore
                        dispatch(callGetProducts())
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        // Prevent's default 'Enter' behavior.
                        // @ts-ignore
                        event.defaultMuiPrevented = true;
                        // your handler code
                        searchBarProps.onSearch(searchBody)
                        closePopper()
                    }
                }}

                open={open}
                onOpen={openPopper}
                onClose={closePopper}
                disableClearable={true}
                style={{display: 'inline-block', width: "320px"}}
                renderInput={(params) =>
                    <TextField {...params}
                               InputProps={{
                                   ...params.InputProps,
                                   endAdornment: <SearchButton/>
                               }}
                               variant={"outlined"} label="검색"/>
                }
            />
            <IconButton style={{color: "black", marginLeft: "3px"}}
                        onClick={() => {
                            mixpanel.track(
                                "filterClick"
                            );
                            setIsOpenFilter(true)
                        }}
            >
                
                <img className={"naver-logo-image"} src={"/image/icon/filter.png"}/>
            </IconButton>

            <Modal
                open={isOpenFilter}
                onClose={() => {
                    setIsOpenFilter(false)
                }}
                style={{alignItems:"center",display:"flex",justifyContent:"center"}}
            >
                <div style={{backgroundColor: "white", borderRadius: "14px",padding:"30px",height:"70%", overflowY:"scroll"
                    }}>


                    <div>

                        <Container maxWidth={"sm"}>
                            <HotDealSortingSelect onSelect={onHotDealSortingSelect}></HotDealSortingSelect>
                            <ProductPurposeSelect onSelect={onProductPurposeSelect}></ProductPurposeSelect>
                            <ManufacturerSelect onSelect={onManufacturerSelect}></ManufacturerSelect>
                            <SourceSiteCheckBoxGroup onCheckBoxClick={onCheckBoxClick}></SourceSiteCheckBoxGroup>
                            <DiscountRateFilter onSliderChange={onSliderChange}></DiscountRateFilter>
                            <ProductFunctionFilter onFilterChange={onFilterChange}/>
                        </Container>
                    </div>

                </div>

            </Modal>

        </div>
        </MobileView>
        </div>
    )
}


export default SearchBar
