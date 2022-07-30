import {HotDealPreview} from "../common/hotDealDto";

type Props = {
    hotDeals: HotDealPreview[]
}

const HotDealListView = (props: Props) => {
    const hotDealElements = props.hotDeals.map((hotDeal)=>{
        return (
            <div style={{marginBottom:"30px"}}>
                <div >
                    <h1 >{hotDeal.discountRate}{"%"}</h1>
                    <h1 style={{display:'inline-block'}} >{hotDeal.discountPrice.toLocaleString()+"원"}</h1>
                    <h3 style={{display:'inline-block'}}>{" <- "}</h3>
                    <h3 style={{display:'inline-block',textDecoration:"line-through"}}>{hotDeal.originalPrice.toLocaleString()}</h3>
                </div>
                <a href={hotDeal.link}>
                    {hotDeal.title}
                </a>
            </div>
        )
    })

    return (
        <div>
            {hotDealElements}
        </div>
    )
}

export default HotDealListView