import MainHeader from "../components/header/MainHeader";
import KakaoLoginButton from "../components/login/KakaoLoginButton";
import React, {useEffect} from "react";
import {kakaoLogin} from "../api/authApi";
import {useNavigate} from "react-router";
import {
    callGetFavoriteHotDeals, callGetHotDeals,
    callGetHotDealsByHotDealId, callGetHotDealsByProductId,
    callGetInitData, callGetRecommendationHotDeals,
    callPostConnectionHistory,
    callViewHotDeal, setIsShowReturnItem, setPage, setProductIdForSearch, setSearchMode
} from "../modules/hotDeal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../modules";
import HotDealListView from "../components/HotDealListView";
import {callGetProductInitData} from "../modules/product";
import PageView from "../components/PageView";
import mixpanel from "mixpanel-browser";
import {clearProductFamily} from "../api/recommendationApi";
import {getProductsRanking} from "../api/productApi";
import {GetProductsRankingDTO} from "../common/productDto";
import {Chip, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
export const RETURN_ITEM_SEARCH_MODE = "RETURN_ITEM"
const RecommendationHotDealsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const returnHotDeals = useSelector((state: RootState) => state.hotDealReducer.returnHotDeals);
    const [productsRankingMap, setProductsRankingMap] = React.useState(new Map<number, Array<GetProductsRankingDTO>>());
    const [toggleAlignment, setToggleAlignment] = React.useState('게이밍');

    const productPurposeMap = new Map([["게이밍",1],["사무용",2]]);
    useEffect(() => {


        callGetProductsRanking(1)
        callGetProductsRanking(2)

    }, []);

    console.log(productsRankingMap)
    const callGetProductsRanking = async (productPurposeId: number) => {
        await getProductsRanking({productPurposeId:productPurposeId}).then((res) => {
            const newMap = new Map(productsRankingMap.set(productPurposeId,res.data.productsRankingDTOList));
            setProductsRankingMap(newMap)
        }).catch((error) => {
            console.log(error)
        })
    }

    const rankingTable = (productPurposeId: number) =>
        (
            <TableContainer  component={Paper} style={{maxWidth:"400px"}}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>순위</TableCell>
                            <TableCell >제품명</TableCell>
                        </TableRow>
                    </TableHead>
                    {productsRankingMap.get(productPurposeId).map((productsRankingDTO)=>
                        <TableRow hover={true} key={productsRankingDTO.productRankingNumber}>
                            <TableCell component="th" scope="row">
                                {productsRankingDTO.productRankingNumber}
                            </TableCell>
                            <TableCell
                                onClick={()=>{
                                    navigate(`/hot-deals/product/${productsRankingDTO.productId}`)
                                }}
                            >{productsRankingDTO.modelName}</TableCell>
                        </TableRow>
                    )}

                </Table>
            </TableContainer>
        )

    const toggleButtonGroup = () => (
        <ToggleButtonGroup
            value={toggleAlignment}
            exclusive
            onChange={(event, newAlignment)=>{
                if (newAlignment!=null){
                    setToggleAlignment(newAlignment)
                }
            }}
            aria-label="text alignment"
        >
            <ToggleButton value="게이밍" aria-label="left aligned" >
                <Typography>
                    게이밍
                </Typography>
            </ToggleButton>
            <ToggleButton value="사무용" aria-label="centered">
                <Typography>
                    사무용
                </Typography>
            </ToggleButton>

        </ToggleButtonGroup>
    )


    return(
        <div  style={{textAlign: "center", marginBottom: "50px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

            <div style={{display:"flex",width:"100%"}}>
                <Typography style={{
                    textAlign: "left",
                    marginLeft: "100px",
                    marginTop: "30px",
                    fontSize: "30px",
                    fontWeight: "bold",
                    marginBottom: "5px"
                }}>
                    인기 순위 🏆
                </Typography>
            </div>
            <div style={{display:"flex",width:"100%"}}>
                <Typography style={{
                    textAlign: "left",
                    marginLeft: "100px",
                    fontSize: "16px",
                    marginBottom: "5px",
                    color: "grey"
                }}>
                    노출수 대비 조회수로 매긴 순위입니다. 참고용으로만 봐주세요 :)
                </Typography>
            </div>

            {toggleButtonGroup()}
            {productsRankingMap.has(productPurposeMap.get(toggleAlignment))&&rankingTable(productPurposeMap.get(toggleAlignment))}
        </div>
    )
}

export default RecommendationHotDealsContainer