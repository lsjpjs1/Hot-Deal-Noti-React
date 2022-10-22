import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import {useEffect} from "react";
import {callGetHotDeals, callPostConnectionHistory, callViewHotDeal, setSearchBody} from "../modules/hotDeal";
import '../App.css'
import HotDealListView from "../components/HotDealListView";
import PageView from "../components/PageView";
import SearchBar from "../components/SearchBar";
import Button from "@material-ui/core/Button";

const ServerMaintenanceContainer = () => {


    return (
        <div>
            <h1>
                서버 점검 중
            </h1>
            <h2>이용에 불편을 드려 죄송합니다.</h2>
        </div>
    )
};

export default ServerMaintenanceContainer;