import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {callGetHotDeals, setSearchBody} from "../modules/hotDeal";
import '../App.css'
import HotDealListView from "../components/HotDealListView";
import PageView from "../components/PageView";
import SearchBar from "../components/SearchBar";
import {Simulate} from "react-dom/test-utils";
import {Button} from "@mui/material";

const MainContainer = () => {

    const PAGE_SIZE = 40;
    const dispatch = useDispatch();
    const hotDeals = useSelector((state: RootState) => state.hotDealReducer.hotDeals);
    const totalPages = useSelector((state: RootState) => state.hotDealReducer.totalPages);
    const filter = useSelector((state: RootState) => state.hotDealReducer.filter);

    useEffect(() => {
        getHotDeals(0)
    }, []);

    useEffect(() => {
        getHotDeals(0)
    }, [filter.searchBody]);

    const onPageChange = (page:{selected:number}) => {
        getHotDeals(page.selected)
        window.scrollTo(0, 0);
    }

    const getHotDeals = (page: number) => {
        // @ts-ignore
        dispatch(callGetHotDeals({
            pageRequest: {
                page: page,
                size: PAGE_SIZE,
                sort: "DISCOUNT_RATE"
            },
            filter:filter
        }))
    }

    const onSearch = (s:string) => {
        dispatch(setSearchBody(s))
    }

    const onSearchTextChange = (s:string) => {
    }

    return (
        <div  style={{textAlign:"center",marginTop:"50px",marginBottom:"50px"}}>
            <Button>
                <img onClick={()=>{window.location.replace("/")}} style={{width:"300px",height:"200"}} src={require("../image/특가언제떠.jpeg")}/>
            </Button>
            <SearchBar onSearch={onSearch} onSearchTextChange={onSearchTextChange}></SearchBar>
            <HotDealListView hotDeals={hotDeals}></HotDealListView>
            <PageView onPageChange={onPageChange} totalPageCount={totalPages}></PageView>
        </div>
    )
};

export default MainContainer;