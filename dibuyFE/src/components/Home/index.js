import { Link } from "react-router-dom"
import Footer from "../Footer"
import Header from "../Header"

import "./index.css"

const Home = () => {
    console.log()

    return (
        <div className="d-flex flex-column justify-content-between">
            <Header />
            <div className="HomeParentCon align-self-center">
                <h1 className="text-primary">Welcome and Say RadheRadhe</h1>
                <Link to="/user/login">Login page</Link>
            </div>
            <Footer />
        </div>
    )
}
export default Home