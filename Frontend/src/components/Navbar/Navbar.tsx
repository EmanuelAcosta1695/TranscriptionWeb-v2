import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg custom-bg-gradient">
            <div className="container-fluid">
                <div className="collapse navbar-collapse text-light" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link active text-light">Home</NavLink>
                        </li>
                        <li className="nav-item">   
                            <NavLink to='/AboutPage' className="nav-link active text-light">About</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link text-light" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" aria-disabled="true">Disabled</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}
