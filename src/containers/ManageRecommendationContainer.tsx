import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import AddProductFamily from "../components/recommendation/manage/AddProductFamily";
import ProductToProductFamily from "../components/recommendation/manage/ProductToProductFamily";
import AddRecommendationProductFamily from "../components/recommendation/manage/AddRecommendationProductFamily";
import ManageRecommendationListView from "../components/recommendation/ManageRecommendationListView";


const ManageRecommendationContainer = () => {

    const dispatch = useDispatch();



    useEffect(() => {
    }, []);




    return (
        <div>
            <div style={{flexDirection:"row",display:"flex"}}>

                <AddProductFamily/>
                <ProductToProductFamily/>
                <AddRecommendationProductFamily/>

            </div>
            <ManageRecommendationListView/>
        </div>

    )
}

export default ManageRecommendationContainer;