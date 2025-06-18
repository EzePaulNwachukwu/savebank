import React from 'react'

function Unlockfinance2({ title, cap, img }) {
    return (
        <div >
            <div className="container row unlock my-4 m-auto align-items-center">
                <div className='col-lg-6 col-sm-12 col-md-12'>
                    <img src={img} alt="" style={{ width: "100%", marginTop: "10px" }} />
                </div>
                <div className='col-lg-6 col-sm-12 col-md-12'>
                    <h3 style={{ fontSize: "23px" }}>{title}</h3>
                    <p style={{ fontSize: "18px" }}>{cap}</p>
                </div>

            </div>
        </div>
    )
}

export default Unlockfinance2