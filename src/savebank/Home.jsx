import React from 'react'
import Buttonprops from './Buttonprops'
import Discoverprops from './Discoverprops'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCircleDollarToSlot, faGear } from '@fortawesome/free-solid-svg-icons'
import Unlockfinace from './Unlockfinace'
import Unlockfinance2 from './Unlockfinance2'
import TestimonialCarousel from './TestimonialCarousel'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'



function Home() {
    const logedinnow = useSelector(
        logedin => logedin.bankapp.users
    )

    const dispatch = useDispatch()

    const ifuser = () => {
        if (!logedinnow) {
            return <p style={{ color: 'red' }}>Error: No user found. Please log in.</p>;
        }
    }


    return (
        <div style={{ backgroundColor: "#FAFBFC" }}>

            {/* banner */}

            <div className="container row banner my-5  m-auto">
                <div className=' col-md-12 col-lg-6  col-sm-12 row'>
                    <h1 className='col-lg-12 col-sm-12 col-md-12'>Master Your Finances with SpendXP</h1>
                    <p className='col-lg-11 col-sm-12 col-md-12'>Gain clarity on your spending and unlock personalized strategies to grow your savings effortlessly.</p>
                    
                    <Buttonprops text={"Start Saving Now"} goto={"/dashboard"} />
                </div>

                <div className='col-lg-5  col-sm-12'>
                    <img src="https://spendxp.netlify.app/assets/app-illustration-2SZqHxUE.jpg" alt="" />
                </div>
            </div>

            {/* discover  */}

            <div className='container text-center my-5 box-container'>
                <h1 className='w-75 m-auto my-1  fs-2 fw-bolder'>Discover the Power of SpendXP</h1>

                <div className="row  container m-auto">
                    <Discoverprops icon={<FontAwesomeIcon icon={faGear} />} title={"Automated Expense Tracking"} cap={"Effortlessly monitor your spending in real-time with advanced automation."} />
                    <Discoverprops icon={<FontAwesomeIcon icon={faChartLine} />} title={"Insights & Analytics"} cap={"Unlock actionable financial insights to optimize your money management."} />
                    <Discoverprops icon={<FontAwesomeIcon icon={faCircleDollarToSlot} />} title={"Smart Saving Tips"} cap={"Receive tailored advice to boost your savings effortlessly each month."} />
                </div>
            </div>

            {/* unlock-finace */}

            <div className='box-container text-center'>
                <h1 className='w-75 m-auto my-1 fs-2 fw-bolder'>Unlock Your Financial Potential with SpendXP</h1>

                <div className=" container m-auto">
                    <Unlockfinace title={"Take Control with Real-Time Insights"} cap={"SpendXP empowers you with real-time expense tracking and actionable insights to make informed financial decisions effortlessly."} img={"https://spendxp.netlify.app/assets/valuesec1-BD0vIyYh.png"} style={{ backgroundColor: "red" }} />
                    <Unlockfinance2 title={"Budget Smarter, Live Better"} cap={"Create realistic budgets tailored to your lifestyle. SpendXP’s intuitive tools help you set limits and track progress seamlessly."} img={"https://spendxp.netlify.app/assets/valuesec4-cNpkYDlt.png"} />
                    <Unlockfinace title={"Save Smarter with Tailored Advice"} cap={"Get personalized recommendations based on your spending habits to accelerate your savings and hit your financial goals faster."} img={"https://spendxp.netlify.app/assets/valuesec3-F1HT3E0B.png"} />
                </div>

                <Buttonprops text={"Join SpendXP Today"} goto={"/dashboard"} />

            </div>

            {/* what users say */}

            <div className='my-5 container d-none d-lg-block d-sm-none box-container'  >
                <h1 className='w-25 m-auto my-1 fs-3 fw-bolder ' >What Our Users Say</h1>
                <div className='row'>
                    <TestimonialCarousel />
                </div>
            </div>

            <div className=' banner container m-auto my-5 text-center p-5' >
                <h1 className='w-100 m-auto my-1 fs-2 fw-bolder'>Simplify Your Financial Future</h1>
                <p>Effortlessly manage your finances with SpendXP’s powerful tools, designed to streamline your journey to financial success.</p>
                <Buttonprops text={"Start Saving Now"} goto={"/dashboard"} />
            </div>

            <Footer />

        </div>
    )
}

export default Home