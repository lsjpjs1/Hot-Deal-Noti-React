import {useEffect, useState} from "react";
import {getClassifyProduct} from "../api/productApi";
import {ClassifyProduct} from "../common/productDto";

const ProductClassifyContainer = () => {

    const [classifyProducts, setClassifyProducts] = useState<ClassifyProduct[]>([]);

    useEffect(() => {
        getClassifyProduct().then((res) => {
            setClassifyProducts(res.data.classifyProducts)
        }).catch((error) => {
            console.log(error.response.data)
        })
    }, []);

    const classifyProductElements = classifyProducts.map((classifyProduct)=>{
        return (<div>
            {classifyProduct.modelName}
            <div dangerouslySetInnerHTML={{
                __html: classifyProduct.productInfoCandidateHtml
            }}>
            </div>
        </div>)
    })

    return (<div>
        {classifyProductElements}
    </div>)
}

export default ProductClassifyContainer