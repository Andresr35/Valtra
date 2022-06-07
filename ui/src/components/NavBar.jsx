import React from 'react'
import { NavLink } from 'react-router-dom'

  let activeClassName = "underline";
const NavBar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"> 
                            <NavLink to='/' aria-current="page" className={({isActive})=>isActive ? 'nav-link active ' : 'nav-link'}>Home</NavLink>
                        </li>
                        <li className="nav-item"> 
                            <NavLink to='/orders' aria-current="page" className={({isActive})=>isActive ? 'nav-link active ' : 'nav-link'}>Orders</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default NavBar


    