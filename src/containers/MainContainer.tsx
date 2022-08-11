import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {
    callGetHotDeals, callGetInitData,
    callPostConnectionHistory,
    callViewHotDeal,
    setPage,
    setSearchBody,
    setSort, setSourceSites
} from "../modules/hotDeal";
import '../App.css'
import HotDealListView from "../components/HotDealListView";
import PageView from "../components/PageView";
import SearchBar from "../components/SearchBar";
import Button from "@material-ui/core/Button";
import HotDealSortingSelect from "../components/HotDealSortingSelect";
import moment from 'moment';
import 'moment/locale/ko';
import sortingType from "../enum/SortingType";
import SourceSiteCheckBoxGroup from "../components/SourceSiteCheckBoxGroup";

const MainContainer = () => {

    const PAGE_SIZE = 40;
    const dispatch = useDispatch();
    const hotDeals = useSelector((state: RootState) => state.hotDealReducer.hotDeals);
    const totalPages = useSelector((state: RootState) => state.hotDealReducer.totalPages);
    const getHotDealRequest = useSelector((state: RootState) => state.hotDealReducer.getHotDealRequest);
    const initData = useSelector((state: RootState) => state.hotDealReducer.initData);

    console.log(getHotDealRequest)


    useEffect(() => {
        // @ts-ignore
        dispatch(callPostConnectionHistory())
        // @ts-ignore
        dispatch(callGetInitData())
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

    const onCheckBoxClick = (checked:boolean, sourceSite: string) => {
        dispatch(setSourceSites(checked,sourceSite))
        goFirstPage()
        getHotDeals()
    }



    return (
        <div  style={{textAlign:"center",marginTop:"50px",marginBottom:"50px"}}>
            <Button>
                <img onClick={()=>{window.location.replace("/")}} style={{width:"300px",height:"200"}} src={require("../image/IMG_0385.PNG")}/>
            </Button>
            {initData!=null &&
                <div>
                    <h3>{"공지사항: "+initData.notice}</h3>
                    <h3>{"최근 업데이트: "+ moment(initData.recentUpdateTime, 'YYYYMMDDHHmmss z').add(9,"h").format('YYYY-MM-DD HH:mm:ss')}</h3>
                </div>
            }

            <div>
                <SourceSiteCheckBoxGroup onCheckBoxClick={onCheckBoxClick}></SourceSiteCheckBoxGroup>
                <SearchBar onSearch={onSearch} onSearchTextChange={onSearchTextChange}></SearchBar>
                <HotDealSortingSelect onSelect={onHotDealSortingSelect}></HotDealSortingSelect>
            </div>
            <HotDealListView hotDeals={hotDeals} hotDealLinkOnClick={hotDealLinkOnClick}></HotDealListView>
            <PageView currentPage={getHotDealRequest.pageRequest.page} onPageChange={onPageChange} totalPageCount={totalPages}></PageView>
        </div>
    )
};

export default MainContainer;