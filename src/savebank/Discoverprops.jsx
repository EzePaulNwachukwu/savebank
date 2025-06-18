import React from 'react'

function Discoverprops({icon,title,cap}) {
  return (
    <div className=" my-4 col-lg-4 col-sm-12 col-md-4  ">

        <div className='discovercard ' >
            <div style={{color:"#00CA63",fontSize:"50px"}}>
                {icon}
            </div>
            <h3 style={{fontSize:"20px"}}>{title}</h3>
            <p>{cap}</p>
        </div>

    </div>
  )
}

export default Discoverprops