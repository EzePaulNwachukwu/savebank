import React from 'react'
import { Link } from 'react-router-dom'

function Notfoundpage() {
  return (
    <div>
        <h1>PAGE NOT FOUND</h1>
        <Link to={'/home'}>Go Home</Link>
    </div>
  )
}

export default Notfoundpage