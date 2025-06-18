import { faAdd, faArrowCircleRight, faBars, faCirclePlus, faDashboard, faGear, faSignal, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/redux'
import { Outlet } from 'react-router-dom'



function Header() {
    const location = useLocation();
    const disp = useDispatch();

    return (
        <div>
            <div className='header'>

                {
                    location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/" ?
                        (<div className=" navbar container">
                            <Link to={"/"} style={{ fontSize: "23px", color: "white", fontWeight: "light", textDecoration: "none" }} >
                                SpendXP
                            </Link>

                            <nav className='d-none d-sm-none d-lg-flex d-md-none'>
                                <Link to={"/signin"}> <FontAwesomeIcon icon={faArrowCircleRight} /> Sign in</Link>
                                <Link to={"/signup"} > <FontAwesomeIcon icon={faUserPlus} /> Sign up</Link>
                            </nav>

                            <button className="btn d-lg-none d-md-flex d-sm-flex " style={{ color: "white", fontSize: "30px" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><FontAwesomeIcon icon={faBars} /></button>

                            <div className="offcanvas offcanvas-end h-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasRightLabel">  <Link style={{ fontSize: "26px", color: "#034254", fontWeight: "bold", textDecoration: "none" }} >
                                        SpendXP
                                    </Link> </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"> </button>
                                </div>
                                <div className="offcanvas-body ">

                                    <nav className='offcanvaslink'>
                                        <Link to={"/signin"}> <FontAwesomeIcon icon={faArrowCircleRight} /> Sign in</Link>
                                        <Link to={"/signup"}> <FontAwesomeIcon icon={faUserPlus} /> Sign up</Link>
                                    </nav>
                                </div>
                            </div>
                        </div>) : (

                            <div className=" navbar container">
                                <Link to={"/home"} style={{ fontSize: "23px", color: "white", fontWeight: "light", textDecoration: "none" }} >
                                    SpendXP
                                </Link>

                                <nav className='d-none d-sm-none d-lg-flex d-md-none'>
                                    <Link to={"/dashboard"}> <span> <FontAwesomeIcon icon={faDashboard} /></span> Dashboard</Link>
                                    <Link to={"/addexpense"}> <span><FontAwesomeIcon icon={faCirclePlus} /></span>Add Expense</Link>
                                    <Link to={"/analytics"}> <span><FontAwesomeIcon icon={faSignal} /></span> Analitics</Link>
                                    <Link to={"/setting"}><span> <FontAwesomeIcon icon={faGear} /> </span> Setting</Link>

                                    <button style={{ backgroundColor: "#034254", border: "none" }} onClick={() => disp(logoutUser())}>  <Link to={"/signin"}> <FontAwesomeIcon icon={faArrowCircleRight} /> Sign out</Link>  </button>
                                </nav>

                                <button className="btn d-lg-none d-md-flex d-sm-flex " style={{ color: "white", fontSize: "30px" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><FontAwesomeIcon icon={faBars} /></button>

                                <div className="offcanvas offcanvas-end h-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasRightLabel">  <Link style={{ fontSize: "26px", color: "#034254", fontWeight: "bold", textDecoration: "none" }} >
                                            SpendXP
                                        </Link> </h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"> </button>
                                    </div>
                                    <div className="offcanvas-body ">

                                        <nav className='offcanvaslink'>
                                            <Link to={"/dashboard"}> <span> <FontAwesomeIcon icon={faDashboard} /></span>Dashboard</Link>
                                            <Link to={"/addexpense"}> <span><FontAwesomeIcon icon={faAdd} /></span>Add Expense</Link>
                                            <Link to={"/analytics"}> <span><FontAwesomeIcon icon={faSignal} /></span> Analitics</Link>
                                            <Link to={"/setting"}><span> <FontAwesomeIcon icon={faGear} /> </span> Setting</Link>
                                            <button style={{ backgroundColor: "#ffff", border: "none" }} onClick={() => disp(logoutUser())}>  <Link to={"/signin"}> <FontAwesomeIcon icon={faArrowCircleRight} /> Sign out</Link>  </button>

                                        </nav>
                                    </div>
                                </div>
                            </div>)

                }

            </div>


        </div>
    )
}

export default Header