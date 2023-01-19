import "./index.css"
/* eslint-disable react/no-unknown-property */
import { Component } from 'react'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'

const apiStatusConstants = {
    fail: "Failed",
    success: "Successful",
    load: "Loading"
}
class ProductItemDetails extends Component {
    state = {
        productDet: {},
        apiStatus: 'initial',
        count: 1
    }

    componentDidMount() {
        this.fetchProductDetails()
    }

    fetchProductDetails = async () => {
        this.setState({ apiStatus: apiStatusConstants.load })
        const { match } = this.props
        const { params } = match
        const { id } = params
        const response = await fetch(`http://localhost:4000/product/${id}`)
        if (response.ok) {
            let data = await response.json()
            data = data.product
            this.setState({ productDet: data, apiStatus: apiStatusConstants.success })
        } else {
            this.setState({ apiStatus: apiStatusConstants.fail })
        }
    }

    changeQuantity = who => {
        const { count } = this.state
        switch (who) {
            case 'plus':
                this.setState({ count: count + 1 })
                break

            default:
                if (count > 1) {
                    this.setState({ count: count - 1 })
                }
        }
    }

    renderFailureView = () => (
        <div className="failview min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div>
                <div className="text-center">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                        alt="products failure"
                        className="sizeFailure"
                    />
                </div>
                <h1 className="text-center">Something Went Wrong.</h1>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.fetchProductDetails}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center vh-100"
            testid="loader"
        >
            <Loader type="BallTriangle" color="#FF5454" height={50} width={50} />
        </div>
    )

    renderSuccessView = () => {
        const { productDet, count } = this.state
        const {
            title,
            description,
            imageUrl,
            price,
            quality,
            quantity,
        } = productDet
        return (
            <div className="d-flex flex-row justify-content-center p-2 mt-4">
                <div className="itemParentCon">
                    <div className=" d-flex ">
                        <div className="itemImg col-6 text-center">
                            <img src={imageUrl} alt="product" className="imagepord" />
                        </div>
                        <div className="d-flex flex-column p-2 justify-content-around">
                            <h1 className="h3">{title}</h1>
                            <p className="h5">Rs.{price}</p>
                            <div className="d-flex">
                                <button
                                    type="button"
                                    className="btn btn-warning d-flex p-1"
                                >
                                    <p className="align-self-center pr-1 m-0">{quality}</p>
                                    <img
                                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                                        alt="star"
                                        className="starimg"
                                    />
                                </button>
                            </div>
                            <p className="m-1"></p>
                            <p>
                                <span className="font-weight-bold">Brand: </span>
                                {title}
                            </p>
                            <p>
                                <span className="font-weight-bold">Availability: </span>
                                {quantity}
                            </p>
                            <p>
                                <span className="font-weight-bold">About: </span>
                                {description}
                            </p>

                            <div className="d-flex">

                                <button
                                    type="button"
                                    className="buttonPlus"
                                    testid="minus"
                                    onClick={() => this.changeQuantity("minus")}
                                >
                                    <BsDashSquare />
                                </button>
                                <p className="align-self-center p-1 m-0 font-weight-bold h6">
                                    {count}
                                </p>
                                <button
                                    type="button"
                                    className="buttonPlus"
                                    testid="plus"
                                    onClick={() => this.changeQuantity("plus")}
                                >
                                    <BsPlusSquare />
                                </button>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary align-self-start"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    renderUi = () => {
        const { apiStatus } = this.state
        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderSuccessView()
            case apiStatusConstants.fail:
                return this.renderFailureView()
            case apiStatusConstants.load:
                return this.renderLoadingView()
            default:
                return null
        }
    }

    render() {
        const { apiStatus } = this.state
        console.log(apiStatus)
        return (
            <div className="productDetailsParentCon d-flex flex-column">
                <Header />
                {this.renderUi()}
            </div>
        )
    }
}

export default ProductItemDetails
