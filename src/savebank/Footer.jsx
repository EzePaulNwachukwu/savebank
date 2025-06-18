import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div class="footer py-4 text-center" style={{backgroundColor:"#034254" , color:"white"}} >
            <div class="container">

                <div class="mb-3">
                    <a href="#" style={{fontSize:"40px", fontWeight:"600", textDecoration:"none",color:"white"}} >SpendXP</a>
                </div>

                <div class="mb-3">
                    <p>Empowering your financial journey with clarity and control.</p>
                </div>

                <div class="mb-3 d-flex text-center justify-content-center  ">
                        <div><a href="#" class="footer-link">Privacy Policy</a></div>
                        <div><a href="#" class="footer-link">Terms of Service</a></div>
                        <div><a href="#" class="footer-link">About Us</a></div>
                </div>

                <div class="mb-2">
                    <p>© 2025 SpendXP. All rights reserved.</p>
                    <p>Dev_paul: <a href="#" class="footer-link" >Portfolio</a></p>
                </div>

            </div>
        </div>
    )
}

export default Footer