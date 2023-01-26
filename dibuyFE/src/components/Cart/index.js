import { v4 as uuidv4 } from "uuid"
import Header from "../Header"
import Footer from "../Footer"
import Cookies from "js-cookie"
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Button from '@mui/material/Button';
import "./index.css"
import { useState } from "react";
import { serverUrl } from "../../sources";
import { useEffect } from "react";
import DiBuyContext from "../../context/DiBuyContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const [products, setProducts] = useState([{}])
    const [cartValue, setCartValue] = useState(0)

    const getCartProducts = async () => {
        const url = `${serverUrl}/user/cart`
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwtToken")}`
            }
        }
        const productsFet = await fetch(url, options)
        const { cart, quantities } = await productsFet.json()
        const finalCart = cart.map((obj) => ({ ...obj, cartQuantity: quantities[obj._id] }))
        let total = 0
        finalCart.map(obj => {
            total += obj.price * obj.cartQuantity
        })
        setCartValue(total)
        setProducts(finalCart)
        console.log(products)
    }

    useEffect(() => {
        getCartProducts()
    }, [])

    const removeProduct = async (productId) => {
        const url = `${serverUrl}/user/cart/delete`
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookies.get("jwtToken")}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ productId })
        }
        const response = await fetch(url, options)
        if (response.ok) {
            getCartProducts()
        }
    }

    return (
        <DiBuyContext.Consumer>
            {value => {
                const { cartCount, setCartCount } = value
                if (products.length !== cartCount) {
                    setCartCount(products.length)
                }
                return (
                    <div className="cartParentCon">
                        <Header />
                        <div className="d-flex flex-column vh-100 mb-4">
                            <h1 className="h2 text-center mb-2 mt-2">Your Cart</h1>
                            <div className="cartCon d-flex align-items-center align-self-center">
                                <div className="productsCon col-9 h-100 p-3 overflow-auto">
                                    <div className="font-weight-bold">
                                        <ul className="list-unstyled d-flex">
                                            <li className="col-6">PRODUCT</li>
                                            <li className="col-2">PRICE</li>
                                            <li className="col-2">QUANTITY</li>
                                            <li className="col-1">TOTAL(Rs)</li>
                                            <li className="col-1"></li>
                                        </ul>
                                        <div className="">
                                            <hr />
                                        </div>
                                    </div>
                                    {products.map(obj => (
                                        <div className="" key={uuidv4()}>
                                            <ul className="list-unstyled d-flex">
                                                <li className="col-6 d-flex">
                                                    <div className="col-4">
                                                        <Link to={`/product/${obj._id}`}>
                                                            <img src={obj.imageUrl} alt="product" className="productCartImage" />
                                                        </Link>
                                                    </div>
                                                    <div className="col-8">
                                                        <p className="">{obj.title}</p>
                                                        <p className="">{obj.category}</p>
                                                    </div>
                                                </li>
                                                <li className="col-2">{obj.price}</li>
                                                <li className="col-2">
                                                    <div className="rounded-pill pill d-flex quantity justify-content-around align-items-center">
                                                        <button type="button" className="btn m-0 p-0"><AiOutlinePlus className="p-0 m-0" /></button>
                                                        <p className="p-0 m-0 text-dark h6">{obj.cartQuantity}</p>
                                                        <button type="button" className="btn m-0 p-0"><AiOutlineMinus className="p-0 m-0" /></button>
                                                    </div>
                                                </li>
                                                <li className="col-1">{obj.price * obj.cartQuantity}</li>
                                                <li className="col-1">
                                                    <button type="button" className="btn p-0 m-0" onClick={() => removeProduct(obj._id)}><AiFillCloseCircle className="h4 text-danger" /></button>
                                                </li>
                                            </ul>
                                            <div className="">
                                                <hr />
                                            </div>
                                        </div>))}
                                </div>
                                <div className=" col-3 h-100">
                                    <div className="summaryCon">
                                        <div className="card text-center">
                                            <div className="card-header">
                                                Order Summary
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title h6">Subtotal</h5>
                                                    <p className="">{cartValue}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title h6">Shipping</h5>
                                                    <p className="">Free</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title h6">Payment Method</h5>
                                                    <p className="">COD</p>
                                                </div>
                                            </div>
                                            <div className="card-footer text-muted">
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title">Total</h5>
                                                    <p className="h5">{cartValue}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=""><Button color="success" variant="contained" className="w-100">CHECKOUT</Button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                )
            }}
        </DiBuyContext.Consumer>

    )
}

export default Cart