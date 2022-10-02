import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import "./SearchBar.css"
import {ProductDto} from "../common/productDto";
import {callGetProducts, setManufacturerId, setManufacturerName, setModelName} from "../modules/product";
import {Autocomplete} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {callGetHotDealsByProductId, setProductIdForSearch} from "../modules/hotDeal";
import {RootState} from "../modules";

type SearchBarProps = {
    onSearch: (s: string) => void;
    onSearchTextChange: (s: string) => void;
}

const SearchBar = (searchBarProps: SearchBarProps) => {

    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.productReducer.products);
    const [searchBody, setSearchBody] = useState("");
    const [open, setOpen] = useState(false);
    const closePopper = () => setOpen(false);
    const openPopper = () => setOpen(true);

    return (
        <div className={"search"} style={{display: 'inline-block'}}>

            <Autocomplete
                freeSolo={true}
                options={products}
                groupBy={(option: ProductDto) => option.manufacturer}
                // @ts-ignore
                getOptionLabel={(option: ProductDto|string) =>typeof option=="object"?option.fullModelName:option}
                // @ts-ignore
                onChange={(event, value: ProductDto) => {
                    dispatch(setProductIdForSearch(value.productId))
                    // @ts-ignore
                    dispatch(callGetHotDealsByProductId())
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
                style={{display: 'inline-block',width:300}}
                renderInput={(params) => <TextField {...params} label="검색" variant={"standard"}/>}
            />

            <Button
                style={{display: 'inline-block',marginTop:20}}
                onClick={() => {
                searchBarProps.onSearch(searchBody)
            }} variant={"contained"} color="primary">
                검색
            </Button>
        </div>
    )
}

export default SearchBar