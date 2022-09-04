import {HotDealPreview} from "../common/hotDealDto";
import moment from "moment";

moment.locale("ko");

type Props = {
    hotDeals: HotDealPreview[],
    hotDealLinkOnClick: (hotDealId: number) => void
}

const HotDealListView = (props: Props) => {
    const hotDealElements = props.hotDeals.map((hotDeal) => {
        return (
            <div style={{marginBottom: "30px",marginTop:"30px"}}>
                <div>
                    <div>
                        <h3 style={{display: 'inline-block', marginLeft: '10px'}}>{hotDeal.modelName}</h3>
                        {hotDeal.productId != 1 && <div>
                            <h3 style={{display: 'inline-block'}}>{hotDeal.manufacturer}</h3>
                            <h3 style={{display: 'inline-block', marginLeft: '10px'}}>{hotDeal.productPurpose}</h3>
                        </div>}

                    </div>
                    <h4 style={{display: 'inline-block'}}>{hotDeal.sourceSite}</h4>
                    <h4 style={{
                        display: 'inline-block',
                        marginLeft: '10px'
                    }}>{moment(hotDeal.uploadTime, 'YYYYMMDDHHmmss z').add(9, "h").fromNow()}</h4>
                    <h4 style={{display: 'inline-block', marginLeft: '10px'}}>{"조회: " + hotDeal.viewCount}</h4>
                    <h2>{hotDeal.discountRate}{"%↓"}</h2>
                    <h2 style={{display: 'inline-block'}}>{hotDeal.discountPrice.toLocaleString() + "원"}</h2>
                    <h3 style={{display: 'inline-block'}}>{" <- "}</h3>
                    <h3 style={{
                        display: 'inline-block',
                        textDecoration: "line-through"
                    }}>{hotDeal.originalPrice.toLocaleString()}</h3>
                </div>
                {
                    hotDeal.isDelete
                    ?
                    <del >
                        {hotDeal.title}
                    </del>
                    :
                    <a href={hotDeal.link} onClick={() => props.hotDealLinkOnClick(hotDeal.hotDealId)}
                       target={"_blank"}>
                        {hotDeal.title}
                    </a>
                }

            </div>
        )
    })

    return (
        <div style={{textAlign: "center"}}>
            {hotDealElements}
        </div>
    )
}

export default HotDealListView