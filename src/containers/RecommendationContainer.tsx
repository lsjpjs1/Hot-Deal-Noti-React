import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import RecommendationListView from "../components/recommendation/RecommendationListView";


const RecommendationContainer = () => {

    const dispatch = useDispatch();



    useEffect(() => {
    }, []);




    return (
        <div>
            <RecommendationListView/>
        </div>
    )
}

export default RecommendationContainer;