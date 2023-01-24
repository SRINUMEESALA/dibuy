
import { Link, withRouter } from "react-router-dom"
import { useState } from 'react';
import Cookies from "js-cookie";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FcNext } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsChatRightDotsFill } from "react-icons/bs";
import "./index.css"
import DiBuyContext from "../../context/DiBuyContext";

const screenSize = window.innerWidth
const navItems = [{ item: "Products", id: 1, path: "/products" }, { item: "FairPrice", id: 2, path: "/fairprice" }, { item: "Cart", id: 3, path: "/cart" }]
const openingSide = "right";
const Header = (props) => {
    const [state, setState] = useState({ "right": false });
    const sliderSize = screenSize < 768 ? 170 : 250;

    const logout = () => {
        Cookies.remove("jwtToken")
        const { history } = props
        history.replace("/user/login")
    }

    const toggleDrawer = (openingSide, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ [openingSide]: open });
    };

    const slide = (openingSide, size) => (
        <Box
            sx={{ width: size }}
            role="presentation"
            onClick={toggleDrawer(openingSide, false)}
            onKeyDown={toggleDrawer(openingSide, false)}
        >
            <List>
                {[{ displayText: 'Account', icon: <RiAccountCircleFill className="h4 m-0 p-0" /> }, { displayText: 'Orders', icon: <GrHistory className="h5 m-0" /> }, { displayText: 'ChatUs', icon: <BsChatRightDotsFill className="h5 m-0" /> }, { displayText: "Seller Corner", icon: <MdSell className="h5 m-0" /> }].map((obj, index) => (
                    <ListItem key={obj.displayText} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {obj.icon}
                            </ListItemIcon>
                            <ListItemText primary={obj.displayText} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[{ displayText: 'Logout', icon: <FiLogOut className="h5 m-0" />, }].map((obj, index) => (
                    <ListItem key={obj.displayText} disablePadding>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                {obj.icon}
                            </ListItemIcon>
                            <ListItemText primary={obj.displayText} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <DiBuyContext.Consumer>
            {
                value => {
                    const { currentRoute, setCurrentRoute } = value
                    return (
                        <>
                            <div className="d-none d-md-block shadow">
                                <div className="navParentCon d-flex justify-content-center text-white">
                                    <div className="navbarCon d-flex justify-content-between">
                                        <h1 className="pt-2 pb-2"><Link to="/" className="navLink" onClick={() => setCurrentRoute("")}><span className="websiteNativeColor">Di</span>Buy</Link></h1>
                                        <div className="d-flex">
                                            <ul className="list-unstyled d-flex m-0">
                                                {navItems.map(eachItem => <li className={currentRoute === eachItem.id ? "mr-3 websiteNativeBgColor p-2 d-flex align-items-center navItem justify-content-center" : "mr-3 d-flex align-items-center navItem justify-content-center"} key={eachItem.id} onClick={() => setCurrentRoute(eachItem.id)}><Link to={eachItem.path} className="navLink"><span>{eachItem.item}</span></Link></li>)}
                                            </ul>
                                            <button className="btn text-white align-self-center" type="button" onClick={toggleDrawer(openingSide, true)}>More <FcNext className="text-light m-0 font-weight-bold" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-md-none">
                                <nav className="navbar navbar-light bg-light">
                                    <h1 className="pt-2 pb-2 h3"><Link to="/" className="navLink" onClick={() => setCurrentRoute("")}><span className="websiteNativeColor">Di</span>Buy</Link></h1>
                                    <div className="">
                                        <button className="btn mr-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <GiHamburgerMenu className="h2 m-0 text-info" />
                                        </button>
                                        <button className="btn text-white align-self-center" type="button" onClick={toggleDrawer(openingSide, true)}> <RiAccountCircleFill className="text-info h2 m-0 font-weight-bold" /></button>
                                    </div>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav text-center">
                                            {navItems.map(eachItem => <li className={currentRoute === eachItem.id ? "mr-3 websiteNativeBgColor p-2" : "mr-3"} key={eachItem.id} onClick={() => setCurrentRoute(eachItem.id)}><Link to={eachItem.path} className="navLink"><span>{eachItem.item}</span></Link></li>)}
                                            {/* {navItems.map(eachItem => <li className={currentRoute === eachItem.id ? " text-danger p-2" : ""} key={eachItem.id} onClick={() => setCurrentRoute(eachItem.id)}><span>{eachItem.item}</span></li>)} */}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <Drawer
                                anchor={openingSide}
                                open={state[openingSide]}
                                onClose={toggleDrawer(openingSide, false)}
                            >
                                {slide(openingSide, sliderSize)}
                            </Drawer>
                        </>

                    )
                }
            }
        </DiBuyContext.Consumer>
    )
}


export default withRouter(Header)
