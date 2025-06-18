import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Home from './Home'

function Layout() {
    return (
        <div>
            <Header />
            {/* <Home/> */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout