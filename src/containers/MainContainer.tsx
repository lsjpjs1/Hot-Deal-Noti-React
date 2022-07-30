import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {callGetHotDeals} from "../modules/hotDeal";
import '../App.css'
import HotDealListView from "../components/HotDealListView";
import PageView from "../components/PageView";

const MainContainer = () => {

    const PAGE_SIZE = 40;
    const dispatch = useDispatch();
    const hotDeals = useSelector((state: RootState) => state.hotDealReducer.hotDeals);
    const totalPages = useSelector((state: RootState) => state.hotDealReducer.totalPages);

    useEffect(() => {
        getHotDeals(0)
    }, []);

    const onPageChange = (page:{selected:number}) => {
        getHotDeals(page.selected)
    }

    const getHotDeals = (page: number) => {
        // @ts-ignore
        dispatch(callGetHotDeals({
            pageRequest: {
                page: page,
                size: PAGE_SIZE,
                sort: "DISCOUNT_RATE"
            }
        }))
    }

    return (
        <div>
            <HotDealListView hotDeals={hotDeals}></HotDealListView>
            <PageView onPageChange={onPageChange} totalPageCount={totalPages}></PageView>
        </div>
    )
};

export default MainContainer;