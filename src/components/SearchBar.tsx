import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {useState} from "react";

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
        <div>
            <TextField
                placeholder={"검색"}
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
        </div>
    )
}

export default SearchBar