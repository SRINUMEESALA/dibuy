import { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import "./App.css"
import Cart from './components/Cart'
import FairPrice from './components/FairPrice'
import Home from "./components/Home"
import NotFound from './components/NotFound'
import ProductItemDetails from './components/ProductItemDetails'
import Products from './components/Products'
import Temp from './components/Temp'
import UserLogin from "./components/UserLogin"
import DiBuyContext from './context/DiBuyContext'

document.title = "DiBuy";
const App = () => {
  const [currentRoute, setCurrentRoute] = useState("")
  // const [selectedDesignsList, setSelectedDesignsList] = useState("")
  return (
    <DiBuyContext.Provider value={{ currentRoute, setCurrentRoute }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/login" component={UserLogin} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/fairprice" component={FairPrice} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/product/:id" component={ProductItemDetails} />
          <Route exact path="/temp" component={Temp} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </DiBuyContext.Provider>
  )
}



export default App