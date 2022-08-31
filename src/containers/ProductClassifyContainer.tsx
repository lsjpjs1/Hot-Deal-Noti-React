import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {callGetInitData, callGetNotClassifiedHotDeals, callPostConnectionHistory} from "../modules/hotDeal";
import NotClassifiedHotDealListView from "../components/classifyproduct/NotClassifiedHotDealListView";
import {callGetProductInitData, callGetProducts} from "../modules/product";

const ProductClassifyContainer = () => {

    const dispatch = useDispatch();
    const notClassifiedHotDeals = useSelector((state: RootState) => state.hotDealReducer.notClassifiedHotDeals);
    const productInitData = useSelector((state: RootState) => state.productReducer.productInitData);
    const products = useSelector((state: RootState) => state.productReducer.products);


    useEffect(() => {
        // @ts-ignore
        dispatch(callGetNotClassifiedHotDeals())
        // @ts-ignore
        dispatch(callGetProductInitData())

    }, []);

    return (
        <div>
            <NotClassifiedHotDealListView products={products} notClassifiedHotDeals={notClassifiedHotDeals} productInitData={productInitData}></NotClassifiedHotDealListView>
        </div>
    )
}

export default ProductClassifyContainer;