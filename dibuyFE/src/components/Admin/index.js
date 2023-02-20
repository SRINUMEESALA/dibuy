import "./index.css"
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { AiOutlineMore } from "react-icons/ai";
import { useEffect, useState } from "react";
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import { v4 as uuidv4 } from "uuid";
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { TypeAnimation } from 'react-type-animation';
import { serverUrl } from "../../sources";
import Cookies from "js-cookie"
import Header from "../Header";
import Footer from "../Footer";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const apiStatusConstants = {
    initial: "initial",
    loading: "loading",
    success: "successful",
    failed: "failed"
}

const Admin = (props) => {
    const [activeItems, setActiveItems] = useState([])
    const [productsForGvt, setProductsForGvt] = useState([{ id: 1 }])
    const [open, setOpen] = useState(false);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)


    const getProductsForGovt = async () => {
        setApiStatus(apiStatusConstants.loading)
        try {
            const url = `${serverUrl}/products/products-for-govt`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            setProductsForGvt(result.productsLst)
            setApiStatus(apiStatusConstants.success)

        } catch (err) {
            console.log("Api failed in getProductsForGovt", err)
            setApiStatus(apiStatusConstants.failed)
        }
    }

    useEffect(() => {
        if (Cookies.get("adminJwt") === undefined) {
            const { history } = props
            history.replace("/admin/login")
        }
        getProductsForGovt()
    }, [])

    const logoutAdmin = () => {
        Cookies.remove("adminJwt")
        const { history } = props
        history.replace("/admin/login")
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const checkBoxChanged = (event, id) => {
        if (event.target.checked) {
            setActiveItems([...activeItems, id])
        } else {
            const newLst = activeItems.filter(ind => ind !== id)
            setActiveItems(newLst)
        }
    }

    const renderSuccessView = () => (
        <>
            <Header />
            <div className="adminCon d-flex flex-column mb-3">
                <div className="contentCon align-self-center">
                    <div className="introCon d-flex flex-column justify-content-center">
                        <h1 className="ml-5 h4" style={{ color: "#ff4081" }}>Welcome To </h1>
                        <TypeAnimation
                            sequence={['Admin Center', 2000, 'Find all stuff here', 2000, 'Statastics to State', 2000]}
                            style={{ fontSize: '3em' }}
                            wrapper="h2"
                            repeat={Infinity}
                            className="h1 adminHead ml-5"
                        />
                    </div>
                </div>
                <div className="productsAdminCon text-light d-flex flex-column">
                    <div className="contentCon align-self-center" >
                        <div className="d-flex justify-content-between">
                            <h1 className="h2 pt-3 pb-3">Available Stock</h1>
                            <Button variant="contained" className="align-self-center">Sell Stock</Button>
                        </div>

                        <div className="align-self-center d-flex flex-column" >
                            <div className="tableCon overflow-auto align-self-center" style={{ backgroundColor: "#424242" }}>
                                <ul className="tableHead d-flex list-unstyled pt-3 pb-2" >
                                    <li className="col-2"></li>
                                    <li className="col-4">Product</li>
                                    <li className="col-2">Quantity</li>
                                    <li className="col-3">Category</li>
                                    <li className="col-1"></li>
                                </ul>
                                {productsForGvt.map(obj => (
                                    <ul className={`tableRow d-flex list-unstyled ml-2 mr-2 rounded ${activeItems.includes(obj._id) && "tableRowColor"}`} style={{ color: "#C4C4C4	" }} key={uuidv4()}>
                                        <li className="col-2">  <Checkbox {...label} onChange={(event) => checkBoxChanged(event, obj._id)} className=" align-self-center text-primary" checked={activeItems.includes(obj._id)} /></li>
                                        <li className="col-4">{obj.title}</li>
                                        <li className="col-2">{obj.quantity}</li>
                                        <li className="col-3 d-flex justify-content-center"><Chip label={obj.category} color="primary" variant="outlined" className="w-50" /></li>
                                        <li className="col-1 h4 btn text-white d-flex m-0"><AiOutlineMore className="align-self-center" onClick={handleClickOpen} /></li>
                                    </ul>)
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-danger mb-5 mr-3" type="button" onClick={logoutAdmin}>Logout</button>
                    </div>
                </div>

                <>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <div className="logoutCon d-flex flex-column justify-content-between p-5">
                            <p className="text-secondary text-center h3">Choose</p>
                            <button className="btn btn-primary m-2" type="button" onClick={() => setOpen(false)}>Sell</button>
                            <button className="btn btn-danger m-2 " type="button" onClick={() => setOpen(false)}>Remove</button>
                        </div>
                    </Dialog>
                </>
            </div>

            <Footer />
        </>
    )

    const renderFailureView = () => (
        <div className="failview min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div>
                <div className="text-center">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                        alt="products failure"
                        className="sizeFailure w-100"
                    />
                </div>
                <h1 className="text-center">Something Went Wrong.</h1>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={getProductsForGovt}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    )

    const renderLoadingView = () => (
        <div
            className="text-center loader d-flex justify-content-center align-items-center vh-100"
            testid="loader"
        >
            <Loader type="BallTriangle" color="#FF5454" height={50} width={50} />
        </div>
    )

    const renderUi = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.failed:
                return renderFailureView()
            case apiStatusConstants.loading:
                return renderLoadingView()
            default:
                return null
        }
    }

    return (
        <>
            {renderUi()}
        </>
    )
}

export default Admin