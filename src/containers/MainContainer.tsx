import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {
    callGetHotDeals,
    callPostConnectionHistory,
    callViewHotDeal,
    setPage,
    setSearchBody,
    setSort
} from "../modules/hotDeal";
import '../App.css'
import HotDealListView from "../components/HotDealListView";
import PageView from "../components/PageView";
import SearchBar from "../components/SearchBar";
import Button from "@material-ui/core/Button";
import HotDealSortingSelect from "../components/HotDealSortingSelect";
import sortingType from "../enum/SortingType";

const MainContainer = () => {

    const PAGE_SIZE = 40;
    const dispatch = useDispatch();
    const hotDeals = useSelector((state: RootState) => state.hotDealReducer.hotDeals);
    const totalPages = useSelector((state: RootState) => state.hotDealReducer.totalPages);
    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);

    useEffect(() => {
        // @ts-ignore
        dispatch(callPostConnectionHistory())
        getHotDeals()
    }, []);


    const onPageChange = (page:{selected:number}) => {
        dispatch(setPage(page.selected))
        getHotDeals()
        window.scrollTo(0, 0);
    }

    const getHotDeals = () => {
        // @ts-ignore
        dispatch(callGetHotDeals())
    }

    const onSearch = (s:string) => {
        dispatch(setSearchBody(s))
        goFirstPage()
        getHotDeals()
    }

    const goFirstPage= () => {
        dispatch(setPage(0))
    }

    const onSearchTextChange = (s:string) => {
    }

    const hotDealLinkOnClick = (hotDealId:number) => {
        // @ts-ignore
        dispatch(callViewHotDeal({hotDealId:hotDealId}))
    }

    const onHotDealSortingSelect = (sort:string) => {
        dispatch(setSort(sort))
        goFirstPage()
        getHotDeals()
    }



    return (
        <div  style={{textAlign:"center",marginTop:"50px",marginBottom:"50px"}}>
            <Button>
                <img onClick={()=>{window.location.replace("/")}} style={{width:"300px",height:"200"}} src={require("../image/특가언제떠.jpeg")}/>
            </Button>
            <div>
                <SearchBar onSearch={onSearch} onSearchTextChange={onSearchTextChange}></SearchBar>
                <HotDealSortingSelect onSelect={onHotDealSortingSelect}></HotDealSortingSelect>
            </div>
            <HotDealListView hotDeals={hotDeals} hotDealLinkOnClick={hotDealLinkOnClick}></HotDealListView>
            <PageView currentPage={getHotDealRequest.pageRequest.page} onPageChange={onPageChange} totalPageCount={totalPages}></PageView>
        </div>
    )
};

export default MainContainer;