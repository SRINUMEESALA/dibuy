
import { TechCardContainer, CardNumberContainer } from "./styledComponent"

const TechCard = (props) => {
    const { imageUrl, description, index, price } = props.eachCard
    const { borderColors } = props
    console.log("in tech card")
    return (
        <TechCardContainer borderColor={borderColors[index]} direction={index % 2 === 0 ? "to bottom" : "to top"} className="card d-flex flex-column justify-content-around align-items-center mb-5 m-1">
            <img alt="" className={`cardImage w-75`} src={imageUrl} />
            <p className="w-75 text-center">{description.slice(0, 60)}...</p>
            <CardNumberContainer index={index} className="shadow-lg rounded-pill cardNoCon h6 d-flex justify-content-center align-items-center">Rs.{price}</CardNumberContainer>
        </TechCardContainer>
    )
}


export default TechCard