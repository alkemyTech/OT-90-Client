import { NavLink } from 'react-router-dom'
import React from 'react'

export default function Navbar() {
    const NavBarItems = [
        {
            view: "Registro",
            root: "register"
        },
        {
            view: "Login",
            root: "login"
        },
        {
            view: "Novedades",
            root: "news"
        }
    ]
  return (
    <nav>
      <ul>
          <li><NavLink exact activeClassName="active" to='/' >Home</NavLink></li>
          {NavBarItems.map(( item, index ) =>
          <li key={index}><NavLink  activeClassName="active" to={`/${item.root}`}>{item.view}</NavLink></li>)}
      </ul> 
    </nav>                
  )
}