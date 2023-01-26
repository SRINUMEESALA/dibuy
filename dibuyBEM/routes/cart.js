import express from "express"
import User from "../models/users.js"
import jwt from "jsonwebtoken"
import authorizeUser from "../middlewares/authorizeUser.js"
import Product from "../models/products.js"

const cartRoute = new express.Router()



const addToCart = async (request, response) => {
    console.log("add cart is accessed")
    const { productId, quantity } = request.body
    try {
        const userResponse = await User.find({ email: request.currentUser })
        let cart = userResponse[0].cart
        if (cart.length === 0) {
            const Ncart = [{ productId, quantity }]
            const user = await User.updateOne({ email: request.currentUser }, { $set: { cart: Ncart } })
            response.status(200)
            response.send({ msg: `cart updated for user ${request.currentUser}` })
        } else {
            const isExist = cart.filter(obj => obj.productId === productId)
            if (isExist.length > 0) {
                const newCart = cart.map(obj => {
                    if (obj.productId === productId) {
                        return { ...obj, quantity: obj.quantity + quantity }
                    } else {
                        return obj
                    }
                })
                const user = await User.updateOne({ email: request.currentUser }, { $set: { cart: newCart } })
                response.status(200)
                response.send({ msg: `cart updated for user ${request.currentUser}` })
            } else {
                const newCartList = [...cart, { productId, quantity }]
                const user = await User.updateOne({ email: request.currentUser }, { $set: { cart: newCartList } })
                response.status(200)
                response.send({ msg: `cart updated for user ${request.currentUser}` })
            }
        }

    } catch (err) {
        response.status(400)
        response.send({ msg: "could not update cart" })
        console.log(err)
    }
}


const getCart = async (request, response) => {
    try {
        const user = await User.find({ email: request.currentUser })
        const cart = user[0].cart
        const allIds = cart.map(obj => obj.productId)

        const quantities = {}
        cart.map(obj => {
            quantities[obj.productId] = obj.quantity
        })
        const cartProducts = await Product.find({ _id: { $in: allIds } })
        response.status(200);
        response.send({ cart: cartProducts, quantities });

    } catch (err) {
        response.status(400);
        response.send({ msg: "something went wrong in gettting cart details" });
        console.log(err)
    }
}

const RemoveCartItems = async (request, response) => {
    try {
        const { productId } = request.body
        const lst = await User.find({ email: request.currentUser })
        const cart = lst[0].cart
        const newCart = cart.filter(obj => obj.productId !== productId)
        const removeItem = await User.updateOne({ email: request.currentUser }, { $set: { cart: newCart } })
        response.status(200)
        response.send({ msg: "Product removed" })
    } catch (err) {
        response.status(404)
        response.send({ msg: "Product notfound or something went wrong" })
    }

}

cartRoute.get("/user/cart", authorizeUser, getCart)
cartRoute.post("/user/cart/update", authorizeUser, addToCart)
cartRoute.post("/user/cart/delete", authorizeUser, RemoveCartItems)


export default cartRoute