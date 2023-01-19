
import ProductItem from "../ProductItem"
import { v4 as uuidv4 } from "uuid"
import "./index.css"

const ProductsList = (props) => {
    const { productsList } = props

    return (
        <ul className="productCardsCon p-2 d-flex flex-wrap overflow-auto list-unstyled text-secondary">
            {productsList.map(obj => <ProductItem key={uuidv4()} eachProduct={obj} />)}
        </ul>
    )
}

export default ProductsList