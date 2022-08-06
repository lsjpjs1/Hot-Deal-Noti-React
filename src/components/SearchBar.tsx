import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
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
        <div className={"search"} style={{display:'inline-block'}}>
            <TextField
                className={"search"}
                style={{display:'inline-block'}}
                onKeyDown={onEnterPress}
                onChange={(e) => {
                    searchBarProps.onSearchTextChange(e.target.value)
                    setSearchBody(e.target.value)
                }}
                label="검색어"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={"start"}>
                            <Button onClick={()=>{searchBarProps.onSearch(searchBody)}} variant={"contained"} color="primary">
                                검색
                            </Button>
                        </InputAdornment>
                    )
                }}>
            </TextField>
        </div>
    )
}

export default SearchBar