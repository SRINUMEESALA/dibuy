import { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import "./App.css"
import Cart from './components/Cart'
import FairPrice from './components/FairPrice'
import Home from "./components/Home"
import NotFound from './components/NotFound'
import ProductItemDetails from './components/ProductItemDetails'
import Products from './components/Products'
import Register from './components/register'
import Temp from './components/Temp'
import UserLogin from "./components/UserLogin"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import DiBuyContext from './context/DiBuyContext'
import { useEffect } from 'react'
import { serverUrl } from "./sources"
import Cookies from "js-cookie"
import Orders from './components/Orders'

document.title = "DiBuy";
const App = () => {
  const [currentRoute, setCurrentRoute] = useState("")
  const [cartCount, setCartCount] = useState(0)

  const getCartCount = async () => {
    const url = `${serverUrl}/user/cart`
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwtToken")}`
      }
    }
    const productsFet = await fetch(url, options)
    const { cart } = await productsFet.json()
    setCartCount(cart.length)
  }

  useEffect(() => {
    getCartCount()
  }, [])

  return (
    <DiBuyContext.Provider value={{ currentRoute, setCurrentRoute, cartCount, setCartCount }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/user/login" component={UserLogin} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute exact path="/fairprice" component={FairPrice} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/product/:id" component={ProductItemDetails} />
          <ProtectedRoute exact path="/orders" component={Orders} />
          <Route exact path="/temp" component={Temp} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </DiBuyContext.Provider>
  )
}



export default App