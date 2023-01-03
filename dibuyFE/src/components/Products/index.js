import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { HiOutlineSearch } from "react-icons/hi";
import { BsFilterSquare } from "react-icons/bs";
import ColorContainer from "./styledComponents"
import Checkbox from '@mui/material/Checkbox';
import Header from "../Header"
import Footer from "../Footer"
import "./index.css"
import ProductsList from "../ProductsList";

// for MiUi styles
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// Filter Options
const fabricItems = [{ fabric: "Polo t-shirt", id: "POLOTSHIRT" }, { fabric: "Cotton t-shirt", id: "COTTONTSHIRT" }, { fabric: "Matty t-shirt", id: "MATTYTSHIRT" }, { fabric: "Dryfit t-shirt", id: "DRYFITTSHIRT" }]
const neckItems = [{ neckType: "Round neck", id: "ROUNDNECK" }, { neckType: "V-Neck", id: "VNECK" }, { neckType: "Collar", id: "COLLAR" }]
const sleeveItems = [{ sleeveType: "Half Sleeves", id: "HALFSLEEVES" }, { sleeveType: "Full Sleeves", id: "FULLSLEEVES" }]
const availableColors = [
    { label: "Green", id: "GREEN" }, { label: "Yellow", id: "YELLOW" }, { label: "Blue", id: "BLUE" }, { label: "Pink", id: "PINK" }, { label: "Violet", id: "VIOLET" }, { label: "Grey", id: "GREY" }
];

const tempProductDesigns = [{ data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }, { data: null, id: uuidv4() }]

const Products = () => {
    const [fabric, setFabric] = useState([])
    const [neckType, setNectType] = useState([])
    const [sleeveType, setSleeveType] = useState([])
    const [currentSelectedColor, setCurrentSelectedColor] = useState("YELLOW")
    const [desingsList, setDesignsList] = useState(tempProductDesigns)

    // console.log("filters applied", fabric, neckType, sleeveType, currentSelectedColor)

    useEffect(() => {
        // do the api call here for the product desings list
    }, [])

    const onClickSelectColor = (colorId) => {
        setCurrentSelectedColor(colorId)
    }

    const onChangeFabric = (event, fabricId) => {
        if (event.target.checked) {
            setFabric((prevousFabricList) => [...prevousFabricList, fabricId])

        } else {
            const updatedList = fabric.filter(item => item !== fabricId)
            setFabric(updatedList)

        }
    }

    const onChangeNeckType = (event, neckTypeId) => {
        if (event.target.checked) {
            setNectType((prevousNeckTypeList) => [...prevousNeckTypeList, neckTypeId])
        } else {
            const updatedList = neckType.filter(item => item !== neckTypeId)
            setNectType(updatedList)
        }
    }

    const onChangeSleeveType = (event, sleeveTypeId) => {
        if (event.target.checked) {
            setSleeveType((prevousSleeveTypeList) => [...prevousSleeveTypeList, sleeveTypeId])
        } else {
            const updatedList = sleeveType.filter(item => item !== sleeveTypeId)
            setSleeveType(updatedList)
        }
    }

    const renderFabricItems = () => (
        <div className="">
            <h1 className="h6">Fabric</h1>
            <ul className="list-unstyled">
                {fabricItems.map(fabricObj => <li className="d-flex justify-content-between" key={uuidv4()}>
                    <label className="m-1 text-secondary filterItem" htmlFor={`${fabricObj.id}CL`}>{fabricObj.fabric}</label>
                    <Checkbox {...label} size="small" checked={fabric.includes(fabricObj.id)} defaultValue={fabricObj.id} id={`${fabricObj.id}CL`} onChange={(event) => onChangeFabric(event, fabricObj.id)} />
                    {/* <input type="checkbox" name={fabricObj.id} /> */}
                </li>)}
            </ul>
        </div>
    )

    const renderNectTypeItems = () => (
        <div className="">
            <h1 className="h6">Neck Type</h1>
            <ul className="list-unstyled">
                {neckItems.map(neckTypeObj => <li className="d-flex justify-content-between" key={uuidv4()}>
                    <label className="m-1  text-secondary filterItem" htmlFor={`${neckTypeObj.id}CL`}>{neckTypeObj.neckType}</label>
                    <Checkbox {...label} size="small" checked={neckType.includes(neckTypeObj.id)} id={`${neckTypeObj.id}CL`} onChange={(event) => onChangeNeckType(event, neckTypeObj.id)} />
                    {/* <input type="checkbox" name={neckTypeObj.id} /> */}
                </li>)}
            </ul>
        </div>
    )

    const renderSleeveTypeItems = () => (
        <div className="">
            <h1 className="h6">Sleeve Type</h1>
            <ul className="list-unstyled">
                {sleeveItems.map(sleeveObj => <li className="d-flex justify-content-between" key={uuidv4()}>
                    <label className="m-1  text-secondary filterItem" htmlFor={`${sleeveObj.id}CL`}>{sleeveObj.sleeveType}</label>
                    <Checkbox {...label} size="small" defaultValue={sleeveObj.id} id={`${sleeveObj.id}CL`} onChange={(event) => onChangeSleeveType(event, sleeveObj.id)} checked={sleeveType.includes(sleeveObj.id)} />
                    {/* <input type="checkbox" name={sleeveObj.id} /> */}
                </li>)}
            </ul>
        </div>
    )

    const renderAvailableColors = () => (
        <div className="">
            <h1 className="h6 mb-3">Color</h1>
            <div className="input-group mb-3 d-flex">
                <div className="searchInputCon">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={availableColors}
                        sx={{ width: 300 }}
                        size="small"
                        renderInput={(params) => <TextField {...params} label="Search" />}
                        className="w-100"
                        value={currentSelectedColor}
                        onChange={(event, colorObj) => onClickSelectColor(colorObj.label)}
                    />
                </div>
                <div className="colorSearchIconCon mb-0 ml-1">
                    <HiOutlineSearch className="h-100 text-secondary h5 align-self-center mb-0 " />
                </div>
            </div>
            <ul className="list-unstyled d-flex flex-wrap justify-content-around">
                {availableColors.map(colorObj => <li className="col-4 text-center d-flex flex-column justify-content-center align-items-center" onClick={() => onClickSelectColor(colorObj.id)} key={uuidv4()}>
                    <ColorContainer className="rounded-circle align-self-center" bgColor={colorObj.label}></ColorContainer>
                    <p className={currentSelectedColor === colorObj.id ? "small websiteNativeColor font-weight-bold" : "small"}>{colorObj.label}</p>
                </li>)}
            </ul>
        </div>
    )

    return (
        <div className="d-flex flex-column customerPrototypeCon">
            <Header />
            <div className="productsCon align-self-center d-flex justify-content-between">
                <div className="filterSectionCon p-3 overflow-auto d-none d-md-block">
                    <div className="d-flex justify-content-between mb-3">
                        <h1 className="h5 filterHeading">Filter</h1>
                        <BsFilterSquare className="websiteNativeColor h5" />
                    </div>
                    {renderFabricItems()}
                    {renderNectTypeItems()}
                    {renderSleeveTypeItems()}
                    {renderAvailableColors()}
                </div>
                <ProductsList desingsList={desingsList} />
            </div>
            <Footer />
        </div>
    )
}
export default Products