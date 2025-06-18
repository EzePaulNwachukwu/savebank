import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Buttonprops({goto,text}) {
  return (
   
    <div className='buttonprops'>
       <Link to={goto}><button>{text} <span><FontAwesomeIcon icon={faAngleRight}/></span></button> </Link>
    </div>
  )
}

export default Buttonprops