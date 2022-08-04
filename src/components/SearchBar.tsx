import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {useState} from "react";
import Button from "@material-ui/core/Button";
import "./SearchBar.css"
type SearchBarProps = {
    onSearch: (s: string) => void;
    onSearchTextChange: (s: string) => void ;
}

const SearchBar = (searchBarProps: SearchBarProps) => {

    const [searchBody, setSearchBody] = useState("");
    const onEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if (e.code == "Enter") {
            searchBarProps.onSearch(searchBody)
        }

    }

    return (
        <div className={"search"}>
            <TextField
                className={"search"}
                style={{display:'inline-block'}}
                placeholder={"검색어"}
                onKeyDown={onEnterPress}
                onChange={(e) => {
                    searchBarProps.onSearchTextChange(e.target.value)
                    setSearchBody(e.target.value)
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={"start"}>
                            <IconButton>
                            </IconButton>
                        </InputAdornment>
                    )
                }}>
            </TextField>
            <Button onClick={()=>searchBarProps.onSearch(searchBody)} className={"search"} variant={"contained"} color="primary" style={{display:'inline-block'}}>검색</Button>
        </div>
    )
}

export default SearchBar