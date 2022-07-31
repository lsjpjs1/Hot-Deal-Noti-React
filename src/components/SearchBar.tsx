import TextField from "@mui/material/TextField";
import {IconButton, InputAdornment} from "@mui/material";

type SearchBarProps = {
    onSearch: () => void ;
    onSearchTextChange: (s:string) => void ;
}

const SearchBar = (searchBarProps: SearchBarProps) => {

    const onEnterPress = (e:React.KeyboardEvent<HTMLDivElement>) => {

        if(e.code=="Enter") {
            searchBarProps.onSearch()
        }

    }

    return (
        <div>
            <TextField
                placeholder={"검색"}
                onKeyDown={onEnterPress}
                onChange={(e)=>searchBarProps.onSearchTextChange(e.target.value)}
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